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
  UPDATE_STUDIO_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  studio: null,
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
        draft.error = action.error;
        break;
      case CREATE_STUDIO_SUCCESS:
      case LOAD_STUDIO_SUCCESS:
      case UPDATE_STUDIO_SUCCESS:
        draft.studio = action.studio;
        break;
      default:
        return draft;
    }
  });

export default studioPageReducer;
