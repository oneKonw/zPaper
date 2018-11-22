import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';

import styles from '../CardDiv.css';

class FactorAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const myEchartBar = echarts.init(document.getElementById('factorAnalysBar'));
    myEchartBar.setOption({
      title: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['2011年'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
          },
        },
        splitLine: { show: false },
      },
      xAxis: {
        type: 'category',
        data: ['巴西', '印尼', '美国'],
        axisLabel: {
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
          },
        },
      },
      series: [
        {
          name: '2012年',
          type: 'bar',
          data: [5, 15, 10],
        },
      ],
    });
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>城市设计评价分析体系</p>
        <div
          className={styles.divEchart}
          id="factorAnalysBar"
        />
      </div>
    );
  }
}

export default FactorAnalysis;
