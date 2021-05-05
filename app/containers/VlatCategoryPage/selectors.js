import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vlatCategoryPage state domain
 */

const selectVlatCategoryPageDomain = state =>
  state.vlatCategoryPage || initialState;

/**
 * Default selector used by VlatCategoryPage
 */

const makeSelectVlatCategoryPage = () =>
  createSelector(
    selectVlatCategoryPageDomain,
    substate => substate,
  );

const makeSelectVlatScore = () =>
  createSelector(
    selectVlatCategoryPageDomain,
    substate => substate.vlatScore,
  );

export {
  makeSelectVlatCategoryPage,
  selectVlatCategoryPageDomain,
  makeSelectVlatScore,
};
