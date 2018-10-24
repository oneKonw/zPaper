import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import {
  VIEW_MODE_3D, VIEW_MODE_2D,
  SWITCH_MODEL, SWITCH_MODEL_REAL, SWITCH_MODEL_WHITE, SWITCH_MODEL_SKETCH,
} from '../constants/action-types';

const ButtinGroup = Button.Group;

class ModelToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.btnSwitchModelWhite = this.btnSwitchModelWhite.bind(this);
    this.btnSwitchModelReal = this.btnSwitchModelReal.bind(this);
    this.btnSwitchModelSketch = this.btnSwitchModelSketch.bind(this);
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

  render() {
    return (
      <div>
        <ButtinGroup
          style={{
            display: this.props.agsmap.btnSwitchMapFlags
              ? 'block'
              : 'none',
            position: 'absolute',
            bottom: '47px',
            right: '10px',
          }}
        >
          <Button onClick={this.btnSwitchModelReal}>实景</Button>
          <Button onClick={this.btnSwitchModelWhite} >白模</Button>
          <Button onClick={this.btnSwitchModelSketch} >草图</Button>
        </ButtinGroup>
        {/* <Button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >全屏</Button> */}
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(ModelToolbar);
