import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Icon } from 'antd';
import styles from './Header.css';


class Sysheader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // lid 2018-07-18 添加头部点击事件
    this.btnAddSgs = this.btnAddSgs.bind(this);
  }

  // 显示磁贴面版
  btnAddSgs() {
    if (this.props.agsOperate.flagsContent === false) {
      this.props.dispatch({
        type: 'agsOperate/changeStateContent',
        payload: {
          flagsContent: !this.props.agsOperate.flagsContent,
          flagToolbar: !this.props.agsOperate.flagToolbar,
        },
      });
    }
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <p className={styles.pTxt}>城市设计评价系统——黄浦江东岸开发空间贯通设计</p>
        </div>
        <Menu
          mode="horizontal"
          className="menu"
          theme="dark"
        >
          <Menu.Item key="1">评价体系</Menu.Item>
          <Menu.Item key="2" onClick={this.btnAddSgs}>首页</Menu.Item>
          <Menu.Item key="3">用户名</Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(Sysheader);
