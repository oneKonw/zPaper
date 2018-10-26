import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './ToolBar.css';

const ButtinGroup = Button.Group;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagsContent: true,
    };

    this.btnAddSgs = this.btnAddSgs.bind(this);
  }

  btnAddSgs() {
    this.props.dispatch({
      type: 'agsOperate/changeStateContent',
      payload: this.state.flagsContent,
    });
    this.setState({
      flagsContent: !this.state.flagsContent,
    });
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
        <Button
          onClick={this.btnAddSgs}
        >添加建议</Button>
      </ButtinGroup>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
},
)(ToolBar);

