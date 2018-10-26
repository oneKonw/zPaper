import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import styles from './MapThumbnail.css';

import {
  VIEW_GOTO,
} from '../../../constants/action-types';

const { Meta } = Card;

class MapThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: 8,
    };

    this.cardClick = this.cardClick.bind(this);
  }

  cardClick() {
    this.props.dispatch({
      type: 'agsOperate/cardClick',
      payload: VIEW_GOTO,
    });
  }

  // 返回地图缩略图组
  render() {
    const cardList = [];
    if (this.state.cardNum != null) {
      for (let i = 0; i < this.state.cardNum; i += 1) {
        cardList.push(
          <Card
            onClick={this.cardClick}
            key={i}
            hoverable
            style={{
              width: '300px',
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

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(MapThumbnail);
