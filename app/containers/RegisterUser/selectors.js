import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the registerUser state domain
 */

const selectRegisterUserDomain = state => state.registerUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RegisterUser
 */

const makeSelectRegisterUser = () =>
  createSelector(
    selectRegisterUserDomain,
    substate => substate,
  );

const makeSelectError = () =>
  createSelector(
    selectRegisterUserDomain,
    substate => substate.error,
  );

export default makeSelectRegisterUser;
export { selectRegisterUserDomain, makeSelectError };
