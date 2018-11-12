import {
  VIEW_GOTO,
  SCENE_MEASURE,
  LOOK_AROUND,
  SCREEN_SHOT, SCREEN_DOWNLOAD,
} from '../constants/action-types';

export default {

  namespace: 'agsOperate',

  state: {
    flagsContent: false,
    flagsSceneMeasure: false,
    flagsAnalysisShadow: false,
    imgScreenShot: null,
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
    *screenShot({ payload }, { call, put }) {
      yield put({ type: SCREEN_SHOT, payload });
    },
    *screenShotDload({ payload }, { call, put }) {
      yield put({ type: SCREEN_DOWNLOAD, payload });
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
    changeStateImgShot(state, action) {
      return { ...state, imgScreenShot: action.payload };
    },
  },
};
