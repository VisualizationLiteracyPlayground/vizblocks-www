import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the creditsPage state domain
 */

const selectCreditsPageDomain = state => state.creditsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreditsPage
 */

const makeSelectCreditsPage = () =>
  createSelector(
    selectCreditsPageDomain,
    substate => substate,
  );

export default makeSelectCreditsPage;
export { selectCreditsPageDomain };
