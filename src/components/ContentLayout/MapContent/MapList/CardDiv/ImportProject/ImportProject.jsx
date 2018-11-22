import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip } from 'antd';

import styles from '../CardDiv.css';

class ImportProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '方案导入',
    };
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>{this.state.projectName}</p>
        <div className={styles.txtImportPro}>+</div>
      </div>
    );
  }
}

export default ImportProject;
