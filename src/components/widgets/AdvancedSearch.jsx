import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './AdvancedSearch.css';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{ width: 300 }}>
        <div className={styles.titleBar}>
          <h2>图层检索</h2>
          <a onClick={this.props.onClose}>关闭</a>
        </div>
        <div className={styles.content}>
          <section>
            <header>基础海图</header>
            <Button icon="code-o" onClick={() => this.props.onQuickSearch('25300')}>海军图</Button>
            <Button icon="api" onClick={() => this.props.onQuickSearch('25500')}>英版图</Button>
            <Button icon="link" onClick={() => this.props.onQuickSearch('25900')}>航线图</Button>
            <Button icon="share-alt" onClick={() => this.props.onQuickSearch('25200')}>港口航道图</Button>
          </section>
          <section>
            <header>图书期刊</header>
            <Button icon="info-circle-o" onClick={() => this.props.onQuickSearch('36100')}>航行指南(美版)</Button>
          </section>
          <section>
            <header>海洋水文</header>
            <Button icon="dot-chart" onClick={() => this.props.onQuickSearch('55100')}>潮汐</Button>
          </section>
          <section>
            <header>AIS</header>
            <Button icon="global" onClick={() => this.props.onQuickSearch('ais')}>AIS信息</Button>
          </section>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
