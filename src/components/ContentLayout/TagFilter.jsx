import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './TagFilter.css';

const ButtinGroup = Button.Group;

class TagFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ButtinGroup
        className={styles.btnToolBar}
      >
        <Button>量测</Button>
        <Button>环视</Button>
        <Button>阴影</Button>
        <Button>导出</Button>
        <Button>添加建议</Button>
      </ButtinGroup>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
},
)(TagFilter);

