import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu } from 'antd';
import Header from '../components/Header/Header';
import TagFilter from '../components/ContentLayout/TagFilter';
import MapContent from '../components/ContentLayout/MapContent';
// import { Avatar, Layout, Row, Col, Menu } from 'antd';
import env from '../utils/env';
import styles from './IndexPage.css';


// const { Header } = Layout;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

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
        // 底图
        basemap: env.getDefaultBasemap3D(),
        // 判断创建二维场景还是三维场景
        viewMode: this.props.agsmap.mode,
      },
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
