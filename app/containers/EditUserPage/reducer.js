/*
 *
 * EditUserPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  LOAD_USER_INFO_FAILURE,
  LOAD_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  userinfo: null,
};

/* eslint-disable default-case, no-param-reassign */
const editUserPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_USER_INFO_FAILURE:
      case UPDATE_USER_INFO_FAILURE:
      case UNFOLLOW_USER_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_USER_INFO_SUCCESS:
      case UPDATE_USER_INFO_SUCCESS:
      case UNFOLLOW_USER_SUCCESS:
        draft.userinfo = action.userinfo;
        break;
      default:
        return draft;
    }
  });

export default editUserPageReducer;
