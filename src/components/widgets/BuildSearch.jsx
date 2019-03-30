import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input } from 'antd';

import styles from './BuildSearch.css';
import env from '../../utils/env';

class BuildSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.btnSerachBuild = this.btnSerachBuild.bind(this);
  }

  btnSerachBuild() {
    this.props.dispatch({
      type: 'agsOperate/btnSearchBuild',
      payload: {
        midText: 'hello',
      },
    });
  }

  render() {
    return (
      <div
        className={styles.modlediv}
      >
        <span>建筑查询</span>
        <Input placeholder="输入查询关键字" />
        <Button onClick={this.btnSerachBuild} >查询</Button>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(BuildSearch);
