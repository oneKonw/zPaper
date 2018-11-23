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
      <Row
        className={styles.contentList}
        style={{
          display: this.props.agsOperate.flagsContent
            ? 'block'
            : 'none',
        }}
      >
        <Col span={19} >
          <MapThumbnail />
        </Col>
        <Col span={5} >
          <MapProjectList />
        </Col>
      </Row>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(MapContent);
