import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Button } from 'antd';
import Header from '../components/Header/Header';
import ToolBar from '../components/ContentLayout/ToolBar';
import MapContent from '../components/ContentLayout/MapContent';
import ModelToolbar from '../../src/components/widgets/ModelToolbar';
// import { Avatar, Layout, Row, Col, Menu } from 'antd';
import env from '../utils/env';
import styles from './IndexPage.css';
import {
  VIEW_MODE_3D, VIEW_MODE_2D,
  SWITCH_MODEL, SWITCH_MODEL_REAL, SWITCH_MODEL_WHITE, SWITCH_MODEL_CAO,
} from '../constants/action-types';

const ButtinGroup = Button.Group;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSpan: 10,
      contentSpan: 14,
    };
    this.viewDiv = null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 启动初始化地图
    dispatch({
      type: 'agsmap/init',
      payload: {
        // 容器
        container: this.viewDiv,
        // 判断创建二维场景还是三维场景
        viewMode: this.props.agsmap.mode,
      },
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <div
          ref={(node) => {
            this.viewDiv = node;
          }}
          className={styles.viewDiv}
        />
        <ToolBar />
        <MapContent />
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(IndexPage);
