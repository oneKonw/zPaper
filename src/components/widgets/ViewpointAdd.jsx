import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import Slide from 'esri/webscene/Slide';
import styles from './ViewpointAdd.css';
import env from '../../utils/env';

const ButtonGroup = Button.Group;

class ViewpointAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayflag: 0,
      slideindex: -1, // 判断删除第几张幻灯片
      slideflag: -1,
      slidetitle: '',
      slides: new Array(0),
      slidesArray: new Array(0),
    };
    this.title = null;
    this.listVisible = this.listVisible.bind(this);
    // this.onRecordButton = this.onRecordButton.bind(this);
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.onSlideCreateClick = this.onSlideCreateClick.bind(this);
    this.onSlideClick = this.onSlideClick.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onSlideDeletClick = this.onSlideDeletClick.bind(this);
    this.onSaveTitleButtonClick = this.onSaveTitleButtonClick.bind(this);
    this.onSlideAddClick = this.onSlideAddClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const index = nextProps.agsOperate.slidesarrayindex;
    if (index !== -1) {
      this.setState({
        slides: this.state.slidesArray[index],
      });
    } else {
      this.setState({
        slides: [],
      });
    }
    this.title.value = '';
  }

  // 创建幻灯片
  onSlideCreateClick() {
    const slideArray = this.state.slides;
    const view = env.getParamAgs().view;
    // console.log('幻灯组', view);
    // const scene = view.map;
    Slide.createFrom(view).then((slide) => {
      const tempSlide = slide;
      // 加到scene的幻灯片组里
      slideArray.push(tempSlide);
      this.setState({
        slides: slideArray,
        slideindex: slideArray.length - 1,
      });
    });
  }
  // 删除幻灯片
  onSlideDeletClick() {
    const tempArray = this.state.slides;
    if (this.state.slideindex === -1) {
      tempArray.pop();
    } else {
      tempArray.splice(this.state.slideindex, 1);
    }
    // 重置索引
    this.setState({
      slideindex: -1,
      slides: tempArray,
    });
  }

  // 添加幻灯片
  onSlideAddClick() {
    if (this.state.slideindex !== -1) {
      const view = env.getParamAgs().view;
      const tempArray = this.state.slides;
      Slide.createFrom(view).then((slide) => {
        const tempSlide = slide;
        tempArray.splice(this.state.slideindex + 1, 0, tempSlide);
        console.log('添加', tempArray);
        // 重置索引
        this.setState({
          slideindex: -1,
          slides: tempArray,
        });
      });
    }
  }

  // 幻灯片点击事件
  onSlideClick(event) {
    const view = env.getParamAgs().view;
    const index = Number(event.target.id);
    this.state.slides[index].applyTo(view);
    // 设置删除所用的索引
    this.setState({
      slideindex: index,
    });
  }

  // 播放幻灯片
  onPlayButtonClick() {
    if (this.state.slides != null) {
      const tempslides = this.state.slides;
      const view = env.getParamAgs().view;
      const timerofSlide = setInterval(() => {
        view.goTo(
          tempslides[this.state.arrayflag].viewpoint,
          {
            duration: 1000,
            // speedFactor: 0.2,
            easing: 'linear',
          },
        );
        this.setState({
          arrayflag: this.state.arrayflag + 1,
        });
        // 终止遍历
        if (this.state.arrayflag === tempslides.length) {
          this.setState({
            arrayflag: 0,
          });
          clearInterval(timerofSlide);
        }
      }, 1000);
    }
  }

  // 保存幻灯片
  onSaveButtonClick() {
    const index = this.props.agsOperate.slidesarrayindex;
    if (index === -1) {
      this.state.slidesArray.push(this.state.slides);
    } else {
      this.state.slidesArray.splice(index, 1, this.state.slides);
    }
    this.props.dispatch({
      type: 'agsOperate/changeStateViewPoint',
      payload: {
        flagViewpoint: false,
      },
    });
    this.props.dispatch({
      type: 'agsOperate/setSlidesArray',
      payload: {
        slidesarrayindex: -1,
        slidesarrays: this.state.slidesArray,
      },
    });
    this.setState({
      slides: new Array(0),
    });
  }

  // 确定幻灯片标题
  onSaveTitleButtonClick() {
    if (this.state.slides.length > 0) {
      this.state.slides[0].title.text = this.title.value;
    }
  }

  listVisible() {
    this.props.dispatch({
      type: 'agsOperate/changeStateViewPoint',
      payload: {
        flagViewpoint: false,
      },
    });
  }

  render() {
    const slideDivList = [];
    if (this.state.slides != null) {
      for (let i = 0; i < this.state.slides.length; i += 1) {
        slideDivList.push(
          <Row
            key={i}
            id={i}
            style={{
              width: '200px',
              padding: '10px',
              margin: 'auto',
            }}
          >
            <img
              id={i}
              src={this.state.slides[i].thumbnail.url}
              alt="幻灯片"
              onClick={this.onSlideClick}
            />
          </Row>,
        );
      }
    }
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.flagViewpoint
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.divTitle} >
          <span className={styles.spanTitleFont} >漫游</span>
          <span className={styles.spanModalShow} onClick={this.listVisible} >X</span>
        </div>
        <ButtonGroup className={styles.btnGp}>
          <Button
            className={styles.btnToolBar}
            onClick={this.onSlideCreateClick}
          >
            截取
              </Button>
          <Button
            className={styles.btnToolBar}
            onClick={this.onSlideAddClick}
          >
            添加
              </Button>
          <Button
            className={styles.btnToolBar}
            onClick={this.onSlideDeletClick}
          >
            删除
              </Button>
          <Button
            className={styles.btnToolBar}
            onClick={this.onPlayButtonClick}
          >
            播放
              </Button>
          <Button
            className={styles.btnToolBar}
            onClick={this.onSaveButtonClick}
          >
            保存
              </Button>
        </ButtonGroup>
        <div>
          <Row
            style={{
              margin: '5px',
            }}
          >
            <Col span="6">
              <span className={styles.sapnSave} >漫游名称：</span>
            </Col>
            <Col span="14">
              <Input className={styles.inputSave} type="text" ref={(ref) => { this.title = ref; }} defaultValue="" />
            </Col>
            <Col span="4">
              <Button onClick={this.onSaveTitleButtonClick} className={styles.btnSave} >确定</Button>
            </Col>
          </Row>
          <div className={styles.divSlides}>
            {slideDivList}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(ViewpointAdd);
