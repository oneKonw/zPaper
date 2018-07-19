import {
  MODE_DIR_BUS,
  PIN_END,
  PIN_START,
  MAP_ACTION_CLEAR,
  MAP_ACTION_DRAWLINE,
  MAP_ACTION_HIGHLIGHT,
} from '../constants/search';
import { queryBusStation } from '../services/tianditu/searchpoi';
import { planBusLine } from '../services/tianditu/busline';

export default {
  namespace: 'search',

  state: {
    // 根据关键字查询出来的待选项
    diropts: null,

    // 用户输入的关键字
    diropttext: '',

    // 起点或终点
    dirlttext: '',

    dirmode: MODE_DIR_BUS,

    start: null,
    starttext: '',
    startsearching: false,

    end: null,
    endtext: '',
    endsearching: false,

    loading: false,
    hasError: false,
    errMsg: '',

    lines: null,
  },

  effects: {
    *searchsolr({ payload }, { call, put }) {
      const { text, start, ltdir } = payload;
      if (ltdir === '起点') {
        yield put({ type: 'updateStartLoading', payload: true });
      } else {
        yield put({ type: 'updateEndLoading', payload: true });
      }
      const searchResp = yield call(queryBusStation, text, start);
      const response = searchResp.data;
      if (response) {
        yield put({
          type: 'updateDirOptions',
          payload: {
            data: response.pois,
            ltdir,
            text,
          },
        });
      }
    },
    *selectOpt({ payload }, { put, select }) {
      const text = yield select((store) => store.search.dirlttext);
      const currStart = yield select((store) => store.search.start);
      const currEnd = yield select((store) => store.search.end);
      switch (text) {
        case '起点':
          yield put({ type: PIN_START, payload });
          if (!currEnd) {
            yield put({ type: 'updateStart', payload });
          } else {
            yield put({ type: 'updateStartAndPlan', payload });
            yield put({
              type: 'planBusLine',
              payload: {
                start: payload,
                end: currEnd,
              },
            });
          }
          break;
        case '终点':
          yield put({ type: PIN_END, payload });
          if (!currStart) {
            yield put({ type: 'updateEnd', payload });
          } else {
            yield put({ type: 'updateEndAndPlan', payload });
            yield put({
              type: 'planBusLine',
              payload: {
                start: currStart,
                end: payload,
              },
            });
          }
          break;
        default:
          break;
      }
    },
    *planBusLine({ payload }, { put, call }) {
      const { start, end } = payload;
      const planResp = yield call(
        planBusLine,
        start.lonlat.replace(' ', ','),
        end.lonlat.replace(' ', ','),
      );

      const { data } = planResp;
      if (data) {
        switch (data.resultCode) {
          case 0: {
            const lines = data.results.filter(
              (line) => (line.lineType & 1) === 1,
            );
            if (lines.length > 0) {
              yield put({
                type: 'updateResults',
                payload: lines[0].lines,
              });
            }
            break;
          }
          case 1:
            yield put({ type: 'showError', payload: '找不到起点' });
            break;
          case 2:
            yield put({ type: 'showError', payload: '找不到终点' });
            break;
          case 3:
            yield put({ type: 'showError', payload: '规划线路失败' });
            break;
          case 4:
            yield put({
              type: 'showError',
              payload: '起终点距离200米以内，不规划线路，建议步行',
            });
            break;
          case 5:
            yield put({
              type: 'showError',
              payload: '起终点距离500米内，返回线路',
            });
            break;
          case 6:
            yield put({
              type: 'showError',
              payload: '输入参数错误',
            });
            break;
          default:
            break;
        }
      }
    },
    *drawBusLine({ payload }, { put, select }) {
      const lines = yield select((store) => store.search.lines);
      if (lines && lines.length > payload) {
        const line = lines[payload];
        yield put({ type: MAP_ACTION_DRAWLINE, payload: line });
      }
    },
    *highlightSegment({ payload }, { put }) {
      yield put({ type: MAP_ACTION_HIGHLIGHT, payload });
    },
    *clearSearch({ payload }, { put }) {
      yield put({ type: 'clearSearchState' });
      yield put({ type: MAP_ACTION_CLEAR });
    },
  },

  reducers: {
    updateDirMode(state, action) {
      return { ...state, dirmode: action.payload };
    },
    updateDirOptions(state, action) {
      return {
        ...state,
        diropts: action.payload.data,
        dirlttext: action.payload.ltdir,
        diropttext: action.payload.text,
        startsearching: false,
        endsearching: false,
        hasError: false,
        errMsg: '',
        loading: false,
      };
    },
    updateStart(state, action) {
      return {
        ...state,
        start: action.payload,
        starttext: action.payload.name,
        diropts: null,
      };
    },
    updateStartAndPlan(state, action) {
      return {
        ...state,
        start: action.payload,
        starttext: action.payload.name,
        diropts: null,
        loading: true,
      };
    },
    updateStartText(state, action) {
      return { ...state, starttext: action.payload };
    },
    updateStartLoading(state, action) {
      return { ...state, startsearching: action.payload };
    },
    updateEnd(state, action) {
      return {
        ...state,
        end: action.payload,
        endtext: action.payload.name,
        diropts: null,
      };
    },
    updateEndAndPlan(state, action) {
      return {
        ...state,
        end: action.payload,
        endtext: action.payload.name,
        diropts: null,
        loading: true,
      };
    },
    updateEndText(state, action) {
      return { ...state, endtext: action.payload };
    },
    updateEndLoading(state, action) {
      return { ...state, endsearching: action.payload };
    },
    updateResults(state, action) {
      return { ...state, lines: action.payload, loading: false };
    },
    clearSearchState(state) {
      return {
        ...state,
        hasError: false,
        errMsg: '',
        loading: false,
        lines: null,
        diropts: null,
        start: null,
        starttext: '',
        end: null,
        endtext: '',
      };
    },
    showError(state, action) {
      return {
        ...state,
        hasError: true,
        errMsg: action.payload,
        loading: false,
      };
    },
  },
};
