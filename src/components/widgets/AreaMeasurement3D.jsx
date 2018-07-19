import React from 'react';
import AreaMeasurement3DViewModel from 'esri/widgets/AreaMeasurement3D/AreaMeasurement3DViewModel';

import { Tooltip } from 'antd';

import styles from './WidgetButtons.css';

class AreaMeasurement3D extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      vm: {},
      view: {},
      destroy: false,
    };

    this.createMeasurement = this.createMeasurement.bind(this);
  }

  componentDidMount() {
    this.props.view.when((view) => {
      this.state.view = view;
    });
  }
  createMeasurement() {
    if (!this.state.destroy) {
      this.state.vm = new AreaMeasurement3DViewModel();
      this.state.vm.view = this.state.view;
      this.state.destroy = true;
      this.mouseMoveHandle = view.on('double-click', evt => {
        if (this.state.over) {
          this.state.vm.destroy();
          this.state.destroy = false;
        }
      });
    } else {
      this.state.vm.destroy();
      this.state.destroy = false;
    }
  }
  render() {
    return (
      <div>
        <Tooltip placement="left" title="测量">
          <a className={styles.btn} onClick={this.createMeasurement}>
            <span className="esri-icon-pan" />
          </a>
        </Tooltip>
        <br />
      </div>
    );
  }
}

export default AreaMeasurement3D;
