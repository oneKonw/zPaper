import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './IntoSystem.css';

import {
  VIEW_GOTO,
} from '../../../../constants/action-types';

class IntoSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: 8,
    };

    this.cardClick = this.cardClick.bind(this);
  }

  cardClick() {
    this.props.dispatch({
      type: 'agsOperate/changeStateContent',
      payload: !this.props.agsOperate.flagsContent,
      // type: 'agsOperate/cardClick',
      // payload: VIEW_GOTO,
    });
  }

  // 首页
  render() {
    return (
      <div className={styles.topDiv}>
        <div className={styles.divBgClr} />
        <Button
          ghost
          size={'large'}
          className={styles.btnInto}
          onClick={this.cardClick}
        >直达城市设计成果体系</Button>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(IntoSystem);
