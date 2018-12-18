import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      // console.error(payload)
      const response = yield call(fakeAccountLogin, payload);
      if(response.data.login && response.data.login.id !==""){
        var res={}
        localStorage.setItem('username', response.data.login.username)
        if(response.data.login.username !== "admin"){
          res ={
            currentAuthority: "user",
            status:"ok",
            type:"account"
          }
        }else{
          res ={
            currentAuthority: "admin",
            status:"ok",
            type:"account"
          }
        }

        yield put({
          type: 'changeLoginStatus',
          payload: res,
        });
      }
      // Login successfully
       if (response.data.login && response.data.login.id !=="") {
        reloadAuthorized();
        if(response.data.login.username == "admin"){
          window.location.href = window.location.protocol+"//"+window.location.host+"/dashboard/dailycount"
        }else{
          console.log("test")
          window.location.href = window.location.protocol+"//"+window.location.host+"/channel"
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
