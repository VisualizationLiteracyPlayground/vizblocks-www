import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the editUserPage state domain
 */

const selectEditUserPageDomain = state => state.editUserPage || initialState;

/**
 * Default selector used by EditUserPage
 */

const makeSelectEditUserPage = () =>
  createSelector(
    selectEditUserPageDomain,
    substate => substate,
  );

const makeSelectUserInfo = () =>
  createSelector(
    selectEditUserPageDomain,
    substate => substate.userinfo,
  );

const makeSelectError = () =>
  createSelector(
    selectEditUserPageDomain,
    substate => substate.error,
  );

export {
  makeSelectEditUserPage,
  selectEditUserPageDomain,
  makeSelectUserInfo,
  makeSelectError,
};
