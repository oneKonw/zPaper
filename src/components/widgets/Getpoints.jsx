import React from 'react';
import styles from './Getpoints.css';
import env from '../../utils/env';


/*
  获取点坐标
*/
const view = env.getParamAgs().view;

class Getpoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      visible: true,
    };
  }

  componentDidMount() {
    this.getMappoints();
  }

  getMappoints() {
    view.on('pointer-move', (event) => {
      // 将屏幕点坐标转化为map点坐标
      const point = view.toMap({ x: event.x, y: event.y });
      this.setState({
        latitude: Math.round(point.latitude * 100) / 100,
        longitude: Math.round(point.longitude * 100) / 100,
      });
    });
    // this.props.view.when((view) => {
    //   view.on('pointer-move', (event) => {
    //     // 将屏幕点坐标转化为map点坐标
    //     const point = view.toMap({ x: event.x, y: event.y });
    //     this.setState({
    //       latitude: Math.round(point.latitude * 100) / 100,
    //       longitude: Math.round(point.longitude * 100) / 100,
    //     });
    //   });
    // });
  }
  render() {
    return (
      <div>
        <div
          id="showl"
          className={styles.showl}
          style={{ display: this.state.visible ? 'block' : 'none' }}
        >
          <span className={styles.phang}>
            经度：<span id="showspan2">{this.state.longitude}</span>
          </span>
          <span className={styles.phang}>
            纬度：<span id="showspan1">{this.state.latitude}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Getpoints;
