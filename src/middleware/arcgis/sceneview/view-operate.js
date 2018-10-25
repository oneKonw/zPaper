import React from 'react';
import ReactDOM from 'react-dom';


import {
  VIEW_GOTO,
} from '../../../constants/action-types';
import env from '../../../utils/env';

function viewOperate(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return store => next => action => {
    switch (action.type) {
      case VIEW_GOTO: {
        console.log('地图操作');
        break;
      }
      default: {
        next(action);
        break;
      }
    }

    return Promise.resolve();
  };
}

export { viewOperate };

