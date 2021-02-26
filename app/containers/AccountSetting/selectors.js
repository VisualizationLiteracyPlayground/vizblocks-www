import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the accountSetting state domain
 */

const selectAccountSettingDomain = state =>
  state.accountSetting || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountSetting
 */

const makeSelectAccountSetting = () =>
  createSelector(
    selectAccountSettingDomain,
    substate => substate,
  );

const makeSelectError = () =>
  createSelector(
    selectAccountSettingDomain,
    substate => substate.error,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectAccountSettingDomain,
    substate => substate.success,
  );

export {
  makeSelectAccountSetting,
  selectAccountSettingDomain,
  makeSelectError,
  makeSelectSuccess,
};
