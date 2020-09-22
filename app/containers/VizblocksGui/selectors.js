import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vizblocksGui state domain
 */

const selectVizblocksGuiDomain = state => state.vizblocksGui || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VizblocksGui
 */

const makeSelectVizblocksGui = () =>
  createSelector(
    selectVizblocksGuiDomain,
    substate => substate,
  );

export default makeSelectVizblocksGui;
export { selectVizblocksGuiDomain };
