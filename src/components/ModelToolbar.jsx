import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

const ButtinGroup = Button.Group;

class ModelToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <ButtinGroup >
        <Button
          onClick={this.btnSwitch2D}
        >二维</Button>
        <Button
          onClick={this.btnSwitch3D}
        >三维</Button>
        <Button>街景</Button>
      </ButtinGroup>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(ModelToolbar);
