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

import {
  INIT_MAP,
  SWITCH_MAP,
  VIEW_MODE_2D,
  VIEW_MODE_3D,
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
        // createToolButtons();
        // getpoints();
        // When initialized...
        return ags.view.when(() => {
          // Update the environment settings (either from the state or from the scene)
        });
      }

      // 切换地图模式
      case SWITCH_MAP: {
        console.log('切换');
        const viewPoint = ags.view.viewpoint.clone();
        ags.view.container = null;
        // const basemap = env.getDefaultBasemap3D();
        const { payload } = action;
        if (payload === VIEW_MODE_2D) {
          initMapView();
          // initializeMap(basemap);
          // getpoints();
        } else if (payload === VIEW_MODE_3D) {
          // const showl = document.getElementById('showl');
          // showl.innerHTML = '';
          initSceneView();
        }
        ags.view.viewpoint = viewPoint;
        // create buttons
        // createToolButtons();
        // create 3D buttons
        // if (payload === VIEW_MODE_3D) {
        //   create3DToolButtons();
        // }
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


      // 地图书签
      case ACTION_ADDBOOKMARK_2D: {
        if (ags.view) {
          const extent = ags.view.extent;
          // 保存

          store.dispatch({
            type: 'agsmap/updateBookmarks',
            payload: [
              ...store.getState().agsmap.bookmarks,
              {
                name: action.payload,
                newextent: extent,
              },
            ],
          });
        }
        break;
      }

      case ACTION_GOTOBOOKMARK_2D: {
        if (ags.view) {
          const bookname = action.payload;
          const books = store.getState().agsmap.bookmarks;
          books.forEach(element => {
            if (element.name === bookname) {
              ags.view.goTo(element.newextent.extent);
            }
          });
        }
        break;
      }

      // 删除书签
      case ACTION_DELETBOOKMARK_2D: {
        if (ags.view) {
          store.dispatch({
            type: 'agsmap/updateBookmarks',
            payload: [],
          });
        }
        break;
      }

      // 删除当前书签
      case ACTION_DELETTHISBOOKMARK_2D: {
        if (ags.view) {
          const bookname = action.payload;
          const books = store.getState().agsmap.bookmarks;
          books.forEach(element => {
            if (element.name === bookname) {
              const index = books.indexOf(element);
              books.splice(index, 1);
            }
          });
          store.dispatch({
            type: 'agsmap/updateBookmarks',
            payload: books,
          });
        }
        break;
      }

      // 编辑书签
      case ACTION_EDITBOOKMARK_2D: {
        if (ags.view) {
          const oldname = action.payload.oldname;
          const newname = action.payload.newname;
          const books = store.getState().agsmap.bookmarks;
          const extent = ags.view.extent;
          const newelement = {
            name: newname,
            newextent: extent,
          };
          books.forEach(element => {
            if (element.name === oldname) {
              const index = books.indexOf(element);
              books.splice(index, 1, newelement);
            }
          });
          store.dispatch({
            type: 'agsmap/updateBookmarks',
            payload: books,
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
  const zoomDiv = domConstruct.create('div');
  ags.view.ui.add(zoomDiv, {
    position: 'bottom-right',
  });
  ReactDOM.render(<Zoom view={ags.view} />, zoomDiv);

  // Compass
  const compassDiv = domConstruct.create('div');
  ags.view.ui.add(compassDiv, {
    position: 'bottom-right',
  });
  ReactDOM.render(<Compass view={ags.view} />, compassDiv);

  // BasemapGallery
  const basemapGalleryDiv = domConstruct.create('div');
  basemapGalleryDiv.style.position = 'absolute';
  basemapGalleryDiv.style.bottom = '-20px';
  basemapGalleryDiv.style.right = '-5px';
  const basemapGallery = new BasemapGallery({
    container: basemapGalleryDiv,
    view: ags.view,
  });
  ags.view.ui.add(basemapGallery, {
    position: 'bottom-right',
    index: 0,
  });
  ags.view.when(() => {
    setTimeout(() => {
      // console.log(basemapGalleryDiv.childNodes[0].childNodes);
      for (const liitems of basemapGalleryDiv.childNodes[0].childNodes) {
        // console.log(liitems.title);
        liitems.style.display = 'none';
        if (liitems.title === '天地图全球影像图') {
          liitems.style.display = 'flex';
        }
        if (liitems.title === '天地图全球矢量图') {
          liitems.style.display = 'flex';
        }
      }
    }, 3000);
  });
}

function create3DToolButtons() {
  // NavigationToggle
  const naviDiv = domConstruct.create('div');
  ags.view.ui.add(naviDiv, {
    position: 'top-left',
  });
  ReactDOM.render(<NavigationToggle view={ags.view} />, naviDiv);
}

export { createMap, ags };
