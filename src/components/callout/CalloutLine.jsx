import React, { Component } from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

class PopupLine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openSlt = this.openSlt.bind(this);
    this.closeSlt = this.closeSlt.bind(this);
  }

  openSlt() {
    console.log(this.props.view);
    this.props.view.popup.close();
  }

  closeSlt() {
    console.log(this.props.view);
    this.props.view.popup.close();
    this.props.view.map.remove(this.props.draw);
    this.props.view.map.remove(this.props.result);
  }

  render() {
    return (
      <div>
        <p
          style={{
            height: '50px',
            padding: '0',
            margin: '0',
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '70px',
            borderBottom: '1px solid #C8C8C8',
            marginBottom: '10px',
          }}
        >
          线标注
        </p>
        <p style={{ display: 'flex' }}>
          <span
            style={{
              flex: 'auto',
              display: 'flex',
              width: '60px',
              height: '30px',
              textAlign: 'center',
              lineHeight: '30px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            名称
          </span>
          <Input
            placeholder="点标注"
            style={{ flex: 'auto', borderRadius: '0px' }}
          />
        </p>
        <p style={{ display: 'flex' }}>
          <span
            style={{
              flex: 'auto',
              display: 'flex',
              width: '60px',
              height: '30px',
              textAlign: 'center',
              lineHeight: '30px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            备注
          </span>
          <TextArea
            placeholder="您最多可以输入200个字"
            style={{ flex: 'auto', borderRadius: '0px' }}
          />
        </p>
        <p
          style={{
            textAlign: 'center',
            padding: '0',
            margin: '0',
          }}
        >
          <Button
            type="primary"
            onClick={this.openSlt}
            style={{ marginRight: '20px', borderRadius: '0px' }}
          >
            保存
          </Button>
          <Button onClick={this.closeSlt} style={{ borderRadius: '0px' }}>
            删除
          </Button>
        </p>
        <p
          style={{
            height: '20px',
          }}
        />
      </div>
    );
  }
}

export default PopupLine;
