import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Icon } from 'antd';
import styles from './Header.css';

const { Header } = Layout;

class Sysheader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // lid 2018-07-18 添加头部点击事件
  }

  render() {
    return (
      <Header className={styles.header}>
        <div>
          <Row type="flex">
            <Col span={8} className={styles.projectname}>
              <Icon type="heart" theme="twoTone" />{/* <img src={Logo} className={styles.logo} alt="" /> */}
              <span className={styles.title}>城市设计评价系统——黄浦江东岸开发空间贯通设计</span>
            </Col>
            <Col span={16} className={styles.userlogo}>
              <Menu
                // lid 2018-07-18 添加点击切换事件
                mode="horizontal"
                className="menu"
                theme="dark"
              >
                <Menu.Item key="outcome">评价体系</Menu.Item>
                <Menu.Item key="assistant">首页</Menu.Item>
                <Menu.Item key="parametric">用户名</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </div>
      </Header>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(Sysheader);
