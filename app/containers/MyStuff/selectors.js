import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the myStuff state domain
 */

const selectMyStuffDomain = state => state.myStuff || initialState;

/**
 * Default selector used by MyStuff
 */

const makeSelectMyStuff = () =>
  createSelector(
    selectMyStuffDomain,
    substate => substate,
  );

const makeSelectProjects = () =>
  createSelector(
    selectMyStuffDomain,
    substate => substate.projects,
  );

const makeSelectError = () =>
  createSelector(
    selectMyStuffDomain,
    substate => substate.error,
  );

export {
  makeSelectMyStuff,
  selectMyStuffDomain,
  makeSelectProjects,
  makeSelectError,
};
