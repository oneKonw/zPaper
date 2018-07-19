import React from 'react';
import { Tooltip } from 'antd';
import styles from './WidgetButtons.css';
import ControlanalysisIcon from '../../assets/slider/控高分析01.png';

class Controlanalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: '10px', top: '220px' }}>
        <Tooltip placement="right" title="控高分析">
          <a className={styles.btn}>
            <img src={ControlanalysisIcon} alt="" className={styles.btnImg} />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default Controlanalysis;
