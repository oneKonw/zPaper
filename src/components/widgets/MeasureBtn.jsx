import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';

import {
  SCENE_MEASURE,
  SCENE_MEASURE_LINE,
  SCENE_MEASURE_AREA,
} from '../../constants/action-types';

const ButtinGroup = Button.Group;

class MeasureBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagsSceneMeasure: true,
    };

    this.btnMeasureLine = this.btnMeasureLine.bind(this);
    this.btnMeasureArea = this.btnMeasureArea.bind(this);
  }

  // 测量线
  btnMeasureLine() {
    this.props.dispatch({
      type: 'agsOperate/sceneMeasure',
      payload: SCENE_MEASURE_LINE,
    });
  }
  // 测量面
  btnMeasureArea() {
    this.props.dispatch({
      type: 'agsOperate/sceneMeasure',
      payload: SCENE_MEASURE_AREA,
    });
  }

  render() {
    return (
      <ButtinGroup
        style={{
          position: 'absolute',
          top: '80px',
          right: '60px',
          display: this.props.agsOperate.flagsSceneMeasure
            ? 'block'
            : 'none',
        }}
      >
        <Button
          onClick={this.btnMeasureLine}
        >距离</Button>
        <Button
          onClick={this.btnMeasureArea}
        >面积</Button>
      </ButtinGroup>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
},
)(MeasureBtn);
