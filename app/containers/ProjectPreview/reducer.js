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
} from './constants';

export const initialState = {
  error: false,
  project: false,
};

/* eslint-disable default-case, no-param-reassign */
const projectPreviewReducer = (state = initialState, action) =>
  // eslint-disable-next-line no-unused-vars
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_PROJECT_DETAILS_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_PROJECT_DETAILS_SUCCESS:
        draft.project = action.project;
        break;
      default:
        return draft;
    }
  });

export default projectPreviewReducer;
