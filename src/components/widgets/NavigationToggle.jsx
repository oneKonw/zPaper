import React from 'react';
import NavigationToggleViewModel from 'esri/widgets/NavigationToggle/NavigationToggleViewModel';

import { Tooltip } from 'antd';

import styles from './WidgetButtons.css';

class NavigationToggle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      vm: new NavigationToggleViewModel(),
      mode: 'pan',
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.view.when((view) => {
      this.state.vm.view = view;
    });
  }

  toggle() {
    this.state.vm.toggle();
    this.setState({
      mode: this.state.vm.navigationMode,
    });
  }

  render() {
    const panSelected = this.state.mode === 'pan';

    return (
      <div>
        <Tooltip placement="left" title="平移">
          <a className={styles.btn} onClick={this.toggle} style={{ background: panSelected ? '#00DEC9' : '' }}>
            <span className="esri-icon-pan" />
          </a>
        </Tooltip>
        <br />
        <Tooltip placement="left" title="旋转">
          <a className={styles.btn} onClick={this.toggle} style={{ background: !panSelected ? '#00DEC9' : '' }}>
            <span className="esri-icon-rotate" />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default NavigationToggle;
