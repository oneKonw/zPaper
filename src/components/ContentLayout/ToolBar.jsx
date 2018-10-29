import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './ToolBar.css';

import {
  SCENE_MEASURE,
  LOOK_AROUND,
} from '../../constants/action-types';

const ButtinGroup = Button.Group;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagsContent: true,
      flagsSceneMeasure: true,
      flagsLookAround: true,
    };

    this.btnAddSgs = this.btnAddSgs.bind(this);
    this.btnMeasure = this.btnMeasure.bind(this);
    this.btnLookAround = this.btnLookAround.bind(this);
  }

  // 显示磁贴面版
  btnAddSgs() {
    this.props.dispatch({
      type: 'agsOperate/changeStateContent',
      payload: this.state.flagsContent,
    });
    this.setState({
      flagsContent: !this.state.flagsContent,
    });
  }
  // 显示地图面版
  btnMeasure() {
    this.props.dispatch({
      type: 'agsOperate/btnMeasure',
      payload: this.state.flagsSceneMeasure,
    });
    this.setState({
      flagsSceneMeasure: !this.state.flagsSceneMeasure,
    });
  }
  // 环视
  btnLookAround() {
    this.props.dispatch({
      type: 'agsOperate/btnLookAround',
      payload: this.state.flagsLookAround,
    });
    this.setState({
      flagsLookAround: !this.state.flagsLookAround,
    });
  }

  render() {
    return (
      <ButtinGroup
        className={styles.btnToolBar}
      >
        <Button
          onClick={this.btnMeasure}
        >
          量测</Button>
        <Button
          onClick={this.btnLookAround}
        >环视</Button>
        <Button>阴影</Button>
        <Button>导出</Button>
        <Button
          onClick={this.btnAddSgs}
        >添加建议</Button>
      </ButtinGroup>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
},
)(ToolBar);

