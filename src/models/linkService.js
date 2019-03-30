import {
  INIT_MAP,
  VIEW_MODE_3D, SWITCH_MAP,
  SWITCH_MODEL,
  SWITCH_MODEL_REAL,
  FULL_SCREEN,
} from '../constants/action-types';

import { doLogin, doLogup, doLogout } from '../services/systemUser';


export default {
  namespace: 'linkService',

  state: {
    username: '',
    isLogin: false,
    modalVisible: false,
    authToken: '',
    pathname: '/',
    logupModalVisible: false
    // modelType: SWITCH_MODEL_REAL,
    // mode: VIEW_MODE_3D,
    // btnSwitchMapFlags: true,
    // fullScreenFlags: false,
    // ——————————————————————————————
  },

  subscriptions: {
    setup({ dispatch, history }) { // eslint-disable-line

    },
  },

  effects: {
    *doLogin({ payload }, { call, put }) {
      let {
        userData,
        resolve,
        reject
      } = payload; // 获取传入数据
      yield put({ type: 'showLoading' }); // 启动加载action
      const { data } = yield call(doLogin, userData); // 调用引入的方法
      console.log('返回数据', data);
      if (data && data.success) { // 返回对象成功
        let userInfo = data.userInfo; // 获取数据
        yield sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); // 设置session数据
        //登录成功
        yield put({
          type: 'loginSuccess',
          payload: userInfo
        });
        resolve(); // 结束promise
      } else {
        reject(data); // 登录失败返回数据
      }
    },
    // 分割---------------------------------
  },

  reducers: {
    login(state, action) {
      return { ...state, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};