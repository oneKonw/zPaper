import {
  SWITCH_MODEL, SWITCH_MODEL_REAL,
  SWITCH_MODEL_WHITE, SWITCH_MODEL_SKETCH,
} from '../constants/action-types';

let locationRenderer = null;

const sketchEdges = {
  type: 'sketch',
  color: [0, 0, 0, 0.6],
  size: 1,
};

/**
 * 获取指定图层
 * @param {*} scenceView 场景视图
 * @param {*} itemId 图层id
 */
function getLayerByItem(scenceView, itemId) {
  const view = scenceView;
  for (let i = 0; i < view.map.layers.items.length; i += 1) {
    if (view.map.layers.items[i].portalItem) {
      if (view.map.layers.items[i].portalItem.id === itemId) {
        console.log('建筑图层', view.map.layers.items[i]);
        return view.map.layers.items[i];
      }
    }
  }
  return null;
}

function myModelRender(layer, modelType) {
  const myLayer = layer;
  // 获取图层后判定切换模型
  switch (modelType) {
    case SWITCH_MODEL_WHITE: {
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
      break;
    }
    case SWITCH_MODEL_REAL: {
      console.log('真实渲染器', locationRenderer);
      locationRenderer = null;
      break;
    }
    case SWITCH_MODEL_SKETCH: {
      locationRenderer = layer.renderer.clone();
      locationRenderer.symbol.symbolLayers.items[0].edges = sketchEdges;
      console.log('草图渲染', locationRenderer);
      break;
    }
    default: {
      break;
    }
  }
  myLayer.renderer = locationRenderer;
}

export { getLayerByItem, myModelRender };
