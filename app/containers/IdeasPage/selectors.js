import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the ideasPage state domain
 */

const selectIdeasPageDomain = state => state.ideasPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IdeasPage
 */

const makeSelectIdeasPage = () =>
  createSelector(
    selectIdeasPageDomain,
    substate => substate,
  );

export default makeSelectIdeasPage;
export { selectIdeasPageDomain };
