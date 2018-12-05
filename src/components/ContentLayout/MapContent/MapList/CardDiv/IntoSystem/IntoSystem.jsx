import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from '../CardDiv.css';
import imgProject from '../../../../../../assets/recent-project.png';

class IntoSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '直达城市设计成果体系',
    };

    this.cardClick = this.cardClick.bind(this);
  }

  cardClick() {
    this.props.dispatch({
      type: 'agsOperate/changeStateContent',
      payload: {
        flagsContent: !this.props.agsOperate.flagsContent,
        flagToolbar: !this.props.agsOperate.flagToolbar,
      },
    });
  }

  // 首页
  render() {
    return (
      <div className={styles.divIntoSys}>
        <div className={styles.divMaskIntoSys} >
          <Button
            ghost
            size={'large'}
            className={styles.btnInto}
            onClick={this.cardClick}
          >直达城市设计成果体系</Button>
        </div>
        <div className={styles.divIntoSysBtn}>
          <p className={styles.pTxt}>{this.state.projectName}</p>
          <img
            className={styles.imgProject}
            src={imgProject} alt="项目图片"
          />
        </div>
      </div>
    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(IntoSystem);
