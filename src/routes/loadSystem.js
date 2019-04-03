import React from 'react';
import { connect } from 'dva';
import { Avatar, Layout, Row, Col, Menu, Button } from 'antd';

// import { Avatar, Layout, Row, Col, Menu } from 'antd';
import env from '../utils/env';
import styles from './loadSystem.css';
// 导入图片
import bgImg from '../assets/plane.png';

import FromLoadSys from '../components/widgets/FromLoadSys';

import {
  VIEW_MODE_3D, VIEW_MODE_2D,
  SWITCH_MODEL, SWITCH_MODEL_REAL, SWITCH_MODEL_WHITE, SWITCH_MODEL_CAO,
} from '../constants/action-types';

const ButtinGroup = Button.Group;

class loadSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSpan: 10,
      contentSpan: 14,
    };
    this.FromLoad = null;

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // 登录界面
  loginClick() {
    this.props.dispatch({
      type: 'linkService/login'
    });
    // browserHistory.push('/');
  }

  //-----------------
  handleConfirm() {
    /**
     * 数据保存前，做数据校验,
     * 所有数据均为必填项，包括：客户名称，联系人，联系方式，地址
     */
    // let { onConfirm } = this.props;
    this.FromLoad.validateFields((err, userData) => {
      let props = this.props;
      if (!!err) {
        return;
      }
      console.log(userData);
      new Promise(function (resolve, reject) {
        props.dispatch({
          type: 'linkService/doLogin',
          payload: {
            userData, // 数据
            resolve, // 成功执行函数
            reject // 失败执行行数
          }
        });
      }).then(
        () => {
          if (this.props.linkService.isLogin) {
            this.props.history.push("/index");
          }
        },
        (data) => {
          // 第一个参数为成功，第二个参数为错误，这种写法成功做反应，只对错误进行反应
          // Modal.error({
          //   title: '错误提示',
          //   content: <p style={{ fontSize: 14 }}>用户名 或 密码 错误！</p>
          // });
          // this.props.history.push("/index");
          alert("密码或账号错误");
        });
    });
  }

  handleCancel() {
    let props = this.props;
    props.dispatch({
      type: 'linkService/hideModal'
    });
  }
  //-----------------

  // loginModalProps() {
  //   let obj;
  //   const props = this.props;
  //   return obj = {
  //     visible: this.props.linkService.modalVisible,
  //     onConfirm(userData) {
  //       new Promise(function (resolve, reject) {
  //         props.dispatch({
  //           type: 'linkService/doLogin',
  //           payload: {
  //             userData, // 数据
  //             resolve, // 成功执行函数
  //             reject // 失败执行行数
  //           }
  //         });
  //       }).then(null, (data) => {
  //         // 第一个参数为成功，第二个参数为错误，这种写法成功做反应，只对错误进行反应
  //         // Modal.error({
  //         //   title: '错误提示',
  //         //   content: <p style={{ fontSize: 14 }}>用户名 或 密码 错误！</p>
  //         // });
  //         alert("错误");
  //       });
  //     },
  //     onCancel() {
  //       props.dispatch({
  //         type: 'linkService/hideModal'
  //       });
  //     }
  //   };

  // }

  render() {
    return (
      <div className={styles.wrapper} >
        <img
          className={styles.imgProject}
          src={bgImg} alt="项目图片"
        />
        <div className={styles.divFontName} >三维城市展示系统</div>
        <div className={styles.divLoadFrom} >
          <div className={styles.divFontUser}>用户登录</div>
          <FromLoadSys
            ref={(node) => {
              this.FromLoad = node;
            }}
          />
          <div >
            <Button type="primary" size="large" className={styles.btnLoad} onClick={this.handleConfirm}>登录</Button>
            {/* <Button type="ghost" onClick={this.handleCancel}>取消</Button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ linkService }) => {
  return {
    linkService,
  };
})(loadSystem);
