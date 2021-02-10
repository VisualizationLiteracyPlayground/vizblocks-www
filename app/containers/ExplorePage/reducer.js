/* eslint-disable no-unused-vars */
/*
 *
 * ExplorePage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  SEARCH_PROJECTS_SUCCESS,
  SEARCH_STUDIOS_SUCCESS,
  SEARCH_USERS_SUCCESS,
  SEARCH_FAILURE,
} from './constants';

export const initialState = {
  error: false,
  projects: null,
  studios: null,
  users: null,
};

/* eslint-disable default-case, no-param-reassign */
const explorePageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SEARCH_PROJECTS_SUCCESS:
        draft.projects = action.projects;
        break;
      case SEARCH_STUDIOS_SUCCESS:
        draft.studios = action.studios;
        break;
      case SEARCH_USERS_SUCCESS:
        draft.users = action.users;
        break;
      case SEARCH_FAILURE:
        draft.error = action.error;
        break;
      default:
        return draft;
    }
  });

export default explorePageReducer;
