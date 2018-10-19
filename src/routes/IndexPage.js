import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Button } from 'antd';
import Header from '../components/Header/Header';
import TagFilter from '../components/ContentLayout/TagFilter';
import MapContent from '../components/ContentLayout/MapContent';
// import { Avatar, Layout, Row, Col, Menu } from 'antd';
import env from '../utils/env';
import styles from './IndexPage.css';
import {
  VIEW_MODE_3D, VIEW_MODE_2D,
} from '../constants/action-types';

// const { Header } = Layout;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.viewDiv = null;
    this.btnSwitch2D = this.btnSwitch2D.bind(this);
    this.btnSwitch3D = this.btnSwitch3D.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // 启动初始化地图
    dispatch({
      type: 'agsmap/init',
      payload: {
        // 容器
        container: this.viewDiv,
        // 底图
        basemap: env.getDefaultBasemap3D(),
        // 判断创建二维场景还是三维场景
        viewMode: this.props.agsmap.mode,
      },
    });
  }

  btnSwitch2D() {
    this.props.dispatch({
      type: 'agsmap/transMode2d',
      payload: VIEW_MODE_2D,
    });
  }

  btnSwitch3D() {
    this.props.dispatch({
      type: 'agsmap/transMode3d',
      payload: VIEW_MODE_3D,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <TagFilter />
        <Row>
          <Col span={14}>
            <MapContent />
          </Col>
          <Col
            span={10}
            className={styles.mapDiv}
          >
            <div
              ref={(node) => {
                this.viewDiv = node;
              }}
              className={styles.viewDiv}
            />
            <Button
              onClick={this.btnSwitch2D}
              className={styles.switch2DBtn}
            >2D</Button>
            <Button
              onClick={this.btnSwitch3D}
              className={styles.switch3DBtn}
            >3D</Button>
          </Col>
        </Row>

      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(IndexPage);
