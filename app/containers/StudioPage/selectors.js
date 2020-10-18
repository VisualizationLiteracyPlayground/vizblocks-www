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

const makeSelectUserProjects = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate.userProjects,
  );

const makeSelectSubfolderProjects = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate.subfolderProjects,
  );

const makeSelectComments = () =>
  createSelector(
    selectStudioPageDomain,
    substate => substate.comments,
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
  makeSelectUserProjects,
  makeSelectSubfolderProjects,
  makeSelectComments,
  makeSelectError,
};
