import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input } from 'antd';

import styles from './GetPoint.css';
import env from '../../utils/env';


class GetPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMapPoint = this.getMapPoint.bind(this);
  }
  getMapPoint() {
    const view = env.getParamAgs().view;
    view.on('pointer-move', (event) => {
      // 将屏幕点坐标转化为map点坐标
      const point = view.toMap({ x: event.x, y: event.y });
      this.setState({
        // latitude: Math.round(point.latitude * 100) / 100,
        // longitude: Math.round(point.longitude * 100) / 100,
        latitude: point.latitude,
        longitude: point.longitude,
      });
    });
  }

  render() {
    return (
      <div
        className={styles.modlediv}
      // style={{
      //   display: this.props.agsOperate.flagBuildSearch
      //     ? 'block'
      //     : 'none',
      // }}
      >
        <div className={styles.divTitle} >
          <span className={styles.divTitleFont} >坐标拾取</span>
          <span className={styles.spanModalShow} onClick={this.btnShowModel} >X</span>
        </div>
        <div>
          <div>
            <Button onClick={this.getMapPoint} >拾取</Button>
          </div>
          <div>
            <div className={styles.phang}>
              经度：<span id="showspan2">{this.state.longitude}</span>
            </div>
            <div className={styles.phang}>
              纬度：<span id="showspan1">{this.state.latitude}</span>
            </div>
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
})(GetPoint);
