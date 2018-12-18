import { queryChannel} from '../services/api';

export default {
  namespace: 'channel',

  state: {
    channels:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryChannel,{ payload });
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        channels: action.payload.data.ownChannels,
      };
    }
  },
};
