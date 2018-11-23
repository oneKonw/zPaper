import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './MapProjectList.css';
// import Item from 'antd/lib/list/Item';

const data = [
  '【城市更新】加里宁格勒市中心重建规划',
  '【战略规划】圣拉斐尔地区提升规划',
  '【科技城】底特律中城科技城',
  '【老城更新】吉林市老城区更新改造',
  '【城市设计】安徽省明光市中西城区城市设计',
  '【滨水区设计】黄浦区东岸开放空间贯通设计',
  '【滨水区设计】达令港片区改造提升规划',
  '【居住小区】新加披THE GLADES林阁',
  '【居住小区】上海安亭新阵',
  '【居住小区】新加坡组屋',
];

class MapProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 返回地图缩略图组
  render() {
    const list = [];
    data.map((item) => {
      return list.push(<Button className={styles.btnListItem}>{item}</Button>);
    });
    return (
      <div
        className={styles.divTop}
      >
        {list}
        {/* <List
          className={styles.projectList}
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item}</List.Item>)} */}
        {/* /> */}
      </div>

    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(MapProjectList);
