import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input, Select } from 'antd';
// esri组件
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import SketchViewModel from 'esri/widgets/Sketch/SketchViewModel';
import FeatureFilter from 'esri/views/layers/support/FeatureFilter';
import geometryEngine from 'esri/geometry/geometryEngine';
import Graphic from 'esri/Graphic';

import styles from './BufferAnalysis.less';
import env from '../../utils/env';

const Option = Select.Option;
const ButtonGroup = Button.Group;

class BufferAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: undefined,
      sketchViewModel: undefined,
      clearFilter: undefined,
      sceneLayerView: undefined,
      featureLayerView: undefined,
      updateFilter: undefined,
      Relationship: "contains",
      buffer: 250,
    };
    // this.btnSerachBuild = this.btnSerachBuild.bind(this);
    this.btnPoint = this.btnPoint.bind(this);
    this.btnStart = this.btnStart.bind(this);
    this.sliderChange = this.sliderChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.btnClear = this.btnClear.bind(this);
    this.btnShowModel = this.btnShowModel.bind(this);
  }

  btnShowModel() {
    this.props.dispatch({
      type: 'agsOperate/changeStateBuffer',
      payload: {
        flagBuffer: !this.props.agsOperate.flagBuffer,
      },
    });
  }

  btnStart() {
    this.state.view = env.getParamAgs().view;
    const scene = this.state.view.map;

    this.state.view.when(() => {
      // add a GraphicsLayer for the sketches and the buffer
      // 为草图和缓冲区添加GraphicsLayer
      const _lSelf = this;
      let sketchLayer = new GraphicsLayer(); /// 点线面绘制图层
      let bufferLayer = new GraphicsLayer(); /// 缓冲图层
      this.state.view.map.addMany([bufferLayer, sketchLayer]);  /// 向图层中添加图层

      let lsceneLayerView = null; // 缓冲应对图层

      /// create the layerView's to add the filter
      // 创建layerview过滤器
      this.state.sceneLayerView = null;
      this.state.featureLayerView = null;
      const sceneLayer = scene.allLayers.items[2];
      this.state.view.whenLayerView(sceneLayer).then((sceneLayerView) => {
        lsceneLayerView = sceneLayerView; // 其他建筑图层
      });

      // 使用sketchviewmodel绘制用作过滤器的多边形
      let sketchGeometry = null;
      /// 点线面草图绘制器
      this.state.sketchViewModel = new SketchViewModel({
        layer: sketchLayer,  /// 绘制图层
        view: this.state.view,
        pointSymbol: {
          type: "simple-marker",
          style: "circle",
          size: 10,
          color: [255, 255, 255, 0.8],
          outline: {
            color: [211, 132, 80, 0.7],
            size: 10
          }
        },
        polylineSymbol: {
          type: "simple-line",
          color: [211, 132, 80, 0.7],
          width: 6
        },
        polygonSymbol: {
          type: "polygon-3d",
          symbolLayers: [
            {
              type: "fill",
              material: {
                color: [255, 255, 255, 0.8]
              },
              outline: {
                color: [211, 132, 80, 0.7],
                size: "10px"
              }
            }
          ]
        }
      });

      this.state.sketchViewModel.on(["create"], function (event) {
        // update the filter every time the user finishes drawing the filtergeometry
        // 每次用户绘制完成几何时候更新滤镜
        if (event.state == "complete") {
          sketchGeometry = event.graphic.geometry;
          // console.log(_lSelf.state.buffer);
          updateFilter();
        }
      });

      this.state.sketchViewModel.on(["update"], function (event) {
        const eventInfo = event.toolEventInfo;
        // update the filter every time the user moves the filtergeometry
        // 每次移动更改滤器几何体的定点时更新过滤器
        if (eventInfo && eventInfo.type.includes("move")) {
          if (eventInfo.type === "move-stop") {
            sketchGeometry = event.graphics[0].geometry;
            updateFilter();
          }
        }
        // update the filter every time the user changes the vertices of the filtergeometry
        // 每次用户更改滤器集合体时更新
        if (eventInfo && eventInfo.type.includes("reshape")) {
          if (eventInfo.type === "reshape-stop") {
            sketchGeometry = event.graphics[0].geometry;
            updateFilter();
          }
        }
      });

      /// 核心方法
      // set the geometry filter on the visible FeatureLayerView
      // 在可见的featurelayerview上设置几何过滤器
      function updateFilter() {
        updateFilterGeometry();
        // featureFilter = {
        //   // autocasts to FeatureFilter
        //   // 自动转发到featurefilter
        //   geometry: filterGeometry,
        //   spatialRelationship: selectedFilter
        // };
        const featureFilter = new FeatureFilter({
          geometry: filterGeometry,
          spatialRelationship: _lSelf.state.Relationship, // 先写死
        });

        // if (featureLayerView) {
        //   if (featureLayerViewFilterSelected) {
        //     featureLayerView.filter = featureFilter;
        //   } else {
        //     featureLayerView.filter = null;
        //   }
        // }
        lsceneLayerView.filter = featureFilter; // 图层layerview添加筛选器

      }

      _lSelf.state.updateFilter = updateFilter;

      // update the filter geometry depending on buffer
      // 根据缓冲区更新过滤器几何
      let filterGeometry = null;
      function updateFilterGeometry() {
        // add a polygon graphic for the buffer
        // 为缓冲区添加多边形
        if (sketchGeometry) {
          if (_lSelf.state.buffer > 0) {
            let newBufferGeometry = geometryEngine.geodesicBuffer(
              sketchGeometry,
              _lSelf.state.buffer,
              "meters"
            );
            filterGeometry = newBufferGeometry;
            if (bufferLayer.graphics.length === 0) {
              bufferLayer.add(
                new Graphic({
                  geometry: filterGeometry,
                  symbol: {
                    type: "polygon-3d",
                    symbolLayers: [
                      {
                        type: "fill",
                        material: {
                          color: [255, 255, 255, 0.8]
                        },
                        outline: {
                          color: [255, 153, 0, 0.7],
                          size: "10px"
                        }
                      }
                    ]
                  }
                })
              );
            }
            bufferLayer.graphics.getItemAt(0).geometry = filterGeometry;
          } else {
            bufferLayer.removeAll();
            filterGeometry = sketchGeometry;
          }
        }
      }

      this.state.clearFilter = function () {
        sketchGeometry = null;
        filterGeometry = null;
        sketchLayer.removeAll();
        bufferLayer.removeAll();
        lsceneLayerView.filter = null;
        // featureLayerView.filter = null;
      };
    });
  }

  btnPoint(event) {
    const geometryType = event.target.value;
    this.state.clearFilter();
    this.state.sketchViewModel.create(geometryType);
  }

  sliderChange(value) {
    this.setState({
      buffer: value,
    });
    this.state.updateFilter();
  }

  selectChange(value) {
    this.setState({
      Relationship: value,
    });
    setTimeout(() => {
      this.state.updateFilter();
    }, 500);
  }

  btnClear() {
    this.state.clearFilter();
  }

  render() {
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.flagBuffer
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.divTitle} >
          <span className={styles.divTitleFont} >缓冲分析</span>
          <span className={styles.spanModalShow} onClick={this.btnShowModel} >X</span>
        </div>
        <div>
          <div>
            <ButtonGroup className={styles.btnGpStart}>
              <Button type="primary" className={styles.btnStart} onClick={this.btnStart}>开始</Button>
              <Button type="primary" className={styles.btnStart} onClick={this.btnClear} >清除</Button>
            </ButtonGroup>
          </div>
          <div>
            <div className={styles.divToolTitle}>绘制几何</div>
            <ButtonGroup className={styles.btnDrawGp}>
              <Button className={styles.btnDraw} value="point" onClick={this.btnPoint}>点</Button>
              <Button className={styles.btnDraw} value="polyline" onClick={this.btnPoint}>线</Button>
              <Button className={styles.btnDraw} value="polygon" onClick={this.btnPoint}>面</Button>
            </ButtonGroup>
          </div>
          <div className={styles.divToolTitle}>空间关系</div>
          <div>
            <Select className={styles.selectRe} defaultValue="contains" onChange={this.selectChange}>
              <Option value="contains">包含</Option>
              <Option value="intersects">相交</Option>
              <Option value="disjoint">不包含</Option>
            </Select>
          </div>
          <div className={styles.divToolTitle}>缓冲区半径</div>
          <div>
            <Slider
              className={styles.sliderRa}
              min={0}
              max={1000}
              defaultValue={250}
              onChange={this.sliderChange}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(BufferAnalysis);
