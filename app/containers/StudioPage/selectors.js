import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the studioPage state domain
 */

const selectStudioPageDomain = state => state.studioPage || initialState;

/**
 * Default selector used by StudioPage
 */

const makeSelectStudioPage = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate,
  );

const makeSelectStudio = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate.studio,
  );

const makeSelectError = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate.error,
  );

export {
  makeSelectStudioPage,
  selectStudioPageDomain,
  makeSelectStudio,
  makeSelectError,
};
