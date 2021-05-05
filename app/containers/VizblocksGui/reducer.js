/*
 *
 * VizblocksGui reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  REMIX_PROJECT_FAILURE,
  REMIX_PROJECT_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  remixResponse: null,
};

/* eslint-disable default-case, no-param-reassign */
const vizblocksGuiReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REMIX_PROJECT_FAILURE:
        draft.error = action.error;
        break;
      case REMIX_PROJECT_SUCCESS:
        draft.remixResponse = action.remixResponse;
        break;
      default:
        return draft;
    }
  });

export default vizblocksGuiReducer;
