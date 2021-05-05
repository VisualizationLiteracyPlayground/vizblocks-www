/* eslint-disable consistent-return */
/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';

import { DEFAULT_ACTION, LOAD_FEATURED_SUCCESS } from './constants';

export const initialState = {
  featuredProjects: null,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_FEATURED_SUCCESS:
        draft.featuredProjects = action.featuredProjects;
        break;
      default:
        return draft;
    }
  });

export default homePageReducer;
