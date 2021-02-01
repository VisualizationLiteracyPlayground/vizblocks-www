/*
 *
 * VlatCategoryPage reducer
 *
 */
import produce from 'immer';

import { DEFAULT_ACTION, LOAD_USER_VLAT_SCORE_SUCCESS } from './constants';

export const initialState = {
  vlatScore: null,
};

/* eslint-disable default-case, no-param-reassign */
const vlatCategoryPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_USER_VLAT_SCORE_SUCCESS:
        draft.vlatScore = action.vlatScore;
        break;
      default:
        return draft;
    }
  });

export default vlatCategoryPageReducer;
