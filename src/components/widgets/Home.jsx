import React from 'react';
import HomeViewModel from 'esri/widgets/Home/HomeViewModel';

import styles from './WidgetButtons.css';
import env from '../../utils/env';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vm: new HomeViewModel(),
      viewPoint: null,
    };

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    // this.state.vm.view = env.getParamAgs().view;
    this.props.view.when((view) => {
      this.state.vm.view = view;
    });
  }

  reset() {
    this.state.vm.go(this.state.vm.view.map.initialViewProperties.viewpoint);
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '0px',
          zIndex: 12,
        }}
      >
        <a className={styles.tranfBtn} onClick={this.reset}>
          <span className="esri-icon-home" />
        </a>
      </div>
    );
  }
}

export default Home;
