import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Button } from 'antd';
import Header from '../components/Header/Header';
import TagFilter from '../components/ContentLayout/TagFilter';
import MapContent from '../components/ContentLayout/MapContent';
import ModelToolbar from '../../src/components/ModelToolbar';
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
    // this.state = {
    //   btnSwitchMapFlags: true,
    // };
    this.viewDiv = null;
    this.btnSwitch2D = this.btnSwitch2D.bind(this);
    this.btnSwitch3D = this.btnSwitch3D.bind(this);
    this.btnSwitchModelWhite = this.btnSwitchModelWhite.bind(this);
    this.btnSwitchModelReal = this.btnSwitchModelReal.bind(this);
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
            <ModelToolbar />
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
