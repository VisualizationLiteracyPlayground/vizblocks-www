import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the studioPage state domain
 */

const selectStudioPageDomain = state => state.studioPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudioPage
 */

const makeSelectStudioPage = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate,
  );

export default makeSelectStudioPage;
export { selectStudioPageDomain };
