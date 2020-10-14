/*
 *
 * StudioPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  CREATE_STUDIO_FAILURE,
  CREATE_STUDIO_SUCCESS,
  LOAD_STUDIO_FAILURE,
  LOAD_STUDIO_SUCCESS,
  UPDATE_STUDIO_PERMISSIONS_FAILURE,
  UPDATE_STUDIO_INFORMATION_FAILURE,
  ADD_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_FAILURE,
  UPDATE_CURATOR_ROLE_FAILURE,
  CREATE_SUBFOLDER_FAILURE,
  UPDATE_SUBFOLDER_NAME_FAILURE,
  ADD_PROJECTS_FAILURE,
  DELETE_SUBFOLDERS_FAILURE,
  DELETE_PROJECTS_FAILURE,
  UPDATE_STUDIO_SUCCESS,
  LOAD_USER_PROJECTS_FAILURE,
  LOAD_USER_PROJECTS_SUCCESS,
  LOAD_SUBFOLDER_PROJECTS_FAILURE,
  LOAD_SUBFOLDER_PROJECTS_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  studio: null,
  userProjects: [],
  subfolderProjects: [],
};

/* eslint-disable no-param-reassign */
const studioPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CREATE_STUDIO_FAILURE:
      case LOAD_STUDIO_FAILURE:
      case UPDATE_STUDIO_PERMISSIONS_FAILURE:
      case UPDATE_STUDIO_INFORMATION_FAILURE:
      case ADD_FOLLOWER_FAILURE:
      case REMOVE_FOLLOWER_FAILURE:
      case UPDATE_CURATOR_ROLE_FAILURE:
      case CREATE_SUBFOLDER_FAILURE:
      case LOAD_USER_PROJECTS_FAILURE:
      case ADD_PROJECTS_FAILURE:
      case LOAD_SUBFOLDER_PROJECTS_FAILURE:
      case DELETE_SUBFOLDERS_FAILURE:
      case DELETE_PROJECTS_FAILURE:
      case UPDATE_SUBFOLDER_NAME_FAILURE:
        draft.error = action.error;
        break;
      case CREATE_STUDIO_SUCCESS:
      case LOAD_STUDIO_SUCCESS:
      case UPDATE_STUDIO_SUCCESS:
        draft.studio = action.studio;
        break;
      case LOAD_USER_PROJECTS_SUCCESS:
        draft.userProjects = action.userProjects;
        break;
      case LOAD_SUBFOLDER_PROJECTS_SUCCESS:
        draft.subfolderProjects = action.subfolderProjects;
        break;
      default:
        return draft;
    }
  });

export default studioPageReducer;
