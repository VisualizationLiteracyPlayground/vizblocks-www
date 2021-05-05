/*
 *
 * AccountSetting reducer
 *
 */
import produce from 'immer';

import { DEFAULT_ACTION, UPDATE_FAILURE, UPDATE_SUCCESS } from './constants';

export const initialState = {
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const accountSettingReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case UPDATE_FAILURE:
        draft.error = action.error;
        break;
      case UPDATE_SUCCESS:
        draft.success = action.success;
        break;
      default:
        return draft;
    }
  });

export default accountSettingReducer;
