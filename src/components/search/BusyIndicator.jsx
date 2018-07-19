import React from 'react';

import busyImg from '../../assets/timg.gif';
import styles from './BusyIndicator.css';

const BusyIndicator = () => {
  return (
    <div className={styles.wrap}>
      <img alt="" src={busyImg} className={styles.loadingimg} />
      <span className={styles.text}>正在规划公交换乘路径... ...</span>
    </div>
  );
};

export default BusyIndicator;
