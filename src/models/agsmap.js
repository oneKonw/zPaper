import {
  INIT_MAP,
  VIEW_MODE_3D, SWITCH_MAP,
  SWITCH_MODEL,
  SWITCH_MODEL_REAL,
  FULL_SCREEN,
} from '../constants/action-types';

export default {
  namespace: 'agsmap',

  state: {
    modelType: SWITCH_MODEL_REAL,
    mode: VIEW_MODE_3D,
    btnSwitchMapFlags: true,
    fullScreenFlags: false,
    // ——————————————————————————————
    callflags: false,
    bookflags: false,
    correctflags: false,
    bookmarks: [],
    bookname: null,
    siderOpen: false,
    openMenu: null,
    chooseItemMenu: null,
    prolistflags: false,
    propicturechange: false,
  },

  subscriptions: {
    setup({ dispatch, history }) { // eslint-disable-line

    },
  },

  effects: {
    *fetch({ payload }, { call, put }) { // eslint-disable-line
      yield put({ type: 'save' });
    },

    *init({ payload }, { call, put }) { // eslint-disable-line
      yield put({ type: INIT_MAP, payload });
    },
    *transMode2d({ payload }, { put }) {
      yield put({ type: 'transMode2dState', payload });
      yield put({ type: SWITCH_MAP, payload });
      yield put({ type: 'btnSwitchMapChangeState', payload });
    },
    *transMode3d({ payload }, { put }) {
      yield put({ type: 'transMode3dState', payload });
      yield put({ type: SWITCH_MAP, payload });
      yield put({ type: 'btnSwitchMapChangeState', payload });
    },
    *transModel({ payload }, { put }) {
      yield put({ type: 'transModelRenderer', payload });
      yield put({ type: SWITCH_MODEL, payload });
    },
    // 分割---------------------------------
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    transMode3dState(state, action) {
      return { ...state, mode: action.payload.viewMode };
    },
    transMode2dState(state, action) {
      return { ...state, mode: action.payload.viewMode };
    },
    transModelRenderer(state, action) {
      return { ...state, modelType: action.payload };
    },
    btnSwitchMapChangeState(state, action) {
      return { ...state, btnSwitchMapFlags: action.payload.btnSwitchMapFlags };
    },
    // 切换视图占比
    fullScreenChangeState(state, action) {
      return { ...state, fullScreenFlags: action.payload };
    },
    // 分割-----------------
  },
};
