/*
 *
 * VlatStats actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_ASSESSMENT_STATS,
  LOAD_INITIAL_ASSESSMENT_STATS_SUCCESS,
  LOAD_POST_ASSESSMENT_STATS_SUCCESS,
  LOAD_TABLE_STATS,
  LOAD_TABLE_STATS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAssessmentStats(testType) {
  return {
    type: LOAD_ASSESSMENT_STATS,
    testType,
  };
}

export function loadInitialAssessmentStatsSuccess(initialAssessmentStats) {
  return {
    type: LOAD_INITIAL_ASSESSMENT_STATS_SUCCESS,
    initialAssessmentStats,
  };
}

export function loadPostAssessmentStatsSuccess(postAssessmentStats) {
  return {
    type: LOAD_POST_ASSESSMENT_STATS_SUCCESS,
    postAssessmentStats,
  };
}

export function loadTableStats() {
  return {
    type: LOAD_TABLE_STATS,
  };
}

export function loadTableStatsSuccess(allUserStats) {
  return {
    type: LOAD_TABLE_STATS_SUCCESS,
    allUserStats,
  };
}
