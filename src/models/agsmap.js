import {
  INIT_MAP,
  VIEW_MODE_3D, SWITCH_MAP,
  ACTION_ADDBOOKMARK_2D,
  ACTION_GOTOBOOKMARK_2D,
  ACTION_DELETBOOKMARK_2D,
  ACTION_DELETTHISBOOKMARK_2D,
  ACTION_EDITBOOKMARK_2D,
} from '../constants/action-types';

export default {
  namespace: 'agsmap',

  state: {
    mode: VIEW_MODE_3D,
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
    },
    *transMode3d({ payload }, { put }) {
      yield put({ type: 'transMode3dState', payload });
      yield put({ type: SWITCH_MAP, payload });
    },
    *addBookmark({ payload }, { put }) {
      yield put({ type: ACTION_ADDBOOKMARK_2D, payload });
    },
    *gotoBookmark({ payload }, { put }) {
      yield put({ type: ACTION_GOTOBOOKMARK_2D, payload });
    },
    *deletBookmark({ payload }, { put }) {
      yield put({ type: ACTION_DELETBOOKMARK_2D, payload });
    },
    *deletthisBookmark({ payload }, { put }) {
      yield put({ type: ACTION_DELETTHISBOOKMARK_2D, payload });
    },
    *editBookmark({ payload }, { put }) {
      yield put({ type: ACTION_EDITBOOKMARK_2D, payload });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    transMode3dState(state, action) {
      return { ...state, mode: action.payload };
    },
    transMode2dState(state, action) {
      return { ...state, mode: action.payload };
    },
    bookmarkChangeState(state, action) {
      return { ...state, bookflags: action.payload };
    },
    mapcorrectChangeState(state, action) {
      return { ...state, correctflags: action.payload };
    },
    updateBookmarks(state, action) {
      return { ...state, bookmarks: action.payload };
    },
    toggleSider(state, action) {
      return { ...state, siderOpen: action.payload };
    },
    select(state, action) {
      return { ...state, openMenu: action.payload };
    },
    chooseItems(state, action) {
      return { ...state, chooseItemMenu: action.payload };
    },
    prolistChangeState(state, action) {
      return { ...state, prolistflags: action.payload };
    },
    propictureChangeState(state, action) {
      return { ...state, propicturechange: action.payload };
    },
  },
};
