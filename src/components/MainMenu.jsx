import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import MenuConst from '../constants/MenuConst';

import styles from './MainMenu.css';

import triSrc from '../assets/slider/jiantou.png';

import basicIcon from '../assets/slider/biaodian.png';
import basicIcon2 from '../assets/slider/biaodian1.png';
// import echartIcon from '../assets/slider/基础地理信息.png';
// import echartIcon2 from '../assets/slider/基础地理信息 选中态.png';
// import bookIcon from '../assets/slider/基础地理信息.png';
// import bookIcon2 from '../assets/slider/基础地理信息 选中态.png';
// import noticeIcon from '../assets/slider/基础地理信息.png';
// import noticeIcon2 from '../assets/slider/基础地理信息 选中态.png';
// import seaIcon from '../assets/slider/基础地理信息.png';
// import seaIcon2 from '../assets/slider/基础地理信息 选中态.png';
// import metIcon from '../assets/slider/基础地理信息.png';
// import metIcon2 from '../assets/slider/基础地理信息 选中态.png';

const MainMenu = ({ onSelect, onUnselect, witchButton, agsmap }) => {
  function appendIconChild(key, selected) {
    const iconStyle = {
      margin: agsmap.siderOpen ? '0 6px' : '0 18px',
    };

    switch (key) {
      case MenuConst.basic:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      case MenuConst.basicChart:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      case MenuConst.book:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      case MenuConst.notice:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      case MenuConst.hydrology:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      case MenuConst.meteorology:
        return (
          <img
            src={selected ? basicIcon2 : basicIcon}
            alt=""
            height="36"
            className={styles.icon}
            style={iconStyle}
          />
        );
      default:
        break;
    }

    return null;
  }

  function generateMenuItems() {
    const items = [];
    Object.keys(MenuConst).forEach((key) => {
      const selected = agsmap.openMenu === MenuConst[key];
      // console.log(selected);
      // console.log(agsmap.openMenu);
      // console.log(MenuConst[key]);
      items.push(
        <div
          title={MenuConst[key]}
          key={key}
          className={selected ? 'menu-item-row selected' : 'menu-item-row'}
          onMouseEnter={() => onSelect(MenuConst[key])}
          onMouseLeave={() => onUnselect()}
          onClick={() => witchButton(MenuConst[key])}
        >
          <img src={triSrc} alt="" className={styles.tri} />
          {appendIconChild(MenuConst[key], selected)}
          {agsmap.siderOpen ? (
            <span className={styles.menuItem}>{MenuConst[key]}</span>
          ) : null}
        </div>,
      );
    });
    return items;
  }

  return (
    <div style={{ marginBottom: '20px', marginTop: '100px', width: '100%' }}>
      {generateMenuItems()}
    </div>
  );
};

MainMenu.propTypes = {
  onSelect: PropTypes.func,
  onUnselect: PropTypes.func,
};

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(MainMenu);
