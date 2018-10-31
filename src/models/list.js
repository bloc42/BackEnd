import { queryFakeList, usersListData, hotPostsData} from '../services/api';
import {formatForUserList,formatForHotPostList } from '../utils/dataformat'
export default {
  namespace: 'list',

  state: {
    userlist: [],
    cursor: ""
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchUsersList({ payload }, { call, put }){
      const response = yield call(usersListData, payload);
      yield put({
        type: 'save',
        payload: {
          userlist: formatForUserList(response['data']['userList']['userlist']),
          cursor:response['data']['userList']['cursor']
        },
      }); 
    },
    *fetchPostsList({ payload }, { call, put }){
      const response = yield call(hotPostsData, payload);
      yield put({
        type: 'save',
        payload: {
          postlist: formatForHotPostList(response['data']['hotPosts']),
        },
      }); 
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        userlist: [],
        cursor: ""
      }
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
