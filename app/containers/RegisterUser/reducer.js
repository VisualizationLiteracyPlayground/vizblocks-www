/* eslint-disable no-param-reassign */
/*
 *
 * RegisterUser reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from './constants';

export const initialState = { error: false };

const registerUserReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REGISTER_USER_FAILURE:
        draft.error = action.error;
        break;
      case REGISTER_USER_SUCCESS:
        draft.error = false;
        break;
      default:
        return draft;
    }
  });

export default registerUserReducer;
