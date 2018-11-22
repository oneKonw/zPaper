import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';

import styles from '../CardDiv.css';

class NumCityImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const myEchartBar = echarts.init(document.getElementById('pie'));
    myEchartBar.setOption({
      backgroundColor: 'rgba(255, 255, 255, 0)',
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '1' },
            { value: 274, name: '2' },
            { value: 310, name: '3' },
            { value: 335, name: '4' },
            { value: 400, name: '5' },
          ],
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 1)',
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
            },
          },
          // itemStyle: {
          //   normal: {
          //     shadowBlur: 200,
          //     shadowColor: 'rgba(0, 0, 0, 0.5)',
          //   },
          // },
        },
      ],
    });
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>当前系统导入城市设计分析×个</p>
        <div
          className={styles.divEchart}
          id="pie"
        />
      </div>
    );
  }
}

export default NumCityImport;
