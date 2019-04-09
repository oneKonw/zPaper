import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input } from 'antd';

import styles from './BuildSearch.less';
import env from '../../utils/env';

class BuildSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: undefined,
    };
    this.btnSerachBuild = this.btnSerachBuild.bind(this);
    this.btnShowModel = this.btnShowModel.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  btnSerachBuild() {
    if (this.props.agsOperate.hightLight) {
      this.props.agsOperate.hightLight.remove();
    }
    this.props.dispatch({
      type: 'agsOperate/btnSearchBuild',
      payload: {
        InputText: this.state.inputValue,
      },
    });
  }
  btnShowModel() {
    if (this.props.agsOperate.hightLight) {
      this.props.agsOperate.hightLight.remove();
    }
    this.props.dispatch({
      type: 'agsOperate/changeStateBuildSearch',
      payload: {
        flagBuildSearch: !this.props.agsOperate.flagBuildSearch,
      },
    });
  }

  inputChange(event) {
    this.setState({
      inputValue: event.currentTarget.value,
    });
  }

  render() {
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.flagBuildSearch
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.divTitle} >
          <span className={styles.divTitleFont} >建筑查询</span>
          <span className={styles.spanModalShow} onClick={this.btnShowModel} >X</span>
        </div>
        <div>
          <Input onChange={this.inputChange} className={styles.inputSerach} placeholder="输入查询关键字" />
          <Button onClick={this.btnSerachBuild} >查询</Button>
        </div>
      </div >
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(BuildSearch);
