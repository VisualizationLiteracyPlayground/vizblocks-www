import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the videoTutorialPage state domain
 */

const selectVideoTutorialPageDomain = state =>
  state.videoTutorialPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoTutorialPage
 */

const makeSelectVideoTutorialPage = () =>
  createSelector(
    selectVideoTutorialPageDomain,
    substate => substate,
  );

export default makeSelectVideoTutorialPage;
export { selectVideoTutorialPageDomain };
