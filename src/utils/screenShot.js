import styles from '../components/ContentLayout/ToolBar.css';

// 遮罩位置
function setMaskPosition(tempArea, maskDiv) {
  const tempMaskDiv = maskDiv;
  if (tempArea) {
    tempMaskDiv.classList.remove(styles.hide);
    tempMaskDiv.style.left = tempArea.x + 'px';
    tempMaskDiv.style.top = tempArea.y + 'px';
    tempMaskDiv.style.width = tempArea.width + 'px';
    tempMaskDiv.style.height = tempArea.height + 'px';
  } else {
    tempMaskDiv.classList.add(styles.hide);
  }
}

function clamp(value, from, to) {
  // 坐标值大于0小于视图宽度则返回坐标值
  return value < from ? from : value > to ? to : value;
}

/**
 * 显示截图和按钮
 * @param {*} screenshot: 截图
 * @param {*} screenshotDiv: 遮罩容器
 * @param {*} screenshotImage: 图片容器
 */
function showPreview(screenshot, screenshotDiv, screenshotImage) {
  const tempScreenshotImage = screenshotImage;
  screenshotDiv.classList.remove(styles.hide);
  // add the screenshot dataUrl as the src of an image element
  // const screenshotImage = document.getElementById('shotImage');
  console.log('截图', tempScreenshotImage);
  tempScreenshotImage.width = screenshot.data.width;
  tempScreenshotImage.height = screenshot.data.height;
  tempScreenshotImage.src = screenshot.dataUrl;
}

// 下载截图
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

// 将文字叠加上截图
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

export { setMaskPosition, clamp, showPreview, downloadImage, getImageWithText };
