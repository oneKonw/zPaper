import React from 'react';
import ReactDOM from 'react-dom';
import domConstruct from 'dojo/dom-construct';

// import esriConfig from 'esri/config';
// import Basemap from 'esri/Basemap';
// import TileLayer from 'esri/layers/TileLayer';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import WebScene from 'esri/WebScene';
import Sceneview from 'esri/views/SceneView';
// import EsriMap from 'esri/Map';

// 组件
import BasemapGallery from 'esri/widgets/BasemapGallery';
import Zoom from '../../../components/widgets/Zoom';
import NavigationToggle from '../../../components/widgets/NavigationToggle';
// import Getpoints from '../../../components/widgets/Getpoints';
import Compass from '../../../components/widgets/Compass';
import { getLayerByItem, myModelRender } from '../../../utils/modelRender';

import {
  INIT_MAP,
  SWITCH_MAP,
  VIEW_MODE_2D,
  VIEW_MODE_3D,
  SWITCH_MODEL, SWITCH_MODEL_REAL, SWITCH_MODEL_WHITE, SWITCH_MODEL_CAO,
  ACTION_ADDBOOKMARK_2D,
  ACTION_GOTOBOOKMARK_2D,
  ACTION_DELETBOOKMARK_2D,
  ACTION_DELETTHISBOOKMARK_2D,
  ACTION_EDITBOOKMARK_2D,
  ACTION_MAP_2D_CORRECT,
} from '../../../constants/action-types';
import env from '../../../utils/env';
// 新建ags对象
const ags = {};
// 设置全局ags
env.setParamAgs(ags);

// function prepare() {
//   // 获取代理服务器地址
//   esriConfig.request.proxyUrl = env.getProxyUrl();
// }

function createMap(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return store => next => action => {
    switch (action.type) {
      case INIT_MAP: {
        // 将变量container赋值为获取到的div容器
        const { payload } = action;
        const { container, viewMode } = payload;

        // DOM container not defined
        if (!container) break;

        // if sceneview container is already initialized, just add it back to the DOM.
        if (ags.container) {
          container.appendChild(ags.container);
          break;
        }

        // Otherwise, create a new container element and a new scene view.
        // 新建对象属性container，赋值为一个div
        ags.container = document.createElement('div');
        // 将存放ags的div添加到原本获取到的DOM节点上
        container.appendChild(ags.container);

        // 获取代理地址
        // prepare();

        // 判断view的mode，决定初始化2d地图或3d场景
        if (viewMode === VIEW_MODE_2D) {
          initMapView();
          // Initialize map
          // initializeMap(basemap);
        } else if (viewMode === VIEW_MODE_3D) {
          // 初始化三维场景
          initSceneView();
        }
        // create buttons
        // 创建地图自带的按钮
        // getpoints();
        // When initialized...
        return ags.view.when(() => {
          // Update the environment settings (either from the state or from the scene)
        });
      }

      // 切换地图模式
      case SWITCH_MAP: {
        console.log('切换', action.payload);
        const viewPoint = ags.view.viewpoint.clone();
        ags.view.container = null;
        // const basemap = env.getDefaultBasemap3D();
        const payload = action.payload.viewMode;
        if (payload === VIEW_MODE_2D) {
          initMapView();
          createToolButtons();
          // initializeMap(basemap);
          // getpoints();
        } else if (payload === VIEW_MODE_3D) {
          initSceneView();
          // 获取并渲染建筑图层
          ags.view.when(() => {
            const layer = getLayerByItem(ags.view, env.getBuildLayerId());
            console.log('图层', layer);
            myModelRender(layer, action.payload.modelType);
          });
        }
        ags.view.viewpoint = viewPoint;
        break;
      }

      // 切换模型
      // 参数：ags.view ，切换类型
      case SWITCH_MODEL: {
        const { payload } = action;
        const layer = getLayerByItem(ags.view, env.getBuildLayerId());
        console.log('图层', layer);
        myModelRender(layer, payload);
        break;
      }

      // 地图纠错
      case ACTION_MAP_2D_CORRECT: {
        console.log('地图纠错');
        // MapCorrect.mapTwoView = ags.view;
        // MapCorrect.active('point');
        if (store.getState().agsmap.correctflags) {
          // prepare();
          store.dispatch({
            type: 'agsmap/mapcorrectChangeState',
            payload: false,
          });
        } else {
          store.dispatch({
            type: 'agsmap/mapcorrectChangeState',
            payload: true,
          });
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

// 初始二维地图
function initMapView() {
  const webmap = new WebMap({
    portalItem: {
      id: env.getWebMapId(),
      portal: env.getPortal(),
    },
  });
  ags.view = new MapView({
    container: ags.container,
    map: webmap,
    ui: {
      components: [],
    },
  });
}

// 初始化三维场景
function initSceneView() {
  const scene = new WebScene({
    portalItem: {
      id: env.getWebSceneId(),
      portal: env.getPortal(),
    },
  });
  ags.view = new Sceneview({
    container: ags.container,
    map: scene,
    environment: {
      atmosphere: {
        quality: 'high',
      },
      lighting: {
        date: new Date(),
        directShadowsEnabled: true,
        cameraTrackingEnabled: false,
      },
    },
    ui: {
      components: [],
    },
  });
}

// 地图工具
function createToolButtons() {
  // Home
  // const homeDiv = domConstruct.create('div');
  // ags.view.ui.add(homeDiv, {
  //   position: 'bottom-right',
  // });
  // ReactDOM.render(<Home view={ags.view} />, homeDiv);

  // Zoom
  // const zoomDiv = domConstruct.create('div');
  // ags.view.ui.add(zoomDiv, {
  //   position: 'bottom-right',
  // });
  // ReactDOM.render(<Zoom view={ags.view} />, zoomDiv);

  // // Compass
  // const compassDiv = domConstruct.create('div');
  // ags.view.ui.add(compassDiv, {
  //   position: 'bottom-right',
  // });
  // ReactDOM.render(<Compass view={ags.view} />, compassDiv);

  // LayerList
  // const expandDiv = domConstruct.create('div');
  // expandDiv.style.position = 'absolute';
  // expandDiv.style.top = '50px';
  // expandDiv.style.right = '-8px';
  // const layerList = new LayerList({
  //   container: domConstruct.create('div'),
  //   view: ags.view,
  // });
  // ags.view.ui.add(expandDiv, {
  //   position: 'top-right',
  //   index: 0,
  // });
  // ReactDOM.render(
  //   <Expand
  //     view={ags.view}
  //     content={layerList.domNode}
  //     expandIconClass="esri-icon-layers"
  //   />,
  //   expandDiv,
  // );

  // BasemapGallery
  const basemapGalleryDiv = domConstruct.create('div');
  basemapGalleryDiv.style.position = 'absolute';
  basemapGalleryDiv.style.bottom = '27px';
  basemapGalleryDiv.style.right = '10px';
  const basemapGallery = new BasemapGallery({
    container: basemapGalleryDiv,
    view: ags.view,
  });
  ags.view.ui.add(basemapGallery, {
    position: 'bottom-right',
    index: 0,
  });
  // ags.view.when(() => {
  //   setTimeout(() => {
  //     // console.log(basemapGalleryDiv.childNodes[0].childNodes);
  //     for (const liitems of basemapGalleryDiv.childNodes[0].childNodes) {
  //       // console.log(liitems.title);
  //       liitems.style.display = 'none';
  //       if (liitems.title === '天地图全球影像图') {
  //         liitems.style.display = 'flex';
  //       }
  //       if (liitems.title === '天地图全球矢量图') {
  //         liitems.style.display = 'flex';
  //       }
  //     }
  //   }, 3000);
  // });
}

// function create3DToolButtons() {
//   // NavigationToggle
//   const naviDiv = domConstruct.create('div');
//   ags.view.ui.add(naviDiv, {
//     position: 'top-left',
//   });
//   ReactDOM.render(<NavigationToggle view={ags.view} />, naviDiv);
// }

export { createMap, ags };
