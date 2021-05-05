/* eslint-disable consistent-return */
/*
 *
 * ProjectPreview reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  LOAD_PROJECT_DETAILS_FAILURE,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOAD_USER_INFO_SUCCESS,
  LOAD_PROJECT_COMMENTS_FAILURE,
  LOAD_PROJECT_COMMENTS_SUCCESS,
  ADD_PROJECT_COMMENT_FAILURE,
  USER_TOGGLE_LIKE_FAILURE,
  USER_TOGGLE_LIKE_SUCCESS,
  USER_TOGGLE_BOOKMARK_FAILURE,
  USER_TOGGLE_BOOKMARK_SUCCESS,
  UPDATE_PROJECT_INFORMATION_FAILURE,
  UPDATE_PROJECT_INFORMATION_SUCCESS,
  UPDATE_PROJECT_COMMENT_PERMISSIONS_FAILURE,
  SET_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  success: false,
  project: false,
  userinfo: false,
  comments: [],
};

/* eslint-disable default-case, no-param-reassign */
const projectPreviewReducer = (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_SUCCESS:
        draft.success = action.success;
        break;
      case LOAD_PROJECT_DETAILS_FAILURE:
      case LOAD_USER_INFO_FAILURE:
      case LOAD_PROJECT_COMMENTS_FAILURE:
      case ADD_PROJECT_COMMENT_FAILURE:
      case USER_TOGGLE_LIKE_FAILURE:
      case USER_TOGGLE_BOOKMARK_FAILURE:
      case UPDATE_PROJECT_INFORMATION_FAILURE:
      case UPDATE_PROJECT_COMMENT_PERMISSIONS_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_PROJECT_DETAILS_SUCCESS:
      case USER_TOGGLE_LIKE_SUCCESS:
      case USER_TOGGLE_BOOKMARK_SUCCESS:
      case UPDATE_PROJECT_INFORMATION_SUCCESS:
        draft.project = action.project;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.userinfo = action.userinfo;
        break;
      case LOAD_PROJECT_COMMENTS_SUCCESS:
        draft.comments = action.comments;
        break;
      default:
        return draft;
    }
  });

export default projectPreviewReducer;
