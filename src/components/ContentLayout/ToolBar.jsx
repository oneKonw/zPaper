import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './ToolBar.css';
import env from '../../utils/env';
import screenShot from '../widgets/ScreenShot';

const ButtinGroup = Button.Group;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagsLookAround: true,
      imgScreenShot: null,
    };
    this.maskDiv = null;
    this.screenshotDiv = null;

    this.btnAddSgs = this.btnAddSgs.bind(this);
    this.btnMeasure = this.btnMeasure.bind(this);
    this.btnLookAround = this.btnLookAround.bind(this);
    this.btnAnalysisShadow = this.btnAnalysisShadow.bind(this);
    this.btnExport = this.btnExport.bind(this);
    this.btnClose = this.btnClose.bind(this);
    this.btnDloadImg = this.btnDloadImg.bind(this);
  }

  componentDidMount() {
    this.screenshotDiv.classList.add(styles.hide);
  }

  // 显示磁贴面版
  btnAddSgs() {
    this.props.dispatch({
      type: 'agsOperate/changeStateContent',
      payload: !this.props.agsOperate.flagsContent,
    });
  }
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
    const myScreenshotImage = document.getElementById('shotImage');
    this.props.dispatch({
      type: 'agsOperate/screenShot',
      payload: {
        maskDiv: this.maskDiv,
        screenshotDiv: this.screenshotDiv,
        screenshotImage: myScreenshotImage,
      },
    });
  }

  // 截图返回视图
  btnClose() {
    console.log('关闭');
    const ags = env.getParamAgs();
    this.screenshotDiv.classList.add(styles.hide);
    ags.view.container.classList.remove(styles.screenshotCursor);
  }

  // 截图下载本地
  btnDloadImg() {
    const text = document.getElementById('textInput').value;
    console.log(this.props.agsOperate.imgScreenShot);
    this.props.dispatch({
      type: 'agsOperate/screenShotDload',
      payload: {
        midText: text,
        midImg: this.props.agsOperate.imgScreenShot,
      },
    });
  }

  render() {
    return (
      <div>
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
            onClick={this.btnAddSgs}
          >添加建议</Button>
        </ButtinGroup>
        <div
          ref={(node) => {
            this.screenshotDiv = node;
          }}
          className={styles.screenshotDiv}
        >
          <img alt="截图" id="shotImage" />
          <p />
          <input type="text" placeholder="Image text" id="textInput" />
          <Button
            id="downloadBtn"
            onClick={this.btnDloadImg}
          >Download image</Button>
          <Button
            id="closeBtn"
            onClick={this.btnClose}
          >Back to webscene</Button>
        </div>
        <div
          id="maskDiv"
          ref={(node) => {
            this.maskDiv = node;
          }}
          className={styles.maskDiv}
        />
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
