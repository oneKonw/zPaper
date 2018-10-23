import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import MapThumbnail from './MapList/MapThumbnail';
import styles from './MapContent.css';

class MapContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className={styles.all}>
        {/* 地图缩略图 */}
        <Row className={styles.MapThumbnail}>
          <MapThumbnail />
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
