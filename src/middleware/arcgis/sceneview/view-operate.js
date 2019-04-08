import React from 'react';
import ReactDOM from 'react-dom';

import AreaMeasurement3D from 'esri/widgets/AreaMeasurement3D';
import DirectLineMeasurement3D from 'esri/widgets/DirectLineMeasurement3D';
import QueryTask from 'esri/tasks/QueryTask';
import Query from 'esri/tasks/support/Query';

import { Carousel, Alert } from 'antd';
// 以上为绝对引用

import { removeMeasureWidget } from '../../../utils/sceneMeasure';
import { myLookAround } from '../../../utils/lookAround';
import {
  setMaskPosition, clamp, showPreview,
  downloadImage, getImageWithText,
} from '../../../utils/screenShot';
import styles from '../../../components/ToolBar/ToolBar.css';

import {
  VIEW_GOTO,
  SCENE_MEASURE, SCENE_MEASURE_LINE, SCENE_MEASURE_AREA,
  LOOK_AROUND,
  SCREEN_SHOT, SCREEN_DOWNLOAD,
  SEARCH_BUILD,
  PROJECT_REVIEW,
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

      // 建筑查询
      case SEARCH_BUILD: {
        // const ags = env.getParamAgs();
        const view = ags.view;
        const scene = view.map;
        // console.log(scene.allLayers);
        const sceneLayer = scene.allLayers.items[2];
        // console.log(sceneLayer.getFieldUsageInfo('name'));
        console.log(sceneLayer);

        let query = new Query({
          objectIds: ['10555'],
          outFields: ["*"]
        });
        view.whenLayerView(sceneLayer).then((sceneLayerView) => {

          sceneLayerView.queryExtent(query).then((result) => {
            view.goTo(
              {
                target: result.extent.expand(2),
                tilt: 60
              },
              {
                duration: 1000,
                easing: "out-expo"
              }
            );
          });

          sceneLayerView.queryFeatures(query).then((result) => {
            console.log(result.features[0].attributes);
          });
        });

        const queryUrl = sceneLayer.parsedUrl.path;
        // console.log(ags.view.layerViews.items[0]);
        // console.log('url', sceneLayer.parsedUrl.path);
        // console.log('getFieldUsageInfo', sceneLayer.getFieldUsageInfo());
        // ----------------find task-------------------------
        // const find = new FindTask({
        //   url: sceneLayer.parsedUrl.path,
        // });
        // const params = new FindParameters({
        //   // layerIds: [5],
        //   searchFields: ['*'],
        // });
        // params.searchText = 'g';
        // find.execute(params)
        //   .then((response) => {
        //     // const results = response.results;
        //     console.log('findResponse', response);
        //   })
        //   .catch((error) => {
        //     console.error('results', error.message);
        //   });
        // ----------------find task-------------------------
        // ----------------query task -----------------------
        // const qTask = new QueryTask({
        //   url: queryUrl,
        // });
        // const paramsQuery = new Query({
        //   returnGeometry: false,
        //   outFields: ['*'],
        //   where: "description = 'Multi Family Residential'",
        //   // where: 'yddm = \'H14\'',
        // });
        // // paramsQuery.where = 'SSD_RESA_PY_ModelName = \'SW1J000A\'';
        // qTask.execute(paramsQuery)
        //   .then((response) => {
        //     console.log('queryResponse', response);
        //   })
        //   .catch((error) => {
        //     console.error('results', error.message);
        //   });
        // ----------------query task -----------------------
        // const query = new Query({
        //   where: 'description = \'Multi Family Residential\'',
        //   outFields: ['*'],
        // });
        // console.log('Query', query);
        // sceneLayer.queryFeatures(query)
        //   .then((response) => {
        //     console.log('response', response);
        //   })
        //   .catch((error) => {
        //     console.error('Error', error.message);
        //   });
        // view.whenLayerView(sceneLayer).then((sceneLayerView) => {
        //   console.log('Layerview', sceneLayerView);
        // });
        // -----------------queryFeatures------------------------

        // const query = new Query({
        //   outFields: ['*'],
        // });

        // sceneLayer.queryFeatures(query)
        //   .then((result) => {
        //     const tempResult = result;
        //     console.log(tempResult);
        //   }).catch((error) => {
        //     console.error('Error', error.message);
        //   });
        // -------------------layerview query --------------
        break;


      }

      // 方案评审
      /**
       * [0]底图[1]地形[2]其他建筑[3]规划建筑
       * [4]方案二[5]规划地面[6]二道路[7]二树木[8]二建筑
       * [9]方案一[10]规划地面[11]一道路[12]一树木[13]一建筑
       */
      case PROJECT_REVIEW: {
        // console.log(action.payload);
        const view = ags.view;
        const scene = view.map;
        let layerCode;
        let show;
        // 图层数，底图地形图，方案总图不进行对比切换
        let allLayers = ["2", "3", "5", "6", "7", "8", "10", "11", "12", "13"];
        // checkedKeys勾选状态的数组
        let { checkedKeys, checked } = action.payload;
        if (checkedKeys != undefined) {
          /**
           * 总图层与勾选图层双遍历，数组产生重叠则显示图层，不重叠则不显示
           */
          for (let index = 0; index < allLayers.length; index++) {
            const tempCode = allLayers[index];
            const sceneLayer = scene.allLayers.items[tempCode];

            show = false; // 默认为不显示

            for (let index1 = 0; index1 < checkedKeys.length; index1++) {
              // 产生重叠则显示图层
              if (tempCode == checkedKeys[index1]) {
                show = true;
                break; // 产生重叠即可跳出循环
              }
            }

            if (show) {
              sceneLayer.visible = true; // 建筑图层切换
            } else {
              sceneLayer.visible = false; // 建筑图层切换
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

