/*
 *
 * SignInPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_SUCCESS,
} from './constants';

export const initialState = { error: false };

/* eslint-disable default-case, no-param-reassign, consistent-return */
const signInPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case USER_SIGNIN_FAILURE:
        draft.error = action.error;
        break;
      case USER_SIGNIN_SUCCESS:
        draft.error = false;
        break;
      default:
        return draft;
    }
  });

export default signInPageReducer;
