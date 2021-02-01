import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vlatStats state domain
 */

const selectVlatStatsDomain = state => state.vlatStats || initialState;

/**
 * Default selector used by VlatStats
 */

const makeSelectVlatStats = () =>
  createSelector(
    selectVlatStatsDomain,
    substate => substate,
  );

const makeSelectInitialAssessmentStats = () =>
  createSelector(
    selectVlatStatsDomain,
    substate => substate.initialAssessmentStats,
  );

const makeSelectPostAssessmentStats = () =>
  createSelector(
    selectVlatStatsDomain,
    substate => substate.postAssessmentStats,
  );

export {
  makeSelectVlatStats,
  selectVlatStatsDomain,
  makeSelectInitialAssessmentStats,
  makeSelectPostAssessmentStats,
};
