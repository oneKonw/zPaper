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

    this.btnClose = this.btnClose.bind(this);
    this.btnDloadImg = this.btnDloadImg.bind(this);
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
