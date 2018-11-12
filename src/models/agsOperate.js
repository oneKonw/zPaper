import {
  VIEW_GOTO,
  SCENE_MEASURE,
  LOOK_AROUND,
} from '../constants/action-types';

export default {

  namespace: 'agsOperate',

  state: {
    flagsContent: false,
    flagsSceneMeasure: false,
    flagsAnalysisShadow: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
    *cardClick({ payload }, { call, put }) {
      yield put({ type: VIEW_GOTO, payload });
    },
    *btnMeasure({ payload }, { call, put }) {
      yield put({ type: 'changeStateSceneMeasuer', payload });
      yield put({ type: SCENE_MEASURE, payload });
    },
    *btnLookAround({ payload }, { call, put }) {
      yield put({ type: LOOK_AROUND, payload });
    },
    *sceneMeasure({ payload }, { call, put }) {
      yield put({ type: SCENE_MEASURE, payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    changeStateContent(state, action) {
      return { ...state, flagsContent: action.payload };
    },
    changeStateSceneMeasuer(state, action) {
      return { ...state, flagsSceneMeasure: action.payload };
    },
    changeStateAnalysisShadow(state, action) {
      return { ...state, flagsAnalysisShadow: action.payload };
    },
  },
};
