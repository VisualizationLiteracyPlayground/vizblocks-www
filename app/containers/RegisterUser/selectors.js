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

export default makeSelectRegisterUser;
export { selectRegisterUserDomain };
