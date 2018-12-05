import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import styles from './MapThumbnail.css';

import IntoSystem from './CardDiv/IntoSystem/IntoSystem';
import AnalysisSystem from './CardDiv/AnalysisSystem/AnalysisSystem';
import NumCityImport from './CardDiv/NumCityImport/NumCityImport';
import RecentProject from './CardDiv/RecentProject/RecentProject';
import FactorAnalysis from './CardDiv/FactorAnalysis/FactorAnalysis';
import FutureCity from './CardDiv/FutureCity/FutureCity';
import ImportProject from './CardDiv/ImportProject/ImportProject';
import BrowseCity from './CardDiv/BrowseCity/BrowseCity';

import {
  VIEW_GOTO,
} from '../../../../constants/action-types';

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

  render() {
    return (
      <div className={styles.cardGroup}>
        <NumCityImport />
        <IntoSystem />
        <RecentProject />
        <AnalysisSystem />
        <BrowseCity />
        <FactorAnalysis />
        <FutureCity />
        <ImportProject />
      </div>

    );
  }
}

export default connect(({ agsOperate }) => {
  return {
    agsOperate,
  };
})(MapThumbnail);
