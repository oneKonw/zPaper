import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon, Input, Tree } from 'antd';

import styles from './PjReview.less';
import env from '../../utils/env';

const { TreeNode } = Tree;

class PjReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.btnSerachBuild = this.btnSerachBuild.bind(this);
    this.btnShowModel = this.btnShowModel.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(checkedKeys, info) {
    // console.log(info.checked);
    // checkedKeys是一个数组，表示前总公勾选了哪几个
    // console.log(checkedKeys, info);
    this.props.dispatch({
      type: 'agsOperate/pjReview',
      payload: {
        checkedKeys: checkedKeys,
        checked: info.checked,
      },
    });
  }

  // btnSerachBuild() {
  //   this.props.dispatch({
  //     type: 'agsOperate/btnSearchBuild',
  //     payload: {
  //       midText: 'hello',
  //     },
  //   });
  // }
  btnShowModel() {
    this.props.dispatch({
      type: 'agsOperate/changeStatePjReview',
      payload: {
        falgPjReview: !this.props.agsOperate.falgPjReview,
      },
    });
  }

  render() {
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.falgPjReview
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.divTitle} >
          <span className={styles.divTitleFont} >方案对比</span>
          <span className={styles.ModalShow} onClick={this.btnShowModel} >X</span>
        </div>
        <div>
          <Tree
            showLine
            checkable
            defaultExpandedKeys={['9', '4']}
            // defaultSelectedKeys={['5', '3', '2']}
            defaultCheckedKeys={['5', '3', '2']}
            // onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="方案一" key="9">
              <TreeNode title="建筑" key="13" />
              <TreeNode title="树木" key="12" />
              <TreeNode title="道路" key="11" />
            </TreeNode>
            <TreeNode title="方案二" key="4">
              <TreeNode title="建筑" key="8" />
              <TreeNode title="树木" key="7" />
              <TreeNode title="道路" key="6" />
            </TreeNode>
            <TreeNode title="规划用地" key="5" />
            <TreeNode title="原有建筑" key="3" />
            <TreeNode title="其他建筑" key="2" />
          </Tree>
          {/* <TreeNode title="方案一" key="9">
              <TreeNode title="建筑" key="13" />
              <TreeNode title="树木" key="12" />
              <TreeNode title="道路" key="11" />
              <TreeNode title="规划面积" key="10" />
            </TreeNode>
            <TreeNode title="方案二" key="4">
              <TreeNode title="建筑" key="8" />
              <TreeNode title="树木" key="7" />
              <TreeNode title="道路" key="6" />
              <TreeNode title="规划面积" key="5" />
            </TreeNode>
            <TreeNode title="规划建筑" key="3" />
            <TreeNode title="其他建筑" key="2" />
          </Tree> */}
        </div>
      </div >
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(PjReview);
