import React from 'react';
import ReactDOM from 'react-dom';
import AreaMeasurement3D from 'esri/widgets/AreaMeasurement3D';
import DirectLineMeasurement3D from 'esri/widgets/DirectLineMeasurement3D';

import { removeMeasureWidget } from '../../../utils/sceneMeasure';
import { myLookAround } from '../../../utils/lookAround';
import {
  setMaskPosition, clamp, showPreview,
  downloadImage, getImageWithText,
} from '../../../utils/screenShot';
import styles from '../../../components/ContentLayout/ToolBar.css';

import {
  VIEW_GOTO,
  SCENE_MEASURE, SCENE_MEASURE_LINE, SCENE_MEASURE_AREA,
  LOOK_AROUND,
  SCREEN_SHOT, SCREEN_DOWNLOAD,
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
        // 判断清除插件或测量
        if (typeof (payload) === 'boolean') {
          removeMeasureWidget(ags.view, activeWidget);
        } else {
          switch (payload) {
            case SCENE_MEASURE_LINE: {
              console.log('线测量');
              // 插件存在则清空重载，下同
              if (activeWidget) {
                // 清空
                removeMeasureWidget(ags.view, activeWidget);
              }
              // 重载
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
      // 环视
      case LOOK_AROUND: {
        // 这只可终结定时器
        console.log('环视', ags.view.camera);
        const { payload } = action;
        myLookAround(ags.view, payload);
        // const camera = ags.view.camera.clone();
        // camera.heading += 10;
        // ags.view.goTo(camera);
        break;
      }

      // 导出
      case SCREEN_SHOT: {
        const maskDiv = action.payload.maskDiv;
        const screenshotDiv = action.payload.screenshotDiv;
        const screenshotImage = action.payload.screenshotImage;

        ags.view.container.classList.add(styles.screenshotCursor);
        let myArea = null;
        const dragHandler = ags.view.on('drag', (event) => {
          event.stopPropagation();
          console.log('事件', event);
          if (event.action !== 'end') {
            // 计算截图四个角的坐标
            const xmin = clamp(Math.min(event.origin.x, event.x), 0, ags.view.width);
            const xmax = clamp(Math.max(event.origin.x, event.x), 0, ags.view.width);
            const ymin = clamp(Math.min(event.origin.y, event.y), 0, ags.view.height);
            const ymax = clamp(Math.max(event.origin.y, event.y), 0, ags.view.height);
            myArea = {
              x: xmin,
              y: ymin,
              width: xmax - xmin,
              height: ymax - ymin,
            };
            setMaskPosition(myArea, maskDiv);
          } else {
            // // 清除监听
            dragHandler.remove();
            ags.view.takeScreenshot({ area: myArea, format: 'png' })
              .then((screenshot) => {
                // this.setState({
                //   imgScreenShot: screenshot,
                // });
                showPreview(screenshot, screenshotDiv, screenshotImage);
                ags.view.container.classList.remove(styles.screenshotCursor);
                setMaskPosition(null, maskDiv);
                store.dispatch({
                  type: 'agsOperate/changeStateUrlImgShot',
                  payload: screenshot,
                });
                // imgScreenShot = screenshot;
              });
          }
        });
        break;
      }

      // 下载截图
      case SCREEN_DOWNLOAD: {
        const { midText, midImg } = action.payload;
        if (midText) {
          const dataUrl = getImageWithText(midImg, midText);
          downloadImage(ags.view.map.portalItem.title + '.png', dataUrl);
        } else {
          downloadImage(ags.view.map.portalItem.title + '.png', midImg.dataUrl);
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

