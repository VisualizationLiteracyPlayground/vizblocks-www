/*
 *
 * VlatQuizPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  LOAD_QUIZ_FAILURE,
  LOAD_QUIZ_SUCCESS,
  SUBMIT_QUIZ_FAILURE,
  SET_SUCCESS,
} from './constants';

export const initialState = {
  error: false,
  success: false,
  quiz: null,
};

/* eslint-disable default-case, no-param-reassign */
const vlatQuizPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_QUIZ_FAILURE:
      case SUBMIT_QUIZ_FAILURE:
        draft.error = action.error;
        break;
      case LOAD_QUIZ_SUCCESS:
        draft.quiz = action.quiz;
        break;
      case SET_SUCCESS:
        draft.success = action.success;
        break;
      default:
        return draft;
    }
  });

export default vlatQuizPageReducer;
