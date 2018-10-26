import {
  VIEW_GOTO,
} from '../constants/action-types';

export default {

  namespace: 'agsOperate',

  state: {
    flagsContent: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *cardClick({ payload }, { call, put }) {
      yield put({ type: VIEW_GOTO, payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    changeStateContent(state, action) {
      return { ...state, flagsContent: action.payload };
    },
  },
};
