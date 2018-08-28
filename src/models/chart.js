import { usersGrowthData,hotUsersData,postsGrowthData,hotPostsData,commentsGrowthData,totalUserCount,totalPostCount,totalCommentCount } from '../services/api';
import { fakeChartData } from '../services/api';
import { formatForDate,formatForHotUserTable,formatForHotPostTable } from '../utils/dataformat'
export default {
  namespace: 'chart',

  state: {
    totalUserCountData: 0,
    totalPostCountData: 0,
    totalCommentCountData: 0,
    usersData: [],
    hotUsersData: [],
    postsData: [],
    hotPostsData: [],
    commentsData: [],
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchTotalUserCountData({ payload }, { call, put }) {
      const response = yield call(totalUserCount,payload);
      yield put({
        type: 'save',
        payload: {
          totalUserCountData: response['data']['totalUsersCount']
        }
      });
    },
    *fetchTotalPostCountData({ payload }, { call, put }) {
      const response = yield call(totalPostCount,payload);
      yield put({
        type: 'save',
        payload: {
          totalPostCountData: response['data']['totalPostsCount']
        }
      });
    },
    *fetchTotalCommentCountData({ payload }, { call, put }) {
      const response = yield call(totalCommentCount,payload);
      yield put({
        type: 'save',
        payload: {
          totalCommentCountData: response['data']['totalCommentsCount']
        }
      });
    },
    *fetchUsersData({ payload }, { call, put }) {
      const response = yield call(usersGrowthData,payload);
      yield put({
        type: 'save',
        payload: {
          usersData: formatForDate(payload.dateType,response['data']['userGrowth'])
        }
      });
    },
    *fetchPostsData({ payload }, { call, put }) {
      const response = yield call(postsGrowthData,payload);
      yield put({
        type: 'save',
        payload: {
          postsData: formatForDate(payload.dateType,response['data']['postGrowth']),
        },
      });
    },
    *fetchCommentsData({ payload }, { call, put }) {
      const response = yield call(commentsGrowthData,payload);
      yield put({
        type: 'save',
        payload: {
          commentsData: formatForDate(payload.dateType,response['data']['commentGrowth']),
        },
      });
    },
    *fetchHotUsersData(_, { call, put }) {
      const response = yield call(hotUsersData);
      yield put({
        type: 'save',
        payload: {
          hotUsersData: formatForHotUserTable(response['data']['hotUsers']),
        },
      });
    },
    *fetchHotPostsData({ payload }, { call, put }) {
      const response = yield call(hotPostsData,payload);
      yield put({
        type: 'save',
        payload: {
          hotPostsData: formatForHotPostTable(response['data']['hotPosts']),
        },
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      console.log(response)
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
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
        totalUserCountData: 0,
        totalPostCountData: 0,
        totalCommentCountData: 0,
        usersData: [],
        hotUsersData: [],
        postsData: [],
        hotPostsData: [],
        commentsData: [],
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
