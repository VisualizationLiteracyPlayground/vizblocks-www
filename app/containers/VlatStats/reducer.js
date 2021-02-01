/* eslint-disable consistent-return */
/*
 *
 * VlatStats reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  LOAD_INITIAL_ASSESSMENT_STATS_SUCCESS,
  LOAD_POST_ASSESSMENT_STATS_SUCCESS,
} from './constants';

export const initialState = {
  initialAssessmentStats: null,
  postAssessmentStats: null,
};

/* eslint-disable default-case, no-param-reassign */
const vlatStatsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_INITIAL_ASSESSMENT_STATS_SUCCESS:
        draft.initialAssessmentStats = action.initialAssessmentStats;
        break;
      case LOAD_POST_ASSESSMENT_STATS_SUCCESS:
        draft.postAssessmentStats = action.postAssessmentStats;
        break;
      default:
        return draft;
    }
  });

export default vlatStatsReducer;
