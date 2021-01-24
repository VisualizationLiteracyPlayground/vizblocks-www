/*
 *
 * MyStuff reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  LOAD_PROJECTS_FAILURE,
  LOAD_PROJECTS_SUCCESS,
  LOAD_BOOKMARKED_PROJECTS_FAILURE,
  LOAD_BOOKMARKED_PROJECTS_SUCCESS,
  LOAD_DELETED_SUCCESS,
  DELETE_PROJECT_FAILURE,
  UNBOOKMARK_PROJECT_FAILURE,
  UNDELETE_PROJECT_FAILURE,
  UPDATE_PROJECTS_SUCCESS,
  UPDATE_BOOKMARKS_SUCCESS,
  UPDATE_DELETED_SUCCESS,
  LOAD_STUDIOS_FAILURE,
  LOAD_STUDIOS_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  projects: [],
  deletedProjects: [],
  bookmarkedProjects: [],
  studios: [],
};

/* eslint-disable no-param-reassign */
const myStuffReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROJECTS_FAILURE:
      case LOAD_BOOKMARKED_PROJECTS_FAILURE:
      case DELETE_PROJECT_FAILURE:
      case UNBOOKMARK_PROJECT_FAILURE:
      case UNDELETE_PROJECT_FAILURE:
      case LOAD_STUDIOS_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_PROJECTS_SUCCESS:
      case UPDATE_PROJECTS_SUCCESS:
        draft.error = false;
        draft.projects = action.projects;
        break;
      case LOAD_DELETED_SUCCESS:
      case UPDATE_DELETED_SUCCESS:
        draft.error = false;
        draft.deletedProjects = action.projects;
        break;
      case LOAD_BOOKMARKED_PROJECTS_SUCCESS:
      case UPDATE_BOOKMARKS_SUCCESS:
        draft.bookmarkedProjects = action.projects;
        break;
      case LOAD_STUDIOS_SUCCESS:
        draft.error = false;
        draft.studios = action.studios;
        break;
      default:
        return draft;
    }
  });

export default myStuffReducer;
