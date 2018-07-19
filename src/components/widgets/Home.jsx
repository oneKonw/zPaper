import React from 'react';
import HomeViewModel from 'esri/widgets/Home/HomeViewModel';

import styles from './WidgetButtons.css';

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
          bottom: '130px',
          right: '10px',
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
