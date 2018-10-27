import React from 'react';
import ReactDOM from 'react-dom';
import AreaMeasurement3D from 'esri/widgets/AreaMeasurement3D';
import DirectLineMeasurement3D from 'esri/widgets/DirectLineMeasurement3D';

import { removeMeasureWidget } from '../../../utils/sceneMeasure';

import {
  VIEW_GOTO,
  SCENE_MEASURE,
  SCENE_MEASURE_LINE,
  SCENE_MEASURE_AREA,
} from '../../../constants/action-types';
import env from '../../../utils/env';

const ags = env.getParamAgs();
let activeWidget = null;

function viewOperate(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return store => next => action => {
    switch (action.type) {
      case VIEW_GOTO: {
        console.log('图卡点击');
        break;
      }
      // 地图测量
      case SCENE_MEASURE: {
        const { payload } = action;
        if (typeof (payload) === 'boolean') {
          removeMeasureWidget(ags.view, activeWidget);
        } else {
          switch (payload) {
            case SCENE_MEASURE_LINE: {
              console.log('线测量');
              if (activeWidget) {
                removeMeasureWidget(ags.view, activeWidget);
              }
              activeWidget = new DirectLineMeasurement3D({
                view: ags.view,
              });
              ags.view.ui.add(activeWidget, 'bottom-right');
              break;
            }
            case SCENE_MEASURE_AREA: {
              console.log('面测量');
              if (activeWidget) {
                removeMeasureWidget(ags.view, activeWidget);
              }
              activeWidget = new AreaMeasurement3D({
                view: ags.view,
              });
              ags.view.ui.add(activeWidget, 'bottom-right');
              break;
            }
            default: {
              break;
            }
          }
        }
        break;
      }
      default: {
        next(action);
        break;
      }
    }

    return Promise.resolve();
  };
}

export { viewOperate };

