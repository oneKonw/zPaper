import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './BusLineResult.css';

const Panel = Collapse.Panel;

function buildLineHeader(names) {
  const headers = [];

  let index = 0;
  for (const name of names) {
    if (headers.length > 0) {
      headers.push(<span key={`line-header-${index}`}>&nbsp;&gt;&nbsp;</span>);
      index += 1;
    }

    let hasIcon = false;
    const iconStyles = {};
    if (name.indexOf('路') > -1 || name.indexOf('巴士') > -1) {
      hasIcon = true;
      iconStyles.width = '14px';
      iconStyles.height = '16px';
      iconStyles.backgroundPosition = '-148px -183px';
    } else if (name.indexOf('地铁') > -1) {
      hasIcon = true;
      iconStyles.width = '12px';
      iconStyles.height = '16px';
      iconStyles.backgroundPosition = '-220px -184px';
    }

    headers.push(
      <span key={`line-header-${index}`}>
        {hasIcon ? (
          <i className={styles.lineStationIcon} style={iconStyles} />
        ) : null}
        <span>{name}</span>
      </span>,
    );
    index += 1;
  }

  return headers;
}

function buildLineDescription(line) {
  const huanchengCount = line.lineName.split('|').filter((n) => n.trim() !== '')
    .length;
  const huancheng =
    huanchengCount > 1 ? `换乘 ${huanchengCount - 1} 次` : '不换乘';

  const distance = line.segments.reduce((prev, curr) => {
    const segDistance = curr.segmentLine.reduce((pprev, ccurr) => {
      return pprev + ccurr.segmentDistance;
    }, 0);

    return prev + segDistance;
  }, 0);

  return <span>{`${huancheng}/ 约 ${(distance / 1000).toFixed(2)} 公里`}</span>;
}

function buildLineTime(line) {
  const timeToUse = line.segments.reduce((prev, curr) => {
    const segTime = curr.segmentLine.reduce((pprev, ccurr) => {
      let segTotal = ccurr.segmentTime;

      if (ccurr.segmentTransferTime) {
        segTotal += ccurr.segmentTransferTime;
      }
      return pprev + segTotal;
    }, 0);

    return prev + segTime;
  }, 0);

  return <span>{`约 ${timeToUse} 分钟`}</span>;
}

class BusLineResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleSwitchLine = ::this.handleSwitchLine;
    this.highlightSegment = ::this.highlightSegment;
  }

  handleSwitchLine(key) {
    if (key) {
      const index = key.replace('busline-', '');
      this.props.dispatch({ type: 'search/drawBusLine', payload: index });
    }
  }

  highlightSegment(index) {
    this.props.dispatch({ type: 'search/highlightSegment', payload: index });
  }

  renderWalkSegment(segment, index) {
    const { stationStart, stationEnd } = segment;
    const start = stationStart.uuid ? stationStart.name : '起点';
    const end = stationEnd.uuid ? stationEnd.name : '终点';

    return (
      <div className={styles.lineDetailWrap} key={`linedetail-${index}`}>
        <span className={styles.lineDetailIcon}>
          <i
            className={styles.segIcon}
            style={{
              height: '16px',
              width: '9px',
              backgroundPosition: '-242px -184px',
            }}
          />
        </span>
        <span className={styles.lineDetailContent}>
          <span
            className={styles.lineDetailSegment}
            onMouseDown={() => this.highlightSegment(index)}
          >
            <span>从</span>
            <strong>&nbsp;{`${start}`}&nbsp;</strong>
            <span>步行至</span>
            <strong>&nbsp;{`${end}`}&nbsp;</strong>
          </span>
        </span>
      </div>
    );
  }

  renderMetroSegment(segment, index, name) {
    const { stationStart, stationEnd } = segment;

    return (
      <div className={styles.lineDetailWrap} key={`linedetail-${index}`}>
        <span className={styles.lineDetailIcon}>
          <i
            className={styles.segIcon}
            style={{
              height: '16px',
              width: '12px',
              backgroundPosition: '-220px -184px',
            }}
          />
        </span>
        <span className={styles.lineDetailContent}>
          <span
            className={styles.lineDetailSegment}
            onMouseDown={() => this.highlightSegment(index)}
          >
            <span>从</span>
            <strong>&nbsp;{`${stationStart.name}`}&nbsp;</strong>
            <span>上车, 乘坐</span>
            <strong style={{ color: 'orangered' }}>
              &nbsp;{`${name}`}&nbsp;
            </strong>
            <span>至</span>
            <strong>&nbsp;{`${stationEnd.name}`}&nbsp;</strong>
            <span>下车</span>
          </span>
        </span>
      </div>
    );
  }

  renderBusSegment(segment, index, name) {
    const { stationStart, stationEnd } = segment;

    return (
      <div className={styles.lineDetailWrap} key={`linedetail-${index}`}>
        <span className={styles.lineDetailIcon}>
          <i
            className={styles.segIcon}
            style={{
              height: '16px',
              width: '14px',
              backgroundPosition: '-148px -183px',
            }}
          />
        </span>
        <span className={styles.lineDetailContent}>
          <span
            className={styles.lineDetailSegment}
            onMouseDown={() => this.highlightSegment(index)}
          >
            <span>从</span>
            <strong>&nbsp;{`${stationStart.name}`}&nbsp;</strong>
            <span>上车, 乘坐</span>
            <strong style={{ color: 'orangered' }}>
              &nbsp;{`${name}`}&nbsp;
            </strong>
            <span>至</span>
            <strong>&nbsp;{`${stationEnd.name}`}&nbsp;</strong>
            <span>下车</span>
          </span>
        </span>
      </div>
    );
  }

  renderLineDetails(line) {
    const { lineName, segments } = line;
    const lineNames = lineName.split('|');
    const details = [];

    // start
    details.push(
      <div className={styles.lineDetailWrap} key="linedetail-start">
        <span className={styles.lineDetailIcon}>
          <span
            className={styles.startEndIcon}
            style={{ borderColor: '#81DE7F' }}
          />
        </span>
        <span className={styles.lineDetailContent}>起点</span>
      </div>,
    );

    let lineNameIndex = 0;
    segments.forEach((segment, index) => {
      const { segmentType } = segment;
      switch (segmentType) {
        case 1: {
          details.push(this.renderWalkSegment(segment, index));
          break;
        }
        case 2: {
          details.push(
            this.renderBusSegment(segment, index, lineNames[lineNameIndex]),
          );
          lineNameIndex += 1;
          break;
        }
        case 3: {
          details.push(
            this.renderMetroSegment(segment, index, lineNames[lineNameIndex]),
          );
          lineNameIndex += 1;
          break;
        }
        case 4: {
          break;
        }
        default:
          break;
      }
    });

    // end
    details.push(
      <div className={styles.lineDetailWrap} key="linedetail-end">
        <span className={styles.lineDetailIcon}>
          <span
            className={styles.startEndIcon}
            style={{ borderColor: '#FF9292' }}
          />
        </span>
        <span className={styles.lineDetailContent}>终点</span>
      </div>,
    );

    return <div>{details}</div>;
  }

  renderLines() {
    if (this.props.search.lines) {
      return this.props.search.lines.map((l, idx) => {
        const names = l.lineName.split('|').filter((n) => n.trim() !== '');

        return (
          <Panel
            key={`busline-${idx}`}
            showArrow={false}
            header={
              <div className={styles.headerWrap}>
                <div className={styles.lineSubject}>
                  {buildLineHeader(names)}
                </div>
                <div className={styles.lineDesc}>
                  {buildLineDescription(l)}
                  {buildLineTime(l)}
                </div>
              </div>
            }
          >
            {this.renderLineDetails(l)}
          </Panel>
        );
      });
    }

    return [];
  }

  render() {
    return (
      <div className={styles.wrap}>
        <Scrollbars style={{ height: 400 }}>
          <Collapse accordion onChange={this.handleSwitchLine}>
            {this.renderLines()}
          </Collapse>
        </Scrollbars>
      </div>
    );
  }
}

export default connect(({ search }) => {
  return {
    search,
  };
})(BusLineResult);
