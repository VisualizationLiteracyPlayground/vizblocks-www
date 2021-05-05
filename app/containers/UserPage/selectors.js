import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the userPage state domain
 */

const selectUserPageDomain = state => state.userPage || initialState;

/**
 * Default selector used by UserPage
 */

const makeSelectUserPage = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate,
  );

const makeSelectProfileInfo = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.profileinfo,
  );

const makeSelectUserFollowing = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.userFollowing,
  );

const makeSelectError = () =>
  createSelector(
    selectUserPageDomain,
    substate => substate.error,
  );

export {
  makeSelectUserPage,
  selectUserPageDomain,
  makeSelectProfileInfo,
  makeSelectUserFollowing,
  makeSelectError,
};
