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

const makeSelectUserinfo = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.userinfo,
  );

const makeSelectComments = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.comments,
  );

const makeSelectError = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.error,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectProjectPreviewDomain,
    substate => substate.success,
  );

export {
  makeSelectProjectPreview,
  selectProjectPreviewDomain,
  makeSelectProject,
  makeSelectUserinfo,
  makeSelectComments,
  makeSelectError,
  makeSelectSuccess,
};
