import React from 'react';
import { Tooltip, Icon } from 'antd';
import Polyline from 'esri/geometry/Polyline';
import Polygon from 'esri/geometry/Polygon';
import geometryEngine from 'esri/geometry/geometryEngine';
import TextSymbol from 'esri/symbols/TextSymbol';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import lang from 'dojo/_base/lang';
import styles from './WidgetButtons.css';

class Measureline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      over: false,
    };
    this.Measureline = this.Measureline.bind(this);
    this.mapView = props.view;
    this.resultLayer = new GraphicsLayer();
    this.drawLayer = new GraphicsLayer();
    this.lineSymbol = {
      type: 'simple-line',  // autocasts as new SimpleLineSymbol()
      color: 'red',
      width: '2px',
    };
    this.textSymbolCfg = {
      type: 'text',  // autocasts as new TextSymbol()
      color: 'green',
      haloColor: 'black',
      haloSize: '1px',
      text: 'You are here',
      xoffset: 3,
      yoffset: 3,
      font: {  // autocast as new Font()
        size: 12,
        family: 'sans-serif',
        weight: 'bolder',
      },
    };
    this.fillSymbol = {
      type: 'simple-fill',  // autocasts as new SimpleFillSymbol()
      color: [255, 0, 0, 0.3],
      outline: {  // autocasts as new SimpleLineSymbol()
        color: [255, 0, 0, 0.3],
        width: '0.5px',
      } };
    this.startPoint = null;
    this.controlPoints = [];
  }

  Measureline() {
    this.props.view.when((view) => {
      this.mouseClickHandle = view.on('click', (evt) => {
        console.log('点击');
        console.log(this.state.over);
        if (this.state.over) {
          this.clear();
          console.log(this.state.over);
          this.mapView.map.remove(this.drawLayer);
          this.mapView.map.remove(this.resultLayer);
          this.controlPoints = [];
        } this.state.over = false;
        this.toolTip = new Tooltip({ mapView: view });
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
            spatialReference: this.mapView.spatialReference,
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
            spatialReference: this.mapView.spatialReference,
          });
          const graphic = new Graphic({
            geometry: geometry1,
            symbol: this.fillSymbol,
          });
          this.drawLayer.add(graphic);
          // 添加结果
          const areaResult = geometryEngine.geodesicArea(geometry1, 'square-kilometers');
          const textSymbol = new TextSymbol(this.textSymbolCfg);
          textSymbol.text = Math.round(Math.abs(areaResult) * 100) / 100 + '平方公里';
          const graphicPoint = new Graphic({
            geometry: currentPoint,
            symbol: textSymbol,
          });
          this.drawLayer.add(graphicPoint);
          this.mapView.map.add(this.drawLayer);
          this.mapView.map.add(this.resultLayer);
        }
      });
      this.mouseMoveHandle = view.on('pointer-move', (evt) => {
        console.log('移动');
        this.toolTip = new Tooltip({ mapView: view });
        this.mouseMove(evt);
      });
      this.mouseDoubleClickHandle = view.on('double-click', (evt) => {
        console.log('双击');
        this.toolTip = new Tooltip({ mapView: view });
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
        spatialReference: this.mapView.spatialReference,
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
        spatialReference: this.mapView.spatialReference,
      });
      const graphic = new Graphic({
        geometry: geometry1,
        symbol: this.fillSymbol,
      });
      this.drawLayer.add(graphic);
      // 添加结果
      const areaResult = geometryEngine.geodesicArea(geometry1, 'square-kilometers');
      const textSymbol = new TextSymbol(this.textSymbolCfg);
      textSymbol.text = Math.round(Math.abs(areaResult) * 100) / 100 + '平方公里';
      const graphicPoint = new Graphic({
        geometry: mapPoint,
        symbol: textSymbol,
      });
      this.drawLayer.add(graphicPoint);
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
        spatialReference: this.mapView.spatialReference,
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
        spatialReference: this.mapView.spatialReference,
      });
      const graphic = new Graphic({
        geometry: geometry1,
        symbol: this.fillSymbol,
      });
      this.drawLayer.add(graphic);
      // 添加结果
      const areaResult = geometryEngine.geodesicArea(geometry1, 'square-kilometers');
      const textSymbol = new TextSymbol(this.textSymbolCfg);
      textSymbol.text = Math.round(Math.abs(areaResult) * 100) / 100 + '平方公里';
      const graphicPoint = new Graphic({
        geometry: mapPoint,
        symbol: textSymbol,
      });
      this.drawLayer.add(graphicPoint);
    }
    this.mapView.map.add(this.resultLayer);
    this.mapView.map.add(this.drawLayer);
  }
  deactivate() {
    // this.mapView.gestureManager.inputManager.gestures["double-click"].options.enable = true;
    if (this.mouseMoveHandle !== undefined && this.mouseMoveHandle !== null) {
      this.mouseMoveHandle.remove();
    }
    if (this.mouseClickHandle !== undefined && this.mouseClickHandle !== null) {
      this.mouseClickHandle.remove();
    }
    if (this.mouseDoubleClickHandle !== undefined && this.mouseDoubleClickHandle !== null) {
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
    console.log(evt);
    // let adjustedX = evt.x;
    // let adjustedY = evt.y;
    if (evt.x !== undefined) {
      // adjustedX = evt.x - this..position[0];
      // adjustedY = evt.y - this.mapView.position[1];
    } return this.mapView.toMap(evt.x, evt.y);
  }
  clear() {
    if (this.drawLayer) {
      this.drawLayer.removeAll();
    }
    if (this.resultLayer) {
      this.resultLayer.removeAll();
    }
  }
  render() {
    return (
      <div>
        <Tooltip placement="left" title="测面">
          <a
            className={styles.btn}
            onClick={() => {
              if (this.state.deactivate) {
                this.clear();
                this.deactivate();
                this.state.deactivate = false;
              } else {
                this.Measureline();
                this.state.deactivate = true;
              }
            }}
          >
            <Icon type="plus" style={{ color: '#ffffff' }} />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default Measureline;
