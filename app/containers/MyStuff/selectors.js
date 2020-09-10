import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the myStuff state domain
 */

const selectMyStuffDomain = state => state.myStuff || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyStuff
 */

const makeSelectMyStuff = () =>
  createSelector(
    selectMyStuffDomain,
    substate => substate,
  );

export default makeSelectMyStuff;
export { selectMyStuffDomain };
