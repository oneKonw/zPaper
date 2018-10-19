import React, { Component } from 'react';
import { Card } from 'antd';
import styles from './MapThumbnail.css';

const { Meta } = Card;

class MapThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: 10,
    };
  }
  // 返回地图缩略图组
  render() {
    const cardList = [];
    if (this.state.cardNum != null) {
      for (let i = 0; i < this.state.cardNum; i += 1) {
        cardList.push(
          <Card
            key={i}
            hoverable
            style={{
              width: '340px',
              margin: '10px',
              overflow: 'scrollY',
            }}
            cover={<img alt="examplw" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          >
            <Meta
              title="城市名"
              description="城市名一般很长可以这样分行"
            />
          </Card>,
        );
      }
    }
    return (
      <div className={styles.cardGroup}>
        {cardList}
      </div>

    );
  }
}

export default MapThumbnail;
