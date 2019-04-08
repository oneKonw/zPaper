import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './ToolBar.css';
import ScreenShot from '../widgets/ScreenShot';

const ButtinGroup = Button.Group;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagsLookAround: true,
      imgScreenShot: null,
      flagsScreenShot: false,
    };

    // this.btnAddSgs = this.btnAddSgs.bind(this);
    this.btnMeasure = this.btnMeasure.bind(this);
    this.btnLookAround = this.btnLookAround.bind(this);
    this.btnAnalysisShadow = this.btnAnalysisShadow.bind(this);
    this.btnExport = this.btnExport.bind(this);
    this.btnRoam = this.btnRoam.bind(this);
    this.btnSearchBuild = this.btnSearchBuild.bind(this);
    this.btnPjReview = this.btnPjReview.bind(this);

  }


  // // 显示磁贴面版
  // btnAddSgs() {
  //   this.props.dispatch({
  //     type: 'agsOperate/changeStateContent',
  //     payload: {
  //       flagsContent: !this.props.agsOperate.flagsContent,
  //       flagToolbar: !this.props.agsOperate.flagToolbar,
  //     },
  //   });
  // }
  // 显示测量面版
  btnMeasure() {
    this.props.dispatch({
      type: 'agsOperate/btnMeasure',
      payload: !this.props.agsOperate.flagsSceneMeasure,
    });
  }
  // 环视
  btnLookAround() {
    this.props.dispatch({
      type: 'agsOperate/btnLookAround',
      payload: this.state.flagsLookAround,
    });
    this.setState({
      flagsLookAround: !this.state.flagsLookAround,
    });
  }

  // 阴影
  btnAnalysisShadow() {
    this.props.dispatch({
      type: 'agsOperate/changeStateAnalysisShadow',
      payload: !this.props.agsOperate.flagsAnalysisShadow,
    });
  }

  // 导出
  btnExport() {
    this.props.dispatch({
      type: 'agsOperate/changeStateImgShot',
      payload: {
        flagsImgScreenShot: true,
      },
    });
  }

  // 漫游
  btnRoam() {
    this.props.dispatch({
      type: 'agsOperate/changeStateViewPoint',
      payload: {
        flagViewpoint: true,
      },
    });
  }

  // 建筑查询
  btnSearchBuild() {
    this.props.dispatch({
      type: 'agsOperate/changeStateBuildSearch',
      payload: {
        flagBuildSearch: !this.props.agsOperate.flagBuildSearch,
      },
    });
  }

  // 方案评审
  btnPjReview() {
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
        style={{
          display: this.props.agsOperate.flagToolbar
            ? 'block'
            : 'none',
        }}
      >
        <ButtinGroup
          className={styles.btnToolBar}
        >
          <Button
            onClick={this.btnMeasure}
          >量测</Button>
          <Button
            onClick={this.btnLookAround}
          >环视</Button>
          <Button
            onClick={this.btnAnalysisShadow}
          >阴影</Button>
          <Button
            onClick={this.btnExport}
          >导出</Button>
          <Button
            onClick={this.btnRoam}
          >漫游</Button>
          <Button
            onClick={this.btnAddSgs}
          >添加建议</Button>
          <Button
            onClick={this.btnSearchBuild}
          >建筑查询</Button>
          <Button
            onClick={this.btnPjReview}
          >
            方案评审
          </Button>
        </ButtinGroup>
        <ScreenShot />
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
},
)(ToolBar);
