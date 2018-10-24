import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './ModelToolbar.css';

import {
  VIEW_MODE_3D, VIEW_MODE_2D,
  SWITCH_MODEL, SWITCH_MODEL_REAL, SWITCH_MODEL_WHITE, SWITCH_MODEL_SKETCH,
  FULL_SCREEN,
} from '../../constants/action-types';

const ButtinGroup = Button.Group;

class ModelToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreen: true,
    };

    this.btnSwitch2D = this.btnSwitch2D.bind(this);
    this.btnSwitch3D = this.btnSwitch3D.bind(this);
    this.btnSwitchModelWhite = this.btnSwitchModelWhite.bind(this);
    this.btnSwitchModelReal = this.btnSwitchModelReal.bind(this);
    this.btnSwitchModelSketch = this.btnSwitchModelSketch.bind(this);
    this.btnFullScreen = this.btnFullScreen.bind(this);
  }

  btnSwitch2D() {
    if (this.props.agsmap.mode !== VIEW_MODE_2D) {
      this.props.dispatch({
        type: 'agsmap/transMode2d',
        payload: {
          viewMode: VIEW_MODE_2D,
          btnSwitchMapFlags: false,
        },
      });
    }
  }

  btnSwitch3D() {
    if (this.props.agsmap.mode !== VIEW_MODE_3D) {
      this.props.dispatch({
        type: 'agsmap/transMode3d',
        payload: {
          viewMode: VIEW_MODE_3D,
          btnSwitchMapFlags: true,
          // 识别模型状态
          modelType: this.props.agsmap.modelType,
        },
      });
    }
  }

  btnSwitchModelWhite() {
    this.props.dispatch({
      type: 'agsmap/transModel',
      payload: SWITCH_MODEL_WHITE,
    });
  }

  btnSwitchModelReal() {
    this.props.dispatch({
      type: 'agsmap/transModel',
      payload: SWITCH_MODEL_REAL,
    });
  }

  btnSwitchModelSketch() {
    this.props.dispatch({
      type: 'agsmap/transModel',
      payload: SWITCH_MODEL_SKETCH,
    });
  }

  btnFullScreen() {
    this.props.dispatch({
      type: 'agsmap/fullScreenChangeState',
      payload: this.state.fullScreen,
    });
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  }

  render() {
    return (
      <div>
        <ButtinGroup
          className={styles.btnSwitchModel}
          style={{
            display: this.props.agsmap.btnSwitchMapFlags
              ? 'block'
              : 'none',
          }}
        >
          <Button onClick={this.btnSwitchModelReal}>实景</Button>
          <Button onClick={this.btnSwitchModelWhite} >白模</Button>
          <Button onClick={this.btnSwitchModelSketch} >草图</Button>
        </ButtinGroup>
        <ButtinGroup
          className={styles.btnSwitchMap}
        >
          <Button
            onClick={this.btnSwitch2D}
          >二维</Button>
          <Button
            onClick={this.btnSwitch3D}
          >三维</Button>
          <Button>街景</Button>
        </ButtinGroup>
        <Button
          className={styles.btnFullScreen}
          onClick={this.btnFullScreen}
        >全屏</Button>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(ModelToolbar);
