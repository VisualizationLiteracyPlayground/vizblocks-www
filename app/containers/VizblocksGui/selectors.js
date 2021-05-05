import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vizblocksGui state domain
 */

const selectVizblocksGuiDomain = state => state.vizblocksGui || initialState;

/**
 * Default selector used by VizblocksGui
 */

const makeSelectVizblocksGui = () =>
  createSelector(
    selectVizblocksGuiDomain,
    substate => substate,
  );

const makeSelectRemixResponse = () =>
  createSelector(
    selectVizblocksGuiDomain,
    substate => substate.remixResponse,
  );

const makeSelectError = () =>
  createSelector(
    selectVizblocksGuiDomain,
    substate => substate.error,
  );

export {
  makeSelectVizblocksGui,
  selectVizblocksGuiDomain,
  makeSelectRemixResponse,
  makeSelectError,
};
