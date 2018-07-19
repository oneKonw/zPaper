import React, { Component } from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import styles from './Projectpicture.css';
import ProjectpictureIcon from '../../assets/slider/项目一张图01.png';
import ProjectpictureIcons from '../../assets/slider/项目一张图02.png';

class Projectpicture extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.prolistvisble = this.prolistvisble.bind(this);
    this.enterChange = this.enterChange.bind(this);
    this.leaveChange = this.leaveChange.bind(this);
  }

  prolistvisble() {
    if (this.props.agsmap.prolistflags) {
      // prepare();
      this.props.dispatch({
        type: 'agsmap/prolistChangeState',
        payload: false,
      });
      console.log(this.props.agsmap.prolistflags);
    } else {
      this.props.dispatch({
        type: 'agsmap/prolistChangeState',
        payload: true,
      });
      console.log(this.props.agsmap.prolistflags);
    }
  }

  enterChange() {
    this.props.dispatch({
      type: 'agsmap/propictureChangeState',
      payload: true,
    });
  }

  leaveChange() {
    this.props.dispatch({
      type: 'agsmap/propictureChangeState',
      payload: false,
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: '10px', top: '100px' }}>
        <Tooltip placement="right" title="项目一张图">
          <a
            className={styles.btn}
            onClick={this.prolistvisble}
            onMouseEnter={this.enterChange}
            onMouseLeave={this.leaveChange}
          >
            <img
              src={
                this.props.agsmap.propicturechange
                  ? ProjectpictureIcon
                  : ProjectpictureIcons
              }
              alt=""
              className={styles.btnImg}
            />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(Projectpicture);
