/*
 *
 * VlatCategoryPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_USER_VLAT_SCORE,
  LOAD_USER_VLAT_SCORE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserVlatScore(userid) {
  return {
    type: LOAD_USER_VLAT_SCORE,
    userid,
  };
}

export function loadUserVlatScoreSuccess(vlatScore) {
  return {
    type: LOAD_USER_VLAT_SCORE_SUCCESS,
    vlatScore,
  };
}
