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
        const res ={
          currentAuthority: "user",
          status:"ok",
          type:"account"
        }
        yield put({
          type: 'changeLoginStatus',
          payload: res,
        });
      }
      
      // yield put({
      //   type: 'changeLoginStatus',
      //   payload: response,
      // });
      // Login successfully
       if (response.data.login && response.data.login.id !=="") {
      // if(res.data.login.id !== ""){
        // const response={
        //   status: 'ok',
        //   currentAuthority: res.data.login.username,
        // }
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: response,
        // });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          console.error("1"+redirect)
          const redirectUrlParams = new URL(redirect);
          console.error("2"+redirectUrlParams)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            console.error("3"+redirect)
            window.location.href = redirect;
            return;
          }
        }
        console.error("4"+routerRedux)
        console.error("5"+redirect)
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
