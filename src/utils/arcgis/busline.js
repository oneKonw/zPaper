import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import GroupLayer from 'esri/layers/GroupLayer';

import geometryEngine from 'esri/geometry/geometryEngine';

import { IDX_LAYER_BUS } from '../../constants/layer-index';

const ID_GROUP_LAYER = 'layer-busline';
const ID_PIN_LAYER = 'layer-busline-pin';
const ID_ROUTE_LAYER = 'layer-busline-route';
const ID_HIGHLIGHT_LAYER = 'layer-busline-highlight';

const LINE_SYMBOL = { type: 'simple-line', width: '4px' };

/**
 * Private Function
 * Find Busline group layer in the view
 * @param {MapView | SceneView} view
 */
function getBuslineGroupLayer(view) {
  const gLayer = view.map.layers.find((lyr) => {
    return lyr.id === ID_GROUP_LAYER;
  });

  if (gLayer) return gLayer;

  const pinLayer = new GraphicsLayer({
    id: ID_PIN_LAYER,
  });
  const routeLayer = new GraphicsLayer({
    id: ID_ROUTE_LAYER,
  });
  const highlightLyr = new GraphicsLayer({
    id: ID_HIGHLIGHT_LAYER,
  });
  const lyr = new GroupLayer({
    id: ID_GROUP_LAYER,
    listMode: 'hide', // do not list the bus line layer in LayerList | Legend widget
    layers: [routeLayer, highlightLyr, pinLayer],
  });

  // Add the group layer to the view
  view.map.layers.add(lyr, IDX_LAYER_BUS);

  return lyr;
}

function getBuslinePinLayer(view) {
  const lyr = getBuslineGroupLayer(view);
  return lyr.layers.getItemAt(2);
}

function getBuslineRouteLayer(view) {
  const lyr = getBuslineGroupLayer(view);
  return lyr.layers.getItemAt(0);
}

function getBuslineHighlightLayer(view) {
  const lyr = getBuslineGroupLayer(view);
  return lyr.layers.getItemAt(1);
}

function drawWalkRouteLine(view, segLine) {
  const lyr = getBuslineRouteLayer(view);
  const { linePoint } = segLine;
  const points = linePoint.split(';');
  const paths = [];
  for (const point of points) {
    if (point !== '') {
      const coordArr = point.split(',');
      paths.push([+coordArr[0], +coordArr[1]]);
    }
  }

  const gra = new Graphic({
    geometry: {
      type: 'polyline',
      paths,
    },
    symbol: {
      ...LINE_SYMBOL,
      color: 'orange',
      style: 'short-dot',
    },
  });
  lyr.graphics.add(gra);
  return gra;
}

function drawBusRouteLine(view, segLine) {
  const lyr = getBuslineRouteLayer(view);
  const { linePoint } = segLine;
  const points = linePoint.split(';');
  const paths = [];
  for (const point of points) {
    if (point !== '') {
      const coordArr = point.split(',');
      paths.push([+coordArr[0], +coordArr[1]]);
    }
  }

  const gra = new Graphic({
    geometry: {
      type: 'polyline',
      paths,
    },
    symbol: {
      ...LINE_SYMBOL,
      color: 'blue',
    },
  });
  lyr.graphics.add(gra);
  return gra;
}

function drawMetroRouteLine(view, segLine) {
  const lyr = getBuslineRouteLayer(view);
  const { linePoint } = segLine;
  const points = linePoint.split(';');
  const paths = [];
  for (const point of points) {
    if (point !== '') {
      const coordArr = point.split(',');
      paths.push([+coordArr[0], +coordArr[1]]);
    }
  }

  const gra = new Graphic({
    geometry: {
      type: 'polyline',
      paths,
    },
    symbol: {
      ...LINE_SYMBOL,
      color: 'blue',
    },
  });
  lyr.graphics.add(gra);
  return gra;
}

class BusLine {
  static addStartLocation(view, lon, lat) {
    const gl = getBuslinePinLayer(view);

    gl.graphics.add(
      new Graphic({
        geometry: {
          type: 'point',
          longitude: lon,
          latitude: lat,
        },
        symbol: {
          type: 'picture-marker',
          url: './images/start.png',
          height: '24px',
          width: '24px',
        },
      }),
    );
  }

  static addEndLocation(view, lon, lat) {
    const gl = getBuslinePinLayer(view);

    gl.graphics.add(
      new Graphic({
        geometry: {
          type: 'point',
          longitude: lon,
          latitude: lat,
        },
        symbol: {
          type: 'picture-marker',
          url: './images/end.png',
          height: '24px',
          width: '24px',
        },
      }),
    );
  }

  static drawPlanLine(view, segments) {
    BusLine.clearHighlightLayer();

    // 清除规划线路图层的Graphic
    BusLine.clearLineLayer(view);

    const lines = [];
    for (const segment of segments) {
      // 天地图API说明是1-4，没有具体说明对应的类型
      switch (segment.segmentType) {
        case 1: {
          // 步行
          const { segmentLine } = segment;
          for (const segLine of segmentLine) {
            const line = drawWalkRouteLine(view, segLine);
            lines.push(line);
          }
          break;
        }
        case 2: {
          // 公交
          const { segmentLine } = segment;
          for (const segLine of segmentLine) {
            const line = drawBusRouteLine(view, segLine);
            lines.push(line);
          }
          break;
        }
        case 3: {
          // 地铁
          const { segmentLine } = segment;
          for (const segLine of segmentLine) {
            const line = drawMetroRouteLine(view, segLine);
            lines.push(line);
          }
          break;
        }
        case 4:
          break;
        default:
          break;
      }
    }

    view.goTo(
      geometryEngine.union(lines.map((gra) => gra.geometry)).extent.expand(2),
    );
  }

  static highlightSegment(view, index) {
    const lyr = BusLine.clearHighlightLayer(view);
    const rLyr = getBuslineRouteLayer(view);

    const gra = rLyr.graphics.getItemAt(index);
    lyr.graphics.add(
      new Graphic({
        geometry: gra.geometry,
        symbol: {
          ...LINE_SYMBOL,
          color: '#00ffff',
        },
      }),
    );
  }

  static clearHighlightLayer(view) {
    const lyr = getBuslineHighlightLayer(view);
    lyr.graphics.removeAll();

    return lyr;
  }

  static clearLineLayer(view) {
    const rgl = getBuslineRouteLayer(view);
    rgl.graphics.removeAll();

    return rgl;
  }

  static clear(view) {
    const gl = getBuslinePinLayer(view);
    gl.graphics.removeAll();

    const rgl = getBuslineRouteLayer(view);
    rgl.graphics.removeAll();

    const hgl = getBuslineHighlightLayer(view);
    hgl.graphics.removeAll();
  }
}

export default BusLine;
