import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the interactiveTutorialPage state domain
 */

const selectInteractiveTutorialPageDomain = state =>
  state.interactiveTutorialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by InteractiveTutorialPage
 */

const makeSelectInteractiveTutorialPage = () =>
  createSelector(
    selectInteractiveTutorialPageDomain,
    substate => substate,
  );

export default makeSelectInteractiveTutorialPage;
export { selectInteractiveTutorialPageDomain };
