import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Icon, Modal } from 'antd';
import styles from './Header.css';

import LoginModal from './LoginModal/LoginModal';

class Sysheader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // lid 2018-07-18 添加头部点击事件
    this.btnAddSgs = this.btnAddSgs.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.loginModalProps = this.loginModalProps.bind(this);
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

  // 登录界面
  loginClick() {
    this.props.dispatch({
      type: 'linkService/login'
    });
    // browserHistory.push('/');
  }

  loginModalProps() {
    let obj;
    const props = this.props;
    return obj = {
      visible: this.props.linkService.modalVisible,
      onConfirm(userData) {
        new Promise(function (resolve, reject) {
          props.dispatch({
            type: 'linkService/doLogin',
            payload: {
              userData, // 数据
              resolve, // 成功执行函数
              reject // 失败执行行数
            }
          });
        }).then(null, (data) => {
          // 第一个参数为成功，第二个参数为错误，这种写法成功做反应，只对错误进行反应
          Modal.error({
            title: '错误提示',
            content: <p style={{ fontSize: 14 }}>用户名 或 密码 错误！</p>
          });
        });
      },
      onCancel() {
        props.dispatch({
          type: 'linkService/hideModal'
        });
      }
    };

  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <p className={styles.pTxt}>三维城市辅助决策系统</p>
        </div>
        <Menu
          mode="horizontal"
          className="menu"
          theme="dark"
        >
          {/* <Menu.Item key="1">评价体系</Menu.Item> */}
          <Menu.Item key="2" onClick={this.btnAddSgs}>首页</Menu.Item>
          <Menu.Item key="3" onClick={this.loginClick}>用户名</Menu.Item>
        </Menu>
        <LoginModal {...this.loginModalProps()} />
      </div>
    );
  }
}

export default connect(({ linkService, agsOperate }) => {
  return {
    linkService, agsOperate
  };
})(Sysheader);
