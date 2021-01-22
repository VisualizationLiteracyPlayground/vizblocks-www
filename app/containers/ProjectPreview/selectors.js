import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the projectPreview state domain
 */

const selectProjectPreviewDomain = state =>
  state.projectPreview || initialState;

const makeSelectProjectPreview = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate,
  );

const makeSelectProject = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.project,
  );

const makeSelectError = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.error,
  );

export {
  makeSelectProjectPreview,
  selectProjectPreviewDomain,
  makeSelectProject,
  makeSelectError,
};
