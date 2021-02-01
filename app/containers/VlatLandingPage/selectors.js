import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vlatLandingPage state domain
 */

const selectVlatLandingPageDomain = state =>
  state.vlatLandingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VlatLandingPage
 */

const makeSelectVlatLandingPage = () =>
  createSelector(
    selectVlatLandingPageDomain,
    substate => substate,
  );

export default makeSelectVlatLandingPage;
export { selectVlatLandingPageDomain };
