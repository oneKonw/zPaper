import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Input } from 'antd';
import styles from './TagFilter.css';

const Search = Input.Search;
const ButtinGroup = Button.Group;

class TagFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Row className={styles.RowLine}>
          <Col className={styles.tagFirst} span={6}>
            <ButtinGroup>
              <Button>所有</Button>
              <Button>总体</Button>
              <Button>分区</Button>
              <Button>地段</Button>
              <Button>地块</Button>
            </ButtinGroup>
          </Col>
          <Col className={styles.tagSecond} span={6}>
            <ButtinGroup>
              <Button>滨海</Button>
              <Button>山体</Button>
              <Button>历史</Button>
              <Button>湿地</Button>
              <Button>公园</Button>
            </ButtinGroup>
          </Col>
          <Col className={styles.search} span={6} offset={6}>
            <Search
              placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 300 }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
},
)(TagFilter);

