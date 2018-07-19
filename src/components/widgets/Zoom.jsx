import React from 'react';
import watchUtils from 'esri/core/watchUtils';
import ZoomViewModel from 'esri/widgets/Zoom/ZoomViewModel';

import { Icon } from 'antd';

import styles from './WidgetButtons.css';

class Zoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vm: new ZoomViewModel(),
      updating: false,
      maxZoomed: false,
      minZoomed: false,
      zoomVal: null,
    };

    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidMount() {
    this.props.view.when((view) => {
      this.state.vm.view = view;
      watchUtils.init(view, 'zoom', (val) => {
        console.log(val);
        this.setState({
          maxZoomed: val === view.constraints.maxZoom,
          minZoomed: val === view.constraints.minZoom,
        });
      });
      watchUtils.init(view, 'stationary', (updating) => {
        this.setState({ updating });
      });
    });
    this.watchZoom();
  }

  zoomIn() {
    if (!this.state.maxZoomed) {
      this.state.vm.zoomIn();
    }
  }

  zoomOut() {
    if (!this.state.minZoomed) {
      this.state.vm.zoomOut();
    }
  }

  watchZoom() {
    console.log(this.props.view);
    this.setState({
      zoomVal: this.props.view.zoom,
    });
    this.props.view.watch('zoom', (newValue) => {
      this.setState({
        zoomVal: Math.round(newValue),
      });
    });
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '75px',
          right: '10px',
          zIndex: 12,
          // width: '36px',
          // height: '80px',
        }}
      >
        <a
          className={styles.zoomBtn}
          onClick={this.zoomIn}
          disabled={this.state.maxZoomed}
        >
          <Icon type="plus" className={styles.iconstyle} />
        </a>
        <br />
        <a
          className={styles.zoomBtnbottom}
          onClick={this.zoomOut}
          disabled={this.state.minZoomed}
        >
          <Icon type="minus" className={styles.iconstyle} />
        </a>
        {/* <div
          style={{
            position: 'relative',
            bottom: '53px',
            right: '0px',
            zIndex: 12,
            width: '25px',
            height: '25px',
            fontSize: '12px',
            fontFamily: 'Microsoft YaHei',
            background: '#1890ff',
            color: 'white',
            textAlign: 'center',
            lineHeight: '25px',
          }}
        >
          {this.state.zoomVal}
        </div> */}
      </div>
    );
  }
}

export default Zoom;
