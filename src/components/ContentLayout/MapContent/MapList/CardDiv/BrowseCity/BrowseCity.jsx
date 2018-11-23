import React, { Component } from 'react';

import styles from '../CardDiv.css';
import imgProject from '../../../../../../assets/recent-project.png';

class BrowseCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '三维城市浏览',
    };
  }

  // 首页
  render() {
    return (
      <div className={styles.divTop}>
        <div className={styles.divBgClr} />
        <p className={styles.pTxt}>{this.state.projectName}</p>
        <img
          className={styles.imgProject}
          src={imgProject} alt="项目图片"
        />
      </div>
    );
  }
}

export default BrowseCity;
