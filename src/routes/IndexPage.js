import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu } from 'antd';
import env from '../utils/env';
import styles from './IndexPage.css';
import Logo from '../assets/logo.png';
import Schemecomparison from '../components/widgets/Schemecomparison';
import Projectpicture from '../components/Projectpicture/Projectpicture';
import PropictureList from '../components/Projectpicture/PropictureList';
import Programmereview from '../components/widgets/Programmereview';
import Controlanalysis from '../components/widgets/Controlanalysis';
import Toolbar from '../components/widgets/Toolbar';
import Bookmark from '../components/bookmark/Bookmark';
// import ControlHeight from '../components/controlHeight/ControlHeight';

const { Header } = Layout;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.viewDiv = null;
    this.toggleSider = this.toggleSider.bind(this);
    this.selectMenu = this.selectMenu.bind(this);
    this.unselectMenu = this.unselectMenu.bind(this);
    this.witchItemMenu = this.witchItemMenu.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'agsmap/init',
      payload: {
        container: this.viewDiv,
        basemap: env.getDefaultBasemap3D(),
        viewMode: this.props.agsmap.mode,
      },
    });
  }

  toggleSider() {
    this.props.dispatch({
      type: 'agsmap/toggleSider',
      payload: !this.props.agsmap.siderOpen,
    });
  }

  selectMenu(menu) {
    // popupUtil.handleMouseIn();
    this.props.dispatch({
      type: 'agsmap/select',
      payload: menu,
    });
  }

  unselectMenu() {
    // popupUtil.handleMouseOut(() => {
    this.props.dispatch({
      type: 'agsmap/select',
      payload: null,
    });
    // });
  }

  witchItemMenu(witchItem) {
    if (this.props.agsmap.chooseItemMenu === null) {
      this.props.dispatch({
        type: 'agsmap/chooseItems',
        payload: witchItem,
      });
    } else {
      this.props.dispatch({
        type: 'agsmap/chooseItems',
        payload: null,
      });
    }
    console.log(!!witchItem);
    console.log(this.props.agsmap.chooseItemMenu);
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header className={styles.header}>
          <div>
            <Row type="flex">
              <Col span={12} className={styles.projectname}>
                <img src={Logo} className={styles.logo} alt="" />
                <span className={styles.title}>
                  金坛区基于CIM智慧规划--三维决策支持系统
                </span>
              </Col>
              <Col span={12} className={styles.userlogo}>
                <Menu
                  mode="horizontal"
                  className="menu"
                  defaultSelectedKeys="app3"
                >
                  <Menu.Item key="mail">规划成果分析</Menu.Item>
                  <Menu.Item key="app1">辅助分析</Menu.Item>
                  <Menu.Item key="app2">参数化设计</Menu.Item>
                  <Menu.Item key="app3">规划方案评审</Menu.Item>
                  <Menu.Item key="app4">数据更新</Menu.Item>
                </Menu>
                <Avatar
                  style={{ backgroundColor: '#15e3e1' }}
                  size="large"
                  icon="user"
                />
              </Col>
            </Row>
          </div>
        </Header>
        <div
          ref={(node) => {
            this.viewDiv = node;
          }}
          className={styles.viewDiv}
        />
        <Schemecomparison />
        <Controlanalysis />
        <Programmereview />
        <Projectpicture />
        <PropictureList />
        <Toolbar />
        <Bookmark />
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(IndexPage);
