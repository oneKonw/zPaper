import React from 'react';
import { Tooltip } from 'antd';
import styles from './WidgetButtons.css';
import ProgrammereviewIcon from '../../assets/slider/方案评审01.png';

class Programmereview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: '10px', top: '160px' }}>
        <Tooltip placement="right" title="方案评审">
          <a className={styles.btn}>
            <img src={ProgrammereviewIcon} alt="" className={styles.btnImg} />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default Programmereview;
