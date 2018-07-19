/// <reference types="arcgis-js-api" />

import React from 'react';
import ReactDOM from 'react-dom';
import dom from 'dojo/dom';
import on from 'dojo/on';
import all from 'dojo/promise/all';
import domStyle from 'dojo/dom-style';
import domConstruct from 'dojo/dom-construct';
import esriConfig from 'esri/config';
import Map from 'esri/Map';
import Basemap from 'esri/Basemap';
import MapView from 'esri/views/MapView';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import WebTileLayer from 'esri/layers/WebTileLayer';
import SceneView from 'esri/views/SceneView';
import LayerList from 'esri/widgets/LayerList';
import IdentifyTask from 'esri/tasks/IdentifyTask';
import IdentifyParameters from 'esri/tasks/support/IdentifyParameters';

import Zoom from '../components/widgets/Zoom';
import NavigationToggle from '../components/widgets/NavigationToggle';
import Compass from '../components/widgets/Compass';
import Expand from '../components/widgets/Expand';
import OverviewButton from '../components/widgets/OverviewButton';
import Goto from '../components/widgets/Goto';
import Getpoints from '../components/widgets/Getpoints';

import EnglishChange from '../const/EnglishChange';
import BasemapConst from '../components/BasemapConst';
import MaritimeRelation from '../const/MaritimeRelation';

import SearchHelper from './search-helper';

let ovDiv;
let scene: SceneView;
let overview: MapView;
const defaultBase = BasemapConst.base.IMAGE;
const regUrl = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
const identifyLayers = [];
const camera = {
  position: {
    x: 119.587595,
    y: 39.947691,
    z: 23070000,
  },
};

function prepare() {
  esriConfig.request.proxyUrl = window.pageCfg.proxyUrl;
  esriConfig.request.corsEnabledServers.push([
    '180.168.99.221:6080',
    '192.168.4.210:6080',
    't6.tianditu.com',
    'localhost:8000', // debug server
  ]);
}

function buildIdentifyPopup(feature, layerName) {
  if (layerName === 'AidsToNavigationP') {
    feature.popupTemplate = { // autocasts as new PopupTemplate()
      title: "航标查询结果",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "S52_DISPLAY_TEXT",
          label: "DISPLAY",
        },
        {
          fieldName: "Data set name",
          label: "DSNM",
        },
        {
          fieldName: "Long name",
          label: "LNAM",
        },
        {
          fieldName: "PLTS compilation scale",
          label: "PLTS_COMP_SCALE",
        },
        {
          fieldName: "Name",
          label: "NAME",
        },
        {
          fieldName: "Object name",
          label: "OBJNAM",
        },
        {
          fieldName: "Object name in national language",
          label: "NOBJNM",
        },
        {
          fieldName: "Information",
          label: "INFORM",
        },
        {
          fieldName: "Information in national language",
          label: "NINFOM",
        }]
      }]
    };
  } else if (layerName === 'RegulatedAreasAndLimitsP' || layerName === 'RegulatedAreasAndLimitsL' || layerName === 'RegulatedAreasAndLimitsA') {
    feature.popupTemplate = {
      title: "锚地查询结果",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "S52_DISPLAY_TEXT",
          label: "DISPLAY",
        },
        {
          fieldName: "Data set name",
          label: "DSNM",
        },
        {
          fieldName: "Long name",
          label: "LNAM",
        },
        {
          fieldName: "PLTS compilation scale",
          label: "PLTS_COMP_SCALE",
        },
        {
          fieldName: "Name",
          label: "NAME",
        },
        {
          fieldName: "Object name",
          label: "OBJNAM",
        },
        {
          fieldName: "Object name in national language",
          label: "NOBJNM",
        },
        {
          fieldName: "Information",
          label: "INFORM",
        },
        {
          fieldName: "Information in national language",
          label: "NINFOM",
        }]
      }]
    };
  } else if (layerName === 'TracksAndRoutesL' || layerName === 'TracksAndRoutesA' || layerName === 'TracksAndRoutesP') {
    feature.popupTemplate = { // autocasts as new PopupTemplate()
      title: "航道查询结果",
      content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "S52_DISPLAY_TEXT",
          label: "DISPLAY",
        },
        {
          fieldName: "Data set name",
          label: "DSNM",
        },
        {
          fieldName: "Long name",
          label: "LNAM",
        },
        {
          fieldName: "PLTS compilation scale",
          label: "PLTS_COMP_SCALE",
        },
        {
          fieldName: "Name",
          label: "NAME",
        },
        {
          fieldName: "Object name",
          label: "OBJNAM",
        },
        {
          fieldName: "Object name in national language",
          label: "NOBJNM",
        },
        {
          fieldName: "Information",
          label: "INFORM",
        },
        {
          fieldName: "Information in national language",
          label: "NINFOM",
        }]
      }]
    };
  }
}

function prepareMaritimeAttrib(feature) {
  if (feature.attributes.cellName) {
    feature.attributes.cellName = feature.attributes.cellName.replace('.000', '');
  }

  switch (feature.attributes.cellName.charAt(2)) {
    case '1':
      feature.attributes.usage = 'Overview';
      break;
    case '2':
      feature.attributes.usage = 'General';
      break;
    case '3':
      feature.attributes.usage = 'Coastal';
      break;
    case '4':
      feature.attributes.usage = 'Approach';
      break;
    case '5':
      feature.attributes.usage = 'Harbour';
      break;
    case '6':
      feature.attributes.usage = 'Berthing';
      break;
    case '7':
      feature.attributes.usage = 'River';
      break;
    case '8':
      feature.attributes.usage = 'River harbour';
      break;
    case '9':
      feature.attributes.usage = 'River berthing';
      break;
    case 'A':
      feature.attributes.usage = 'Overlay';
      break;
    default:
      break;
  }

  feature.attributes.moreInfo = '';
}

function formatFeatureName(value, key, data) {
  return EnglishChange.englishChange[value] || value;
}

function moreInfoClick() {
  domStyle.set(moreInfoDiv, 'display', '');
}

function hideMoreInfo() {
  domStyle.set(moreInfoDiv, 'display', 'none');
}

function buildChartPopupContent(feature) {
  feature.attributes.objectType = formatFeatureName(feature.attributes.objectType);
  let content = "<table><tr><td>要素:</td><td style='padding-left: 1em;'>{objectType}</td></tr><tr><td>描述:</td><td style='padding-left: 1em;'>{objectTypeDescription}</td></tr><tr><td>要素类型:</td><td style='padding-left:1em;'>{geometryType}</td></tr><tr><td>用途:</td><td style='padding-left:1em;'>{usage}</td></tr><tr><td>绘图比例尺:</td><td style='padding-left:1em;'>{compilationScale}</td></tr></table>";
  content += "<div id='moreInfoDiv'>";
  content += "<hr noshade='noshade'>";
  content += "<div style='height: 200px; overflow: auto;'><table>";
  for (const key in feature.attributes) {
    if (key.length === 6) {
      content += "<tr><td>" + (EnglishChange.englishChange[key] || key) + ":" + "</td><td style='padding-left: 1em;'>" + feature.attributes[key] + "</td></tr>";
    }
  }

  content += "</table></div></div>";
  return content;
}

function buildChartIdentifyPopup(feature) {
  feature.popupTemplate = {
    title: '{cellName}',
    content: buildChartPopupContent(feature),
    actions: [{
      id: 'show-more-maritime-info',
      title: '显示更多',
      className: 'esri-icon-arrow-up-circled',
    }, {
      id: 'hide-more-maritime-info',
      title: '隐藏更多',
      className: 'esri-icon-arrow-down-circled',
    }],
  };
}

function isIdentifyLayerVisible(objType: string) {
  const acronyms = [];
  Object.keys(MaritimeRelation.rangeAcronymRe).forEach((k) => {
    if (MaritimeRelation.rangeAcronymRe[k].indexOf(objType.toUpperCase()) > -1) {
      acronyms.push(parseInt(k, 10));
    }
  });

  for (let j = 0; j < identifyLayers.length; j += 1) {
    const iLy = identifyLayers[j];
    const keyGrps = iLy.url.split('/');
    const key = keyGrps[keyGrps.length - 2];
    const subLayerIds = MaritimeRelation.chartLayerIdMap[key];

    if (Array.isArray(subLayerIds) && subLayerIds.length > 0) {
      for (let k = 0; k < subLayerIds.length; k += 1) {
        const sid = subLayerIds[k];
        const rangeIds = MaritimeRelation.layerRangeRe[sid];
        for (let i = 0; i < rangeIds.length; i += 1) {
          if (typeof rangeIds[i] === 'string') {
            const min = parseInt(rangeIds[i].split('-')[0], 10);
            const max = parseInt(rangeIds[i].split('-')[1], 10);
            const match = acronyms.find(n => n >= min && n <= max);
            if (match) {
              return true;
            }
          } else if (typeof rangeIds[i] === 'number') {
            if (acronyms.indexOf(rangeIds[i]) > -1) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
}

function executeIdentify(e) {
  SearchHelper.clearHighlight();
  const iLayers = identifyLayers;
  if (iLayers.length === 0) return;

  const oldLyrs = iLayers.filter(l => l.url.indexOf(':6080') > 0);
  const newYhLyrs = iLayers.filter(l => l.url.indexOf('ChartLyrs/MSA_') > 0);
  const newQqLyrs = iLayers.filter(l => l.url.indexOf('ChartLyrs/UKHO_') > 0);
  const newUsaLyrs = iLayers.filter(l => l.url.indexOf('ChartLyrs/NOAA_') > 0);
  const newTasks = [];
  let oldTasks = [];
  if (newYhLyrs.length > 0) {
    const url = `${window.pageCfg.newAgsServerRoot}/arcgis/rest/services/MCS/MSA/MapServer/exts/MaritimeChartService/MapServer`;
    const task = new IdentifyTask(url);
    const params = new IdentifyParameters();
    params.tolerance = 10;
    params.returnGeometry = true;
    // params.layerIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    params.layerOption = 'all';
    params.width = scene.width;
    params.height = scene.height;
    params.geometry = e.mapPoint;
    // params.outFields = [*];
    params.mapExtent = scene.extent;
    newTasks.push(task.execute(params));
  }

  if (newQqLyrs.length > 0) {
    const url = `${window.pageCfg.newAgsServerRoot}/arcgis/rest/services/MCS/UKHO/MapServer/exts/MaritimeChartService/MapServer`;
    const task = new IdentifyTask(url);
    const params = new IdentifyParameters();
    params.tolerance = 10;
    params.returnGeometry = true;
    // params.layerIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    params.layerOption = 'all';
    params.width = scene.width;
    params.height = scene.height;
    params.geometry = e.mapPoint;
    // params.outFields = [*];
    params.mapExtent = scene.extent;
    newTasks.push(task.execute(params));
  }

  if (newUsaLyrs.length > 0) {
    const url = `${window.pageCfg.newAgsServerRoot}/arcgis/rest/services/MCS/NOAA/MapServer/exts/MaritimeChartService/MapServer`;
    const task = new IdentifyTask(url);
    const params = new IdentifyParameters();
    params.tolerance = 10;
    params.returnGeometry = true;
    // params.layerIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    params.layerOption = 'all';
    params.width = scene.width;
    params.height = scene.height;
    params.geometry = e.mapPoint;
    // params.outFields = [*];
    params.mapExtent = scene.extent;
    newTasks.push(task.execute(params));
  }

  if (oldLyrs) {
    const tasks = oldLyrs.map(ol => new IdentifyTask(ol.url));
    const params = new IdentifyParameters();
    params.tolerance = 3;
    params.layerIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    params.layerOption = 'top';
    params.width = scene.width;
    params.height = scene.height;
    params.geometry = e.mapPoint;
    params.mapExtent = scene.extent;
    oldTasks = oldTasks.concat(tasks.map(t => t.execute(params)));
  }

  all([...newTasks, ...oldTasks])
    .then((results) => {
      const ret = [];
      for (let i = 0; i < results.length; i += 1) {
        const result = results[i];
        if (result.results.length > 0) {
          result.results.forEach((gra) => {
            if (gra.layerName === 'S57 Cells') {
              if (isIdentifyLayerVisible(gra.feature.attributes.objectType)) {
                prepareMaritimeAttrib(gra.feature);
                buildChartIdentifyPopup(gra.feature, gra.layerName);
                ret.push(gra.feature);
              }
            } else {
              buildIdentifyPopup(gra.feature, gra.layerName);
              ret.push(gra.feature);
            }
          });
        }
      }
      return ret;
    }).then((features) => {
      if (features.length === 0) return;

      scene.popup.open({
        features,
        location: e.mapPoint,
      });
    });
}

function updateOverviewExtent() {
  // Update the overview extent by converting the SceneView extent to the
  // MapView screen coordinates and updating the extentDiv position.
  const {
    extent,
  } = scene;

  const bottomLeft = overview.toScreen(extent.xmin, extent.ymin);
  const topRight = overview.toScreen(extent.xmax, extent.ymax);

  const extentDiv = dom.byId('ovExtDiv');
  extentDiv.style.top = `${topRight.y}px`;
  extentDiv.style.left = `${bottomLeft.x}px`;

  extentDiv.style.height = `${(bottomLeft.y - topRight.y)}px`;
  extentDiv.style.width = `${(topRight.x - bottomLeft.x)}px`;
}

function updateOverview() {
  // Animate the MapView to a zoomed-out scale so we get a nice overview.
  // We use the "progress" callback of the goTo promise to update
  // the overview extent while animating
  overview.goTo({
    center: scene.center,
    scale: scene.scale * 2 * Math.max(
      scene.width / overview.width,
      scene.height / overview.height),
  });
}

function loadConnections() {
  scene.then(() => {
    on(scene, 'click', executeIdentify);
    scene.popup.on('trigger-action', (event) => {
      if (event.action.id === 'show-more-maritime-info') {
        moreInfoClick();
      } else if (event.action.id === 'hide-more-maritime-info') {
        hideMoreInfo();
      }
    });
  });

  overview.then(() => {
    // Update the overview extent whenever the MapView or SceneView extent changes
    scene.watch('extent', updateOverviewExtent);
    overview.watch('extent', updateOverviewExtent);

    // Update the minimap overview when the main view becomes stationary
    scene.watch('stationary', updateOverview);
  });
}

function getBasemap(baseItem) {
  return regUrl.test(baseItem.value)
    ? new Basemap({
      baseLayers: [
        new WebTileLayer({
          urlTemplate: baseItem.value,
        }),
      ],
      id: 'base',
      title: baseItem.label,
    })
    : baseItem.value;
}

function toggleOverview() {
  if (ovDiv) {
    if (domStyle.get(ovDiv, 'display') === 'none') {
      domStyle.set(ovDiv, 'display', '');
    } else {
      domStyle.set(ovDiv, 'display', 'none');
    }
  }
}

function createOverview() {
  ovDiv = domConstruct.create('div', {
    style: 'width: 300px; height: 200px; border: 1px solid black; z-index: 1;display: none;',
  });
  domConstruct.create('div', {
    id: 'ovExtDiv',
  }, ovDiv);

  overview = new MapView({
    container: ovDiv,
    map: new Map({
      basemap: getBasemap(defaultBase),
    }),
    constraints: {
      rotationEnabled: false,
    },
  });
  overview.ui.components = [];
  scene.ui.add(ovDiv, {
    position: 'bottom-right',
  });
}

function createToolButtons() {
  // Zoom
  const zoomDiv = domConstruct.create('div');
  scene.ui.add(zoomDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<Zoom view={scene} />, zoomDiv);

  // NavigationToggle
  const naviDiv = domConstruct.create('div');
  scene.ui.add(naviDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<NavigationToggle view={scene} />, naviDiv);

  // Compass
  const compassDiv = domConstruct.create('div');
  scene.ui.add(compassDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<Compass view={scene} />, compassDiv);

  // Overview Button
  const overviewDiv = domConstruct.create('div');
  scene.ui.add(overviewDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<OverviewButton toggle={toggleOverview} />, overviewDiv);

  // LayerList
  const expandDiv = domConstruct.create('div');
  const layerList = new LayerList({
    container: domConstruct.create('div'),
    view: scene,
  });
  scene.ui.add(expandDiv, {
    position: 'top-right',
    index: 0,
  });
  ReactDOM.render(<Expand view={scene} content={layerList.domNode} expandIconClass="esri-icon-layers" />, expandDiv);
  // Goto
  const gotoDiv = domConstruct.create('div');
  scene.ui.add(gotoDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<Goto view={scene} />, gotoDiv);
  //Getpoints
  const getpointsDiv = domConstruct.create('div');
  scene.ui.add(getpointsDiv, {
    position: 'top-right',
  });
  ReactDOM.render(<Getpoints view={scene} />, getpointsDiv);

}

function create(domNode) {
  prepare();

  scene = new SceneView({
    map: new Map({
      basemap: getBasemap(defaultBase),
      layers: [new GraphicsLayer({ listMode: 'hide' })],
    }),
    ui: {
      components: [],
    },
    container: domNode,
    popup: {
      dockEnabled: true,
      dockOptions: {
        // Disables the dock button from the popup
        buttonEnabled: false,
        // Ignore the default sizes that trigger responsive docking
        breakpoint: false,

        position: 'bottom-left',
      },
    },
    camera,
  });

  createToolButtons();
  createOverview();
  loadConnections();
}

function getSceneView(): SceneView {
  return scene;
}

function getIdentifyLayers() {
  return identifyLayers;
}

export default {
  getSceneView,
  create,
  getIdentifyLayers,
  getBasemap,
};
