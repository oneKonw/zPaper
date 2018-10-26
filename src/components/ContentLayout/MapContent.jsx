import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import MapThumbnail from './MapList/MapThumbnail';
import MapProjectList from './MapList/MapProjectList';
import styles from './MapContent.css';

class MapContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Row className={styles.contentList}>
          <Col span={18} >
            <MapThumbnail />
          </Col>
          <Col span={6} >
            <MapProjectList />
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
})(MapContent);
