import React from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Icon } from 'antd';
// import DirectLineMeasurement3DViewModel from 'esri/widgets/DirectLineMeasurement3D';

import {
  ACTION_MEASURE_LINE_3D,
  ACTION_MEASURE_AREA_3D,
  VIEW_MODE_3D,
  VIEW_MODE_2D,
  ACTION_MEASURE_2D_LINE,
  ACTION_MEASURE_2D_AREA,
  ACTION_MAP_2D_CORRECT,
} from '../../constants/action-types';

import styles from './Toolbar.css';
import Callout from '../callout/Callout';
// import Measureline from '../../../components/widgets/Measureline';

const ButtonGroup = Button.Group;

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.measureLine = this.measureLine.bind(this);
    this.visblechangebook = this.visblechangebook.bind(this);
  }
  componentDidMount() {}
  measureLine({ key }) {
    switch (key) {
      case 'measure3DLine':
        this.props.dispatch({
          type: ACTION_MEASURE_LINE_3D,
        });
        break;
      case 'measure3DArea':
        this.props.dispatch({
          type: ACTION_MEASURE_AREA_3D,
        });
        break;
      case 'measure2DLine':
        this.props.dispatch({
          type: ACTION_MEASURE_2D_LINE,
        });
        break;
      case 'measure2DArea':
        this.props.dispatch({
          type: ACTION_MEASURE_2D_AREA,
        });
        break;
      case 'mapCorrection':
        this.props.dispatch({
          type: ACTION_MAP_2D_CORRECT,
        });
        break;
      default:
        break;
    }
  }

  visblechangebook(e) {
    e.stopPropagation();
    if (this.props.agsmap.bookflags) {
      // prepare();
      this.props.dispatch({
        type: 'agsmap/bookmarkChangeState',
        payload: false,
      });
    } else {
      this.props.dispatch({
        type: 'agsmap/bookmarkChangeState',
        payload: true,
      });
    }
  }

  renderMenuItems() {
    const items = [];
    if (this.props.agsmap.mode === VIEW_MODE_3D) {
      items.push(
        <Menu.Item key="measure3DLine" style={{ textAlign: 'center' }}>
          <Icon type="mail" />
          <span>&nbsp;测距</span>
        </Menu.Item>,
      );

      items.push(
        <Menu.Item key="measure3DArea" style={{ textAlign: 'center' }}>
          <Icon type="ant-design" />
          <span>&nbsp;测面</span>
        </Menu.Item>,
      );
    } else if (this.props.agsmap.mode === VIEW_MODE_2D) {
      items.push(
        <Menu.Item key="measure2DLine" style={{ textAlign: 'center' }}>
          <Icon type="edit" />
          <span>&nbsp;测距</span>
        </Menu.Item>,
      );

      items.push(
        <Menu.Item key="measure2DArea" style={{ textAlign: 'center' }}>
          <Icon type="picture" />
          <span>&nbsp;测面</span>
        </Menu.Item>,
      );

      items.push(
        <Menu.Item key="mapCorrection" style={{ textAlign: 'center' }}>
          <Icon type="ant-design" />
          <span>&nbsp;地图纠错</span>
        </Menu.Item>,
      );
    }
    return items;
  }

  render() {
    const menu = (
      <Menu className={styles.noradius} onClick={this.measureLine}>
        {this.renderMenuItems()}
      </Menu>
    );
    const drawmenu = <Callout />;
    return (
      <div className={styles.toolbar}>
        <ButtonGroup className={styles.buttonGroup}>
          <Button onClick={this.visblechangebook} className={styles.btnStyle}>
            <Icon type="book" />书签
          </Button>
          <Dropdown overlay={drawmenu} trigger={['click']}>
            <Button className={styles.btnStyle}>
              <Icon type="environment-o" />标 注<Icon type="down" />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className={styles.btnStyle}>
              <Icon type="medicine-box" />工具箱<Icon type="down" />
            </Button>
          </Dropdown>

          <Button
            className={styles.btnStyle}
            onClick={() => {
              window.open('multiDate.html');
            }}
          >
            <Icon type="clock-circle-o" />多时相
          </Button>
          <Button
            className={styles.btnStyle}
            onClick={() => {
              window.open('splitScreen.html');
            }}
          >
            <Icon type="switcher" />分屏对比
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(Toolbar);
