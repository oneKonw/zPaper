import React, { Component } from 'react';
import { connect } from 'dva';

class Layercontrol extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <div
          style={{ width: '200px', height: '500px', backgroundColor: 'red' }}
        >
          {' '}
          222222222222
        </div>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(Layercontrol);
