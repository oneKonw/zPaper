import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Button, Tooltip } from 'antd';

import CircuitTypeSelector from './CircuitTypeSelector';
import TerminalSelector from './TerminalSelector';
import RouteLocationSelector from './RouteLocationSelector';
import BusLineResult from './BusLineResult';
import BusyIndicator from './BusyIndicator';
import ErrorIndicator from './ErrorIndicator';

import { MODE_LOCATION, MODE_DIRECTION } from '../../constants/search';
import styles from './GeoSearch.css';

class GeoSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: MODE_LOCATION,
    };
    this.enterDirectionMode = ::this.enterDirectionMode;
    this.leaveDirectionMode = ::this.leaveDirectionMode;
    this.onDirectionModeChange = ::this.onDirectionModeChange;
    this.handleStartInput = ::this.handleStartInput;
    this.handleEndInput = ::this.handleEndInput;
    this.handleOptSelect = ::this.handleOptSelect;
  }

  onDirectionModeChange(dirmode) {
    this.props.dispatch({ type: 'search/updateDirMode', payload: dirmode });
  }

  handleStartInput(text) {
    this.props.dispatch({
      type: 'search/searchsolr',
      payload: {
        text,
        ltdir: '起点',
        start: 0,
      },
    });
  }

  handleEndInput(text) {
    this.props.dispatch({
      type: 'search/searchsolr',
      payload: {
        text,
        ltdir: '终点',
        start: 0,
      },
    });
  }

  handleOptSelect(opt) {
    this.props.dispatch({
      type: 'search/selectOpt',
      payload: opt,
    });
  }

  enterDirectionMode() {
    this.setState({ mode: MODE_DIRECTION });
  }

  leaveDirectionMode() {
    this.setState({ mode: MODE_LOCATION });
    this.props.dispatch({ type: 'search/clearSearch' });
  }

  renderContent() {
    if (this.state.mode === MODE_LOCATION) {
      return (
        <Input className={styles.input} placeholder="搜地点、查公交、找路线" />
      );
    }

    return (
      <CircuitTypeSelector
        className={styles.dirselector}
        onChange={this.onDirectionModeChange}
      />
    );
  }

  renderDirButton() {
    if (this.state.mode === MODE_LOCATION) {
      return (
        <Tooltip title="路线">
          <div className={styles.dirbtnwrap}>
            <span className={styles.dirbtnstub} />
            <Button
              icon="swap"
              className={styles.dirbtn}
              onClick={this.enterDirectionMode}
            />
          </div>
        </Tooltip>
      );
    }

    return (
      <Tooltip title="关闭路线">
        <div className={styles.dirbtnwrap}>
          <span className={styles.dirbtnstub} />
          <Button
            icon="close"
            className={styles.dirclosebtn}
            onClick={this.leaveDirectionMode}
          />
        </div>
      </Tooltip>
    );
  }

  renderRouteBox() {
    if (this.state.mode === MODE_DIRECTION) {
      return (
        <TerminalSelector
          onStartInput={this.handleStartInput}
          onEndInput={this.handleEndInput}
        />
      );
    }

    return null;
  }

  renderLocationOptSelector() {
    if (this.props.search.diropts) {
      return (
        <RouteLocationSelector
          title={`${this.props.search.dirlttext} - ${
            this.props.search.diropttext
          }`}
          onSelect={this.handleOptSelect}
        />
      );
    }

    return null;
  }

  renderBusyIndicator() {
    if (this.props.search.loading) {
      return <BusyIndicator />;
    }

    return null;
  }

  renderResults() {
    if (this.props.search.lines) {
      return <BusLineResult />;
    }

    return null;
  }

  renderErrorMsg() {
    if (this.props.search.hasError) {
      return <ErrorIndicator msg={this.props.search.errMsg} />;
    }

    return null;
  }

  render() {
    return (
      <div className={styles.leftPanel}>
        <div className={styles.wrap}>
          {this.renderContent()}
          {this.renderDirButton()}
          <Tooltip title="搜索">
            <Button type="primary" icon="search" className={styles.searchbtn} />
          </Tooltip>
        </div>
        {this.renderRouteBox()}
        {this.renderLocationOptSelector()}
        {this.renderBusyIndicator()}
        {this.renderResults()}
        {this.renderErrorMsg()}
      </div>
    );
  }
}

GeoSearch.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(({ search }) => {
  return {
    search,
  };
})(GeoSearch);
