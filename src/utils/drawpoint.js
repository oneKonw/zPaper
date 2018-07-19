import React from 'react';
import ReactDom from 'react-dom';
import { Tooltip } from 'antd';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import PopupTemplate from 'esri/PopupTemplate';
import domConstruct from 'dojo/dom-construct';
import Polyline from 'esri/geometry/Polyline';
import Polygon from 'esri/geometry/Polygon';
// import geometryEngine from 'esri/geometry/geometryEngine';
// import TextSymbol from 'esri/symbols/TextSymbol';
import lang from 'dojo/_base/lang';
import PopupContent from '../components/callout/CalloutGround';
import PopupLine from '../components/callout/CalloutLine';
import PopupFlat from '../components/callout/CalloutFlat';

class DrawPoint {
  constructor(view) {
    this.mapTwoView = view;
    this.state = {};
    this.graphicsLayerTwo = new GraphicsLayer();
    this.mapTwoView.map.add(this.graphicsLayerTwo);
    this.mapTwoView.map.reorder(this.graphicsLayerTwo, 7);
  }

  Drawpoint() {
    this.mapTwoView.when((view) => {
      this.mouseOnClick = view.on('click', (evt) => {
        this.clear();
        const point = {
          type: 'point',
          longitude: evt.mapPoint.longitude,
          latitude: evt.mapPoint.latitude,
        };
        const pointSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          url: './images/pointSymbol.png',
          width: '18px',
          height: '27px',
        };
        // const
        const graphicPointTwo = new Graphic({
          geometry: point,
          symbol: pointSymbol,
        });
        const div = domConstruct.create('div');
        ReactDom.render(
          <PopupContent
            view={this.mapTwoView}
            layer={this.graphicsLayerTwo}
            event={this.mouseOnClick}
          />,
          div,
        );
        const template = new PopupTemplate({
          location: evt.mapPoint,
          title: 'Population by Gender',
          content: div,
        });
        graphicPointTwo.popupTemplate = template;
        this.mapTwoView.popup.open({
          features: [graphicPointTwo],
          location: evt.mapPoint,
        });

        this.graphicsLayerTwo.add(graphicPointTwo);
      });
    });
  }
  clear() {
    if (this.graphicsLayerTwo) {
      this.graphicsLayerTwo.removeAll();
    }
  }
}

class DrawLine {
  constructor(view) {
    this.mapTwoView = view;
    this.state = {
      over: false,
      deactivate: false,
    };
    this.resultLayer = new GraphicsLayer();
    this.drawLayer = new GraphicsLayer();
    this.mapTwoView.map.add(this.resultLayer);
    this.mapTwoView.map.add(this.drawLayer);
    this.lineSymbol = {
      type: 'simple-line', // autocasts as new SimpleLineSymbol()
      color: 'red',
      width: '2px',
    };
    this.textSymbolCfg = {
      type: 'text', // autocasts as new TextSymbol()
      color: 'green',
      haloColor: 'black',
      haloSize: '1px',
      text: 'You are here',
      xoffset: 3,
      yoffset: 3,
      font: {
        // autocast as new Font()
        size: 12,
        family: 'sans-serif',
        weight: 'bolder',
      },
    };
    this.controlPoints = [];
  }
  Drawline() {
    this.mapTwoView.when((view) => {
      this.mouseClickHandle = view.on('click', (evt) => {
        if (this.state.over) {
          // this.clear();
          // console.log(this.state.over);
          // this.mapTwoView.map.remove(this.drawLayer);
          // this.mapTwoView.map.remove(this.resultLayer);
          // this.controlPoints = [];
          this.deactivate();
        }
        this.state.over = false;
        this.toolTip = new Tooltip({ mapTwoView: view });
        this.controlPoints.push([evt.mapPoint.x, evt.mapPoint.y]);
        // 添加线
        const Geometry = new Polyline({
          paths: this.controlPoints,
          spatialReference: this.mapTwoView.spatialReference,
        });
        const graphicLine = new Graphic({
          geometry: Geometry,
          symbol: this.lineSymbol,
        });
        this.drawLayer.removeAll();
        this.drawLayer.add(graphicLine);
        this.mapTwoView.map.add(this.drawLayer);
        this.mapTwoView.map.add(this.resultLayer);
      });
      this.mouseMoveHandle = view.on('pointer-move', (evt) => {
        this.toolTip = new Tooltip({ mapTwoView: view });
        this.mouseMove(evt);
      });
      this.mouseDoubleClickHandle = view.on('double-click', (evt) => {
        // const closelayer = this.drawlayer;
        const divl = domConstruct.create('div');
        ReactDom.render(
          <PopupLine
            view={this.mapTwoView}
            draw={this.drawLayer}
            result={this.resultLayer}
          />,
          divl,
        );
        const templatel = new PopupTemplate({
          location: evt.mapPoint,
          title: 'Population by Gender',
          content: divl,
        });
        this.lineTemp.popupTemplate = templatel;
        this.mapTwoView.popup.open({
          features: [this.lineTemp],
          location: evt.mapPoint,
        });
        this.toolTip = new Tooltip({ mapTwoView: view });
        this.complete(evt);
      });
    });
  }

  mouseMove(evt) {
    if (this.controlPoints.length === 0) {
      return;
    }

    // this.toolTip.setTipContent('单击确定地点，双击结束');
    const mapPoint = this.toMapPoint(evt);
    const controlPoints = lang.clone(this.controlPoints);
    controlPoints.push([mapPoint.x, mapPoint.y]);
    if (controlPoints.length > 1) {
      this.drawLayer.removeAll();
      const Geometry = new Polyline({
        paths: controlPoints,
        spatialReference: this.mapTwoView.spatialReference,
      });
      this.lineTemp = new Graphic({
        geometry: Geometry,
        symbol: this.lineSymbol,
        spatialReference: this.mapTwoView.spatialReference,
      });
      this.drawLayer.add(this.lineTemp);
    }
    this.mapTwoView.map.add(this.resultLayer);
    this.mapTwoView.map.add(this.drawLayer);
  }
  deactivate() {
    if (this.mouseMoveHandle !== undefined && this.mouseMoveHandle !== null) {
      this.mouseMoveHandle.remove();
    }
    if (this.mouseClickHandle !== undefined && this.mouseClickHandle !== null) {
      this.mouseClickHandle.remove();
    }
    if (
      this.mouseDoubleClickHandle !== undefined &&
      this.mouseDoubleClickHandle !== null
    ) {
      this.mouseDoubleClickHandle.remove();
    }
    if (this.mouseRDownHandle !== undefined && this.mouseRDownHandle !== null) {
      this.mouseRDownHandle.remove();
    }
    this.controlPoints = [];
  }

  complete(evt) {
    if (evt && evt.stopPropagation) {
      // 因此它支持W3C的stopPropagation()方法
      evt.stopPropagation();
    } else if (evt && evt.srcEvent) {
      evt.srcEvent.stopPropagation();
    } else {
      // 否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
    }
    if (this.controlPoints.length === 0) {
      return;
    }
    // this.toolTip.deactivateTip();
    // this.deactivate();
    this.controlPoints = [];
    this.state.over = true;
  }

  toMapPoint(evt) {
    // let adjustedX = evt.x;
    // let adjustedY = evt.y;
    if (evt.x !== undefined) {
      // adjustedX = evt.x - this.mapTwoView.position[0];
      // adjustedY = evt.y - this.mapTwoView.position[1];
    }
    return this.mapTwoView.toMap(evt.x, evt.y);
  }
  clear() {
    if (this.drawLayer) {
      this.drawLayer.removeAll();
    }
    if (this.resultLayer) {
      this.resultLayer.removeAll();
    }
  }
}

class DrawArea {
  constructor(view) {
    this.state = {
      over: false,
    };
    this.mapTwoView = view;
    this.resultLayer = new GraphicsLayer();
    this.drawLayer = new GraphicsLayer();
    this.lineSymbol = {
      type: 'simple-line', // autocasts as new SimpleLineSymbol()
      color: 'red',
      width: '2px',
    };
    this.textSymbolCfg = {
      type: 'text', // autocasts as new TextSymbol()
      color: 'green',
      haloColor: 'black',
      haloSize: '1px',
      text: 'You are here',
      xoffset: 3,
      yoffset: 3,
      font: {
        // autocast as new Font()
        size: 12,
        family: 'sans-serif',
        weight: 'bolder',
      },
    };
    this.fillSymbol = {
      type: 'simple-fill', // autocasts as new SimpleFillSymbol()
      color: [255, 0, 0, 0.3],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 0, 0, 0.3],
        width: '0.5px',
      },
    };
    this.startPoint = null;
    this.controlPoints = [];
  }

  Drawflat() {
    this.mapTwoView.when((view) => {
      this.mouseClickHandle = view.on('click', (evt) => {
        if (this.state.over) {
          // this.clear();
          // console.log(this.state.over);
          // this.mapTwoView.map.remove(this.drawLayer);
          // this.mapTwoView.map.remove(this.resultLayer);
          // this.controlPoints = [];
          this.deactivate();
        }
        this.state.over = false;
        this.toolTip = new Tooltip({ mapTwoView: view });
        // 添加起点
        const currentPoint = evt.mapPoint;
        this.controlPoints.push([evt.mapPoint.x, evt.mapPoint.y]);
        this.drawLayer.removeAll();
        if (this.controlPoints.length === 1) {
          this.startPoint = currentPoint;
        } else if (this.controlPoints.length === 2) {
          // 添加临时线
          const geometry1 = new Polyline({
            paths: this.controlPoints,
            spatialReference: this.mapTwoView.spatialReference,
          });
          const graphicLine = new Graphic({
            geometry: geometry1,
            symbol: this.lineSymbol,
          });
          this.drawLayer.add(graphicLine);
        } else {
          const controlPoints = lang.clone(this.controlPoints);
          controlPoints.push([this.startPoint.x, this.startPoint.y]);
          const geometry1 = new Polygon({
            rings: controlPoints,
            spatialReference: this.mapTwoView.spatialReference,
          });
          const graphic = new Graphic({
            geometry: geometry1,
            symbol: this.fillSymbol,
          });
          this.drawLayer.add(graphic);
          this.mapTwoView.map.add(this.drawLayer);
          this.mapTwoView.map.add(this.resultLayer);
        }
      });
      this.mouseMoveHandle = view.on('pointer-move', (evt) => {
        this.toolTip = new Tooltip({ mapTwoView: view });
        this.mouseMove(evt);
      });
      this.mouseDoubleClickHandle = view.on('double-click', (evt) => {
        const divl = domConstruct.create('div');
        ReactDom.render(
          <PopupFlat
            view={this.mapTwoView}
            result={this.resultLayer}
            draw={this.drawLayer}
          />,
          divl,
        );
        const templatel = new PopupTemplate({
          location: evt.mapPoint,
          title: 'Population by Gender',
          content: divl,
        });
        this.drawLayer.graphics.items[0].popupTemplate = templatel;
        this.mapTwoView.popup.open({
          features: [this.drawLayer.graphics.items[0]],
          location: evt.mapPoint,
        });
        this.toolTip = new Tooltip({ mapTwoView: view });
        this.complete(evt);
      });
    });
  }

  addControlPoint(evt) {
    if (this.controlPoints.length === 0) {
      return;
    }
    this.toolTip.setTipContent('单击确定地点，双击结束');
    const mapPoint = this.toMapPoint(evt);
    const controlPoints = lang.clone(this.controlPoints);
    controlPoints.push([mapPoint.x, mapPoint.y]);
    this.drawLayer.removeAll();
    if (controlPoints.length === 2) {
      // 添加临时线
      const geometry1 = new Polyline({
        paths: controlPoints,
        spatialReference: this.mapTwoView.spatialReference,
      });
      const graphicLine = new Graphic({
        geometry: geometry1,
        symbol: this.lineSymbol,
      });
      this.drawLayer.add(graphicLine);
    } else if (controlPoints.length > 2) {
      controlPoints.push([this.startPoint.x, this.startPoint.y]);
      const geometry1 = new Polygon({
        rings: controlPoints,
        spatialReference: this.mapTwoView.spatialReference,
      });
      const graphic = new Graphic({
        geometry: geometry1,
        symbol: this.fillSymbol,
      });
      this.drawLayer.add(graphic);
    }
  }

  mouseMove(evt) {
    if (this.controlPoints.length === 0) {
      return;
    }
    const mapPoint = this.toMapPoint(evt);
    const controlPoints = lang.clone(this.controlPoints);
    controlPoints.push([mapPoint.x, mapPoint.y]);
    this.drawLayer.removeAll();
    if (controlPoints.length === 2) {
      // 添加临时线
      const geometry1 = new Polyline({
        paths: controlPoints,
        spatialReference: this.mapTwoView.spatialReference,
      });
      const graphicLine = new Graphic({
        geometry: geometry1,
        symbol: this.lineSymbol,
      });
      this.drawLayer.add(graphicLine);
    } else if (controlPoints.length > 2) {
      controlPoints.push([this.startPoint.x, this.startPoint.y]);
      const geometry1 = new Polygon({
        rings: controlPoints,
        spatialReference: this.mapTwoView.spatialReference,
      });
      const graphic = new Graphic({
        geometry: geometry1,
        symbol: this.fillSymbol,
      });
      this.drawLayer.add(graphic);
    }
    this.mapTwoView.map.add(this.resultLayer);
    this.mapTwoView.map.add(this.drawLayer);
  }
  deactivate() {
    if (this.mouseMoveHandle !== undefined && this.mouseMoveHandle !== null) {
      this.mouseMoveHandle.remove();
    }
    if (this.mouseClickHandle !== undefined && this.mouseClickHandle !== null) {
      this.mouseClickHandle.remove();
    }
    if (
      this.mouseDoubleClickHandle !== undefined &&
      this.mouseDoubleClickHandle !== null
    ) {
      this.mouseDoubleClickHandle.remove();
    }
    if (this.mouseRDownHandle !== undefined && this.mouseRDownHandle !== null) {
      this.mouseRDownHandle.remove();
    }
    this.controlPoints = [];
  }

  complete(evt) {
    if (this.controlPoints.length === 0) {
      return;
    }
    this.resultLayer.graphics.addMany(this.drawLayer.graphics.items);
    if (evt && evt.stopPropagation) {
      // 因此它支持W3C的stopPropagation()方法
      evt.stopPropagation();
    } else if (evt && evt.srcEvent) {
      evt.srcEvent.stopPropagation();
    } else {
      // 否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
    }
    if (this.controlPoints.length === 0) {
      return;
    }
    // this.toolTip.deactivateTip();
    // this.deactivate();
    this.controlPoints = [];
    this.state.over = true;
  }
  closeResult(evt) {
    this.console.log(evt);
  }
  toMapPoint(evt) {
    if (evt.x !== undefined) {
      // adjustedX = evt.x - this..position[0];
      // adjustedY = evt.y - this.mapTwoView.position[1];
    }
    return this.mapTwoView.toMap(evt.x, evt.y);
  }
  clear() {
    if (this.drawLayer) {
      this.drawLayer.removeAll();
    }
    if (this.resultLayer) {
      this.resultLayer.removeAll();
    }
  }
}

class DrawSimple {
  // constructor(view) {
  //   this.activeTool = null;
  //   this.mapTwoView = view;
  // }

  static active(tool) {
    if (this.activeTool !== undefined && this.activeTool !== null) {
      // this.activeTool.deactivate();
    }
    if (tool === 'point') {
      this.activeTool = new DrawPoint(this.mapTwoView);
      this.activeTool.Drawpoint();
    }
    if (tool === 'route') {
      this.activeTool = new DrawLine(this.mapTwoView);
      this.activeTool.Drawline();
    }
    if (tool === 'flat') {
      this.activeTool = new DrawArea(this.mapTwoView);
      this.activeTool.Drawflat();
    }
  }
}

export default DrawSimple;
