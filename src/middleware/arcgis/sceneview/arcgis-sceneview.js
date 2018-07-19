import React from 'react';
import ReactDOM from 'react-dom';
import domConstruct from 'dojo/dom-construct';

import esriConfig from 'esri/config';
// import Basemap from 'esri/Basemap';
// import TileLayer from 'esri/layers/TileLayer';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import WebScene from 'esri/WebScene';
import Sceneview from 'esri/views/SceneView';
// import EsriMap from 'esri/Map';

// 组件
import BasemapGallery from 'esri/widgets/BasemapGallery';
// import Expand from '../../../components/widgets/Expand';
// import LayerList from 'esri/widgets/LayerList';
// import Home from '../../../components/widgets/Home';
import DirectLineMeasurement3D from 'esri/widgets/DirectLineMeasurement3D';
import AreaMeasurement3D from 'esri/widgets/AreaMeasurement3D';
import MeasureUtil from '../../../utils/measure';
import DrawSimple from '../../../utils/drawpoint';
import MapCorrect from '../../../utils/mapcorrection';
import Zoom from '../../../components/widgets/Zoom';
import NavigationToggle from '../../../components/widgets/NavigationToggle';
// import Getpoints from '../../../components/widgets/Getpoints';

import Compass from '../../../components/widgets/Compass';

import {
  INIT_MAP,
  SWITCH_MAP,
  VIEW_MODE_2D,
  VIEW_MODE_3D,
  ACTION_MEASURE_LINE_3D,
  ACTION_MEASURE_AREA_3D,
  ACTION_MEASURE_2D_AREA,
  ACTION_MEASURE_2D_LINE,
  ACTION_DRAW_POINT_2D,
  ACTION_DRAW_LINE_2D,
  ACTION_DRAW_FLAT_2D,
  ACTION_ADDBOOKMARK_2D,
  ACTION_GOTOBOOKMARK_2D,
  ACTION_DELETBOOKMARK_2D,
  ACTION_DELETTHISBOOKMARK_2D,
  ACTION_EDITBOOKMARK_2D,
  ACTION_MAP_2D_CORRECT,
  ACTION_ADDMAPCORRECT_2D,
} from '../../../constants/action-types';
import {
  PIN_START,
  PIN_END,
  MAP_ACTION_DRAWLINE,
  MAP_ACTION_CLEAR,
  MAP_ACTION_HIGHLIGHT,
} from '../../../constants/search';
import BusLineUtil from '../../../utils/arcgis/busline';
import env from '../../../utils/env';

const ags = {};

function prepare() {
  esriConfig.request.proxyUrl = env.getProxyUrl();
}

function createMap(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return store => next => action => {
    switch (action.type) {
      case INIT_MAP: {
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
        ags.container = document.createElement('div');
        container.appendChild(ags.container);

        prepare();

        if (viewMode === VIEW_MODE_2D) {
          initMapView();
          // Initialize map
          // initializeMap(basemap);
        } else if (viewMode === VIEW_MODE_3D) {
          initSceneView();
        }
        // create buttons
        createToolButtons();
        // getpoints();
        // When initialized...
        return ags.view.when(() => {
          // Update the environment settings (either from the state or from the scene)
        });
      }
      case SWITCH_MAP: {
        // const basemap = env.getDefaultBasemap3D();
        const { payload } = action;
        if (payload === VIEW_MODE_2D) {
          initMapView();
          // initializeMap(basemap);
          // getpoints();
        } else if (payload === VIEW_MODE_3D) {
          const showl = document.getElementById('showl');
          showl.innerHTML = '';
          initSceneView();
        }
        // create buttons
        createToolButtons();
        // create 3D buttons
        if (payload === VIEW_MODE_3D) {
          create3DToolButtons();
        }
        break;
      }
      case ACTION_MEASURE_LINE_3D: {
        let directLineMeasurement3D = new DirectLineMeasurement3D();
        directLineMeasurement3D.view = ags.view;
        directLineMeasurement3D.view.on('double-click', () => {
          directLineMeasurement3D.clearMeasurement();
          directLineMeasurement3D = null;
        });
        break;
      }
      case ACTION_MEASURE_AREA_3D: {
        const areaMeasurement3D = new AreaMeasurement3D();
        areaMeasurement3D.view = ags.view;
        break;
      }
      case ACTION_MEASURE_2D_LINE: {
        MeasureUtil.mapView = ags.view;
        MeasureUtil.active('line');
        break;
      }
      case ACTION_MEASURE_2D_AREA: {
        MeasureUtil.mapView = ags.view;
        MeasureUtil.active('area');
        // if (!measureline) measureline = new MeasureUtil(ags.view);
        // measureline.active('area');
        break;
      }
      case ACTION_DRAW_POINT_2D: {
        DrawSimple.mapTwoView = ags.view;
        DrawSimple.active('point');
        break;
      }
      case ACTION_DRAW_LINE_2D: {
        DrawSimple.mapTwoView = ags.view;
        DrawSimple.active('route');
        break;
      }
      case ACTION_DRAW_FLAT_2D: {
        DrawSimple.mapTwoView = ags.view;
        DrawSimple.active('flat');
        break;
      }
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
      case ACTION_ADDMAPCORRECT_2D: {
        MapCorrect.mapTwoView = ags.view;
        MapCorrect.active('point');
        break;
      }
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
      case ACTION_DELETBOOKMARK_2D: {
        if (ags.view) {
          store.dispatch({
            type: 'agsmap/updateBookmarks',
            payload: [],
          });
        }
        break;
      }
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
      case PIN_START: {
        const { payload } = action;
        const { lonlat } = payload;
        const coordArr = lonlat.split(' ');
        if (ags.view) {
          ags.view.goTo({
            center: [+coordArr[0], +coordArr[1]],
            zoom: 17,
          });
          BusLineUtil.addStartLocation(ags.view, +coordArr[0], +coordArr[1]);
        }

        break;
      }
      case PIN_END: {
        const { payload } = action;
        const { lonlat } = payload;
        const coordArr = lonlat.split(' ');
        if (ags.view) {
          ags.view.goTo({
            center: [+coordArr[0], +coordArr[1]],
            zoom: 17,
          });
          BusLineUtil.addEndLocation(ags.view, +coordArr[0], +coordArr[1]);
        }
        break;
      }
      case MAP_ACTION_DRAWLINE: {
        const { payload } = action;
        const { segments } = payload;
        BusLineUtil.drawPlanLine(ags.view, segments);

        break;
      }
      case MAP_ACTION_CLEAR: {
        if (ags.view) {
          BusLineUtil.clear(ags.view);
        }
        break;
      }
      case MAP_ACTION_HIGHLIGHT: {
        const { payload } = action;
        if (ags.view) {
          BusLineUtil.highlightSegment(ags.view, payload);
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
    ui: {
      components: [],
    },
  });
}

// function initializeMap(basemap) {
//   const map = new EsriMap({ basemap: 'topo' });
//   if (basemap) {
//     if (typeof basemap === 'string') {
//       map.basemap = basemap;
//     } else if (
//       typeof basemap === 'object' &&
//       Object.hasOwnProperty.call(basemap, 'url')
//     ) {
//       map.basemap = new Basemap({
//         id: 'basemap1',
//         title: '底图',
//         baseLayers: [new TileLayer({ url: basemap.url })],
//       });
//     }
//     ags.view.map = map;
//     ags.view.ui.components = [];
//   }
// }


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

export { createMap };
