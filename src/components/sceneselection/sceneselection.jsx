import React, { Component } from 'react';
import { connect } from 'dva';

class Sceneselection extends Component {
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
          11111111111
        </div>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(Sceneselection);
