import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip } from 'antd';

import styles from '../CardDiv.css';
import imgProject from '../../../../../../assets/recent-project.png';

class RecentProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: 'xxxxx项目',
    };
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>最近评价的项目--{this.state.projectName}</p>
        <img
          className={styles.imgProject}
          src={imgProject} alt="项目图片"
        />
      </div>
    );
  }
}

export default RecentProject;
