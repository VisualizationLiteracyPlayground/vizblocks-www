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
} from './constants';

export const initialState = {
  error: false,
  projects: [],
};

/* eslint-disable default-case, no-param-reassign */
const myStuffReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROJECTS_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_PROJECTS_SUCCESS:
        draft.error = false;
        draft.projects = action.projects;
        break;
      default:
        return draft;
    }
  });

export default myStuffReducer;
