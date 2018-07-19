import React from 'react';
import { Tooltip } from 'antd';
import styles from './WidgetButtons.css';
import SchemecomparisonIcon from '../../assets/slider/方案对比01.png';

class Schemecomparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: '10px', top: '280px' }}>
        <Tooltip placement="right" title="方案对比">
          <a
            className={styles.btn}
            onClick={() => {
              window.open('splitScreen.html');
            }}
          >
            <img src={SchemecomparisonIcon} alt="" className={styles.btnImg} />
          </a>
        </Tooltip>
      </div>
    );
  }
}

export default Schemecomparison;
