import React from 'react';
import PropTypes from 'prop-types';

import CustomScroller from '../CustomScroller';
import styles from '../BasemapToggle.css';


const Bookmark = ({
  scaleTo,
}) => {
  function generateScaleItems() {
    const items = [];

    items.push(
      <div
        className={styles.text} key="1" onClick={() => scaleTo({
          center: [122.12, 31.25],
          zoom: 9,
        })}
      >
        全球 - 航标
      </div>,
    );

    items.push(
      <div
        className={styles.text} key="2" onClick={() => scaleTo({
          center: [121.62, 31.65],
          zoom: 12,
        })}
      >
        沿海 - 航标
      </div>,
    );

    items.push(
      <div
        className={styles.text} key="3" onClick={() => scaleTo({
          center: [122.12, 31.25],
          zoom: 8,
        })}
      >
        全球 - 锚地
      </div>,
    );

    items.push(
      <div
        className={styles.text} key="4" onClick={() => scaleTo({
          center: [122.12, 31.25],
          zoom: 11,
        })}
      >
        沿海 - 锚地
      </div>,
    );

    items.push(
      <div
        className={styles.text} key="5" onClick={() => scaleTo({
          center: [101.3962, 1.7377],
          zoom: 9,
        })}
      >
        全球 - 航道
      </div>,
    );

    items.push(
      <div
        className={styles.text} key="6" onClick={() => scaleTo({
          center: [121.62, 31.42],
          zoom: 12,
        })}
      >
        沿海 - 航道
      </div>,
    );

    return items;
  }

  return (
    <div style={{ height: '300px', width: '300px', background: '#181D24' }}>
      <CustomScroller className={styles.scroll}>
        {generateScaleItems()}
      </CustomScroller>
    </div>
  );
};

Bookmark.propTypes = {
  scaleTo: PropTypes.func,
};

export default Bookmark;
