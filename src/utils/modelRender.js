import {
  SWITCH_MODEL, SWITCH_MODEL_REAL,
  SWITCH_MODEL_WHITE, SWITCH_MODEL_CAO,
} from '../constants/action-types';

/**
 * 获取指定图层
 * @param {*} scenceView 场景视图
 * @param {*} itemId 图层id
 */
function getLayerByItem(scenceView, itemId) {
  const view = scenceView;
  console.log('图层', view);
  for (let i = 0; i < view.map.layers.items.length; i += 1) {
    if (view.map.layers.items[i].portalItem) {
      if (view.map.layers.items[i].portalItem.id === itemId) {
        return view.map.layers.items[i];
      }
    }
  }
  return null;
}

function myModelRender(layer, modelType) {
  const myLayer = layer;
  let locationRenderer = null;
  // 获取图层后判定切换模型
  if (modelType === SWITCH_MODEL_WHITE) {
    locationRenderer = {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'mesh-3d', // autocasts as new MeshSymbol3D()
        symbolLayers: [{
          type: 'fill', // autocasts as new FillSymbol3DLayer()
          material: {
            color: 'white',
            colorMixMode: 'replace',
          },
        }],
      },
    };
  } else if (modelType === SWITCH_MODEL_REAL) {
    console.log('真实渲染器', locationRenderer);
    locationRenderer = null;
  }
  console.log('渲染器', locationRenderer);
  // console.log('图层', ags.view.map.layers.items[i]);
  myLayer.renderer = locationRenderer;
}

export { getLayerByItem, myModelRender };
