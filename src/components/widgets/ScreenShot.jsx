import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from '../ContentLayout/ToolBar.css';
import env from '../../utils/env';

class ScreenShot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgScreenShot: null,
    };

    this.maskDiv = null;
    this.screenshotDiv = null;
    this.myScreenshotImage = null;
    // this.btnExport = this.btnExport.bind(this);
    this.btnClose = this.btnClose.bind(this);
    this.btnDloadImg = this.btnDloadImg.bind(this);
  }

  componentDidMount() {
    this.screenshotDiv.classList.add(styles.hide);
    this.myScreenshotImage = document.getElementById('shotImage');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.agsOperate.flagsImgScreenShot) {
      this.props.dispatch({
        type: 'agsOperate/screenShot',
        payload: {
          maskDiv: this.maskDiv,
          screenshotDiv: this.screenshotDiv,
          screenshotImage: this.myScreenshotImage,
          flagsImgScreenShot: false,
        },
      });
    }
  }

  // 截图返回视图
  btnClose() {
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
        midImg: this.props.agsOperate.urlScreenShot,
      },
    });
  }

  render() {
    return (
      <div>
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
)(ScreenShot);
