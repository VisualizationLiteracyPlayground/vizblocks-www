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
  LOAD_DELETED_SUCCESS,
  DELETE_PROJECT_FAILURE,
  UNDELETE_PROJECT_FAILURE,
  UPDATE_PROJECTS_SUCCESS,
  UPDATE_DELETED_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  projects: [],
  deletedProjects: [],
};

/* eslint-disable default-case, no-param-reassign */
const myStuffReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROJECTS_FAILURE:
      case DELETE_PROJECT_FAILURE:
      case UNDELETE_PROJECT_FAILURE:
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
      default:
        return draft;
    }
  });

export default myStuffReducer;
