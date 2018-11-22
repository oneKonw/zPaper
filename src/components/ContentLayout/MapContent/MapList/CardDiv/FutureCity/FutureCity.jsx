import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';

import styles from '../CardDiv.css';

class FutureCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const myEchartLine = echarts.init(document.getElementById('factorAnalysLine'));
    myEchartLine.setOption({
      title: {},
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
          },
        },
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    });
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>未来城市</p>
        <div
          className={styles.divEchart}
          id="factorAnalysLine"
        />
      </div>
    );
  }
}

export default FutureCity;
