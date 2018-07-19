import React from 'react';
import CompassViewModel from 'esri/widgets/Compass/CompassViewModel';

import styles from './WidgetButtons.css';

function toRotationTransform(orientation) {
  return {
    display: 'inline-block',
    fontSize: '24px',
    transform: `rotateZ(${orientation.z}deg)`,
  };
}

class Compass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vm: new CompassViewModel(),
      orientation: {
        z: 0,
      },
    };

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.props.view.when((view) => {
      this.state.vm.view = view;
      this.state.vm.watch('orientation', (orientation) => {
        this.setState({
          orientation,
        });
      });
    });
  }

  reset() {
    this.state.vm.reset();
  }

  render() {
    const { orientation } = this.state.vm;

    return (
      <div
        style={{
          position: 'absolute',
          bottom: '132px',
          right: '0',
          zIndex: 12,
        }}
      >
        <a className={styles.compassBtn} onClick={this.reset}>
          <span
            className="esri-icon-compass"
            style={toRotationTransform(orientation)}
          />
        </a>
      </div>
    );
  }
}

export default Compass;
