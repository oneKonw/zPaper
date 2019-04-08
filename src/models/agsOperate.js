import {
  VIEW_GOTO,
  SCENE_MEASURE,
  LOOK_AROUND,
  SCREEN_SHOT, SCREEN_DOWNLOAD,
  SEARCH_BUILD,
  PROJECT_REVIEW,
} from '../constants/action-types';

export default {

  namespace: 'agsOperate',

  state: {
    flagsContent: true, // 显示磁贴
    flagsSceneMeasure: false, // 显示测量按钮
    flagsAnalysisShadow: false, // 显示日照分析组件
    flagsSearchBuild: false,
    urlScreenShot: null, // 截图url变量
    flagsImgScreenShot: false, // 显示截图控件
    flagToolbar: true, // 显示工具条
    flagViewpoint: false, // 添加观点面板默认不显示,hyt
    slidesarrays: new Array(0), // 漫游数组,hyt
    slidesarrayindex: -1, // 幻灯组索引
    flagBuildSearch: false, // 建筑查询
    falgPjReview: false, // 方案评审
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
      yield put({ type: 'changeStateImgShot', payload });
    },
    *screenShotDload({ payload }, { call, put }) {
      yield put({ type: SCREEN_DOWNLOAD, payload });
    },
    *btnSearchBuild({ payload }, { call, put }) {
      yield put({ type: SEARCH_BUILD, payload });
    },
    *pjReview({ payload }, { call, put }) {
      yield put({ type: PROJECT_REVIEW, payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    changeStateContent(state, action) {
      return {
        ...state,
        flagsContent: action.payload.flagsContent,
        flagToolbar: action.payload.flagToolbar,
      };
    },
    changeStateSceneMeasuer(state, action) {
      return { ...state, flagsSceneMeasure: action.payload };
    },
    changeStateAnalysisShadow(state, action) {
      return { ...state, flagsAnalysisShadow: action.payload };
    },
    changeStateUrlImgShot(state, action) {
      return { ...state, urlScreenShot: action.payload };
    },
    changeStateImgShot(state, action) {
      return { ...state, flagsImgScreenShot: action.payload.flagsImgScreenShot };
    },
    changeStateViewPoint(state, action) {
      return { ...state, flagViewpoint: action.payload.flagViewpoint };
    },
    changeStateBuildSearch(state, action) {
      return { ...state, flagBuildSearch: action.payload.flagBuildSearch };
    },
    changeStatePjReview(state, action) {
      return { ...state, falgPjReview: action.payload.falgPjReview };
    },
    setSlidesArray(state, action) {
      return {
        ...state,
        slidesarrayindex: action.payload.slidesarrayindex,
        slidesarrays: action.payload.slidesarrays,
      };
    },
    // changeStateToolbar(state, action) {
    //   return { ...state, flagToolbar: action.payload.flagToolbar };
    // },
  },
};
