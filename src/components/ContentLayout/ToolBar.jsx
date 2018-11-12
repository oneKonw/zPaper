import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './ToolBar.css';
import env from '../../utils/env';

import {
  SCENE_MEASURE,
  LOOK_AROUND,
  ANALYSIS_SHADOW,
} from '../../constants/action-types';

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
    const maskDiv = this.maskDiv;
    const screenshotDiv = this.screenshotDiv;
    const ags = env.getParamAgs();
    ags.view.container.classList.add(styles.screenshotCursor);
    let myArea = null;
    const dragHandler = ags.view.on('drag', (event) => {
      event.stopPropagation();
      console.log('事件', event);
      if (event.action !== 'end') {
        // 计算截图四个角的坐标
        const xmin = clamp(Math.min(event.origin.x, event.x), 0, ags.view.width);
        const xmax = clamp(Math.max(event.origin.x, event.x), 0, ags.view.width);
        const ymin = clamp(Math.min(event.origin.y, event.y), 0, ags.view.height);
        const ymax = clamp(Math.max(event.origin.y, event.y), 0, ags.view.height);
        myArea = {
          x: xmin,
          y: ymin,
          width: xmax - xmin,
          height: ymax - ymin,
        };
        setMaskPosition(myArea);
      } else {
        // 清除监听
        dragHandler.remove();
        ags.view.takeScreenshot({ area: myArea, format: 'png' })
          .then((screenshot) => {
            this.setState({
              imgScreenShot: screenshot,
            });
            // 显示图片
            showPreview(screenshot);
            // the screenshot mode is disabled
            // screenshotBtn.classList.remove('active');
            ags.view.container.classList.remove('screenshotCursor');
            setMaskPosition(null);
          });
      }
    });

    // 遮罩位置
    function setMaskPosition(tempArea) {
      if (tempArea) {
        maskDiv.classList.remove(styles.hide);
        maskDiv.style.left = tempArea.x + 'px';
        maskDiv.style.top = tempArea.y + 'px';
        maskDiv.style.width = tempArea.width + 'px';
        maskDiv.style.height = tempArea.height + 'px';
      } else {
        maskDiv.classList.add(styles.hide);
      }
    }

    function clamp(value, from, to) {
      // 坐标值大于0小于视图宽度则返回坐标值
      return value < from ? from : value > to ? to : value;
    }

    // 显示图片
    function showPreview(screenshot) {
      screenshotDiv.classList.remove(styles.hide);
      // add the screenshot dataUrl as the src of an image element
      const screenshotImage = document.getElementById('shotImage');
      console.log('截图', screenshotImage);
      screenshotImage.width = screenshot.data.width;
      screenshotImage.height = screenshot.data.height;
      screenshotImage.src = screenshot.dataUrl;
    }
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
    const ags = env.getParamAgs();
    const text = document.getElementById('textInput').value;
    // if a text exists, then add it to the image
    if (text) {
      const dataUrl = getImageWithText(this.state.imgScreenShot, text);
      console.log('文字url', dataUrl);
      downloadImage(ags.view.map.portalItem.title + '.png', dataUrl);
    } else {
      // otherwise download only the webscene screenshot
      downloadImage(ags.view.map.portalItem.title + '.png', this.state.imgScreenShot.dataUrl);
    }

    // returns a new image created by adding a custom text to the webscene image
    function getImageWithText(screenshot, tempText) {
      console.log('截图', screenshot);
      const imageData = screenshot.data;
      // to add the text to the screenshot we create a new canvas element
      const canvas = document.createElement('canvas');
      console.log('上下文', canvas);
      const context = canvas.getContext('2d');
      canvas.height = imageData.height;
      canvas.width = imageData.width;

      // add the screenshot data to the canvas
      context.putImageData(imageData, 0, 0);
      context.font = '20px Arial';
      context.fillStyle = '#000';
      context.fillRect(0, imageData.height - 40, context.measureText(tempText).width + 20, 30);

      // add the text from the textInput element
      context.fillStyle = '#fff';
      context.fillText(tempText, 10, imageData.height - 20);

      return canvas.toDataURL();
    }

    function downloadImage(filename, dataUrl) {
      // the download is handled differently in Microsoft browsers
      // because the download attribute for <a> elements is not supported
      if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download
        const element = document.createElement('a');
        element.setAttribute('href', dataUrl);
        // 设置文件名
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        console.log('dataurl', dataUrl);
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
    }
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
