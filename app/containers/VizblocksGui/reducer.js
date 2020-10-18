/*
 *
 * VizblocksGui reducer
 *
 */
import produce from 'immer';

import { DEFAULT_ACTION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const vizblocksGuiReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      default:
        return draft;
    }
  });

export default vizblocksGuiReducer;
