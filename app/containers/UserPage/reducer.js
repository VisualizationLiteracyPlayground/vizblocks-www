/*
 *
 * UserPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  LOAD_PROFILE_INFO_FAILURE,
  LOAD_PROFILE_INFO_SUCCESS,
  LOAD_USER_FOLLOWING_FAILURE,
  LOAD_USER_FOLLOWING_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  profileinfo: null,
  userFollowing: [],
};

/* eslint-disable default-case, no-param-reassign */
const userPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROFILE_INFO_FAILURE:
      case LOAD_USER_FOLLOWING_FAILURE:
      case FOLLOW_USER_FAILURE:
      case UNFOLLOW_USER_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_PROFILE_INFO_SUCCESS:
        draft.profileinfo = action.profileinfo;
        break;
      case LOAD_USER_FOLLOWING_SUCCESS:
      case FOLLOW_USER_SUCCESS:
      case UNFOLLOW_USER_SUCCESS:
        draft.userFollowing = action.userFollowing;
        break;
      default:
        return draft;
    }
  });

export default userPageReducer;
