import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input } from 'antd';

import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import WebStyleSymbol from 'esri/symbols/WebStyleSymbol';

import styles from './Add3D.css';
import env from '../../utils/env';

const blue = [82, 82, 122, 0.9];
const white = [255, 255, 255, 0.8];

class Add3D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: undefined,
      sketchVM: undefined,
      gLayer: new GraphicsLayer(), // 绘制图层
      // blue: [82, 82, 122, 0.9],
      // white: [255, 255, 255, 0.8],
      extrudedPolygon: {
        type: "polygon-3d",
        symbolLayers: [
          {
            type: "extrude",
            size: 10, // extrude by 10 meters
            material: {
              color: white
            },
            edges: {
              type: "solid",
              size: "3px",
              color: blue
            }
          }
        ]
      },
      route: {
        type: "line-3d",
        symbolLayers: [
          {
            type: "line",
            size: "3px",
            material: {
              color: blue
            }
          },
          {
            type: "line",
            size: "10px",
            material: {
              color: white
            }
          }
        ]
      },
      point: {
        type: "point-3d",
        symbolLayers: [
          {
            type: "icon",
            size: "20px",
            resource: { primitive: "kite" },
            outline: {
              color: blue,
              size: "3px"
            },
            material: {
              color: white
            }
          }
        ]
      },

    };
    // this.btnStart = this.btnSerachBuild.bind(this);
    this.btnStart = this.btnStart.bind(this);
    this.btnAddBuild = this.btnAddBuild.bind(this);
    this.btnAddRoad = this.btnAddRoad.bind(this);
    this.btnAddPoint = this.btnAddPoint.bind(this);
    this.btnShowModel = this.btnShowModel.bind(this);
  }

  btnShowModel() {
    this.props.dispatch({
      type: 'agsOperate/changeStateAdd3D',
      payload: {
        flagAdd3D: !this.props.agsOperate.flagAdd3D,
      },
    });
  }

  btnStart() {
    const _lSelf = this;
    const _lview = _lSelf.state.view = env.getParamAgs().view;
    const scene = this.state.view.map;

    //将glayer添加到图层里面
    _lview.map.addMany([_lSelf.state.gLayer]);  // 向图层中添加图层

    // define the SketchViewModel and pass in the symbols for each geometry type
    // 定义素描model并传入几何类型的符号
    const sketchVM = new SketchViewModel({
      layer: _lSelf.state.gLayer,
      view: _lview,
      pointSymbol: _lSelf.state.point,
      polygonSymbol: _lSelf.state.extrudedPolygon,
      polylineSymbol: _lSelf.state.route
    });
    this.state.sketchVM = sketchVM;

    // add an event listener for the Delete key to delete
    // the graphics that are currently being updated
    // 为delete 键盘添加一监听器
    _lview.on("key-up", function (evt) {
      if (evt.key === "Delete") {
        _lSelf.state.gLayer.removeMany(sketchVM.updateGraphics);
        sketchVM.reset();
      }
    });

    // after drawing the geometry, enter the update mode to update the geometry
    // 绘制完成后进入更新模式
    // and the deactivate the buttons
    sketchVM.on("create", function (event) {
      if (event.state === "complete") {
        sketchVM.update(event.graphic);
      }
    });
  }

  btnAddBuild() {
    this.btnStart();
    this.state.sketchVM.create("polygon");
  }
  btnAddRoad() {
    this.state.sketchVM.create("polyline");
  }
  btnAddPoint() {
    this.state.sketchVM.create("point");
  }

  render() {
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.flagAdd3D
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.divTitle} >
          <span className={styles.divTitleFont} >模型添加</span>
          <span className={styles.spanModalShow} onClick={this.btnShowModel} >X</span>
        </div>
        <div>
          {/* <div>
            启动按钮的功能融合到添加建筑里面
            <Button className={styles.btnStart} onClick={this.btnStart} >启动</Button>
          </div> */}
          <div>
            <Button className={styles.btnTool} onClick={this.btnAddBuild} >添加建筑</Button>
            <Button className={styles.btnTool} onClick={this.btnAddRoad} >添加道路</Button>
            <Button className={styles.btnTool} onClick={this.btnAddPoint} >添加点</Button>
          </div>
        </div>
      </div >
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(Add3D);
