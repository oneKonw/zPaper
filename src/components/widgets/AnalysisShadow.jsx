import React, { Component } from 'react';
import { connect } from 'dva';
import { Slider, DatePicker, Row, Col, Checkbox, Button, Icon } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './AnalysisShadow.less';
import env from '../../utils/env';

class AnalysisShadow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuetime: moment(new Date(), 'YYYY/MM/DD'),
      sliderValue: moment().hour() * 60 + moment().minute(),
      sliderPlayState: false,
      datepickerPlayState: false,
      timerOfSlider: setInterval(null, null),
      timerOfDatepicker: setInterval(null, null),
      iconOfDatePicker: 'caret-right',
      iconOfSlider: 'caret-right',
    };
    this.listvisible = this.listvisible.bind(this);
    this.onDatepickerChange = this.onDatepickerChange.bind(this);
    this.onSliderValueAdd = this.onSliderValueAdd.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onDatepickerValueAdd = this.onDatepickerValueAdd.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
  }

  onDatepickerChange(value) {
    this.setState({
      valuetime: value,
    });
    console.log('VALUE', value, 'VALUETIME', this.state.valuetime);
    env.getParamAgs().view.environment.lighting.date = Number(value.format('x'));
  }

  // 时间播放按钮
  onSliderValueAdd() {
    // 时间播放与暂停
    if (this.state.sliderValue < 1440) {
      this.setState({
        sliderPlayState: !this.state.sliderPlayState,
      });
      if (this.state.sliderPlayState) {
        clearInterval(this.state.timerOfSlider);
        this.setState({
          iconOfSlider: 'caret-right',
        });
      } else {
        this.state.timerOfSlider = setInterval(() => {
          let temp = this.state.sliderValue;
          const tempTime1 = this.state.valuetime.hour(parseInt(temp / 60, 10)).minute(temp % 60);
          env.getParamAgs().view.environment.lighting.date = Number(tempTime1.format('x'));
          // slidervalue数据同步
          this.setState({
            sliderValue: temp += 5,
            iconOfSlider: 'pause',
          });
          if (temp > 1440) {
            clearInterval(this.state.timerOfSlider);
            this.setState({
              iconOfSlider: 'caret-right',
              sliderPlayState: !this.state.sliderPlayState,
            });
          }
        }, 10);
      }
    }
  }

  // 日期播放按钮
  onDatepickerValueAdd() {
    this.setState({
      datepickerPlayState: !this.state.datepickerPlayState,
    });
    if (!this.state.datepickerPlayState) {
      this.state.timerOfDatepicker = setInterval(() => {
        const tempNowTime = this.state.valuetime.add(1, 'days');
        env.getParamAgs().view.environment.lighting.date = Number(tempNowTime.format('x'));
        this.setState({
          valuetime: tempNowTime,
          iconOfDatePicker: 'pause',
        });
      }, 100);
    } else {
      clearInterval(this.state.timerOfDatepicker);
      this.setState({
        iconOfDatePicker: 'caret-right',
      });
    }
  }

  onSliderChange(value) {
    // 将传入的value转换为小时，分钟
    const tempTime2 = this.state.valuetime.hour(parseInt(value / 60, 10)).minute(value % 60);
    this.setState({
      sliderValue: value,
      valuetime: tempTime2,
    });
    env.getParamAgs().view.environment.lighting.date = Number(tempTime2.format('x'));
  }

  onCheckBoxChange(e) {
    if (e.target.checked) {
      env.getParamAgs().view.environment.lighting.directShadowsEnabled = true;
    } else {
      env.getParamAgs().view.environment.lighting.directShadowsEnabled = false;
    }
    console.log('NOTHING:', this.state.valuetime);
  }

  listvisible() {
    this.props.dispatch({
      type: 'agsOperate/changeStateAnalysisShadow',
      payload: !this.props.agsOperate.flagsAnalysisShadow,
    });
  }

  render() {
    const marks = {
      0: '0点',
      360: '6点',
      720: '12点',
      1080: '18点',
      1440: '24点',
    };
    return (
      <div
        className={styles.modlediv}
        style={{
          display: this.props.agsOperate.flagsAnalysisShadow
            ? 'block'
            : 'none',
        }}
      >
        <div className={styles.listdiv}>
          <p className={styles.ptitle}>
            日照分析<span
              className={styles.spantitle}
              onClick={this.listvisible}
            >
              ×
            </span>
          </p>
          <div className={styles.settingInfo}>
            <Row
              style={{
                marginBottom: '8px',
              }}
            >
              <Col
                offset="1"
                span="18"
              >
                <Slider
                  marks={marks}
                  max={1440}
                  defaultValue={0}
                  tipFormatter={null}
                  value={this.state.sliderValue}
                  onChange={this.onSliderChange}
                />
              </Col>
              <Col span="2" offset="1" className={styles.settingItem}>
                <Button
                  style={{
                    marginTop: '5px',
                  }}
                  type="primary"
                  shape="circle"
                  onClick={this.onSliderValueAdd}
                ><Icon type={this.state.iconOfSlider} />
                </Button>
              </Col>
            </Row>
            <Row
              style={{
                marginBottom: '8px',
              }}
            >
              <Col span="18" offset="1" >
                <DatePicker
                  showToday={false}
                  allowClear={false}
                  defaultValue={this.state.valuetime}
                  format="YYYY-MM-DD"
                  onChange={this.onDatepickerChange}
                  className={styles.dpShadow}
                />
              </Col>
              <Col span="2" offset="1" className={styles.settingItem}>
                <Button
                  style={{
                    marginTop: '5px',
                  }}
                  type="primary"
                  shape="circle"
                  onClick={this.onDatepickerValueAdd}
                ><Icon type={this.state.iconOfDatePicker} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span="8" offset="8">
                <Checkbox
                  defaultChecked={false}
                  onChange={this.onCheckBoxChange}
                >显示阴影
                </Checkbox>
              </Col>
            </Row>
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
})(AnalysisShadow);

