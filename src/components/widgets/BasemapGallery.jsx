import React from 'react';
import BasemapGalleryViewModel from 'esri/widgets/BasemapGallery/BasemapGalleryViewModel';

import { Tooltip } from 'antd';

import styles from './WidgetButtons.css';

class BasemapGallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      vm: {},
      view: {},
      destroy: false,
    };

    this.createBasemapGallery = this.createBasemapGallery.bind(this);
  }

  componentDidMount() {
    this.props.view.when((view) => {
      this.state.view = view;
    });
  }
  createBasemapGallery() {
    if (!this.state.destroy) {
      this.state.vm = new BasemapGalleryViewModel();
      this.state.vm.view = this.state.view;
      this.state.destroy = true;
    } else {
      this.state.vm.destroy();
      this.state.destroy = false;
    }
  }
  render() {
    return (
      <div>
        <Tooltip placement="left" title="底图">
          <a className={styles.btn} onClick={this.createBasemapGallery}>
            <span className="esri-icon-pan" />
          </a>
        </Tooltip>
        <br />
      </div>
    );
  }
}

export default BasemapGallery;
