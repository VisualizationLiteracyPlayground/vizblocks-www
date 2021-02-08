import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the explorePage state domain
 */

const selectExplorePageDomain = state => state.explorePage || initialState;

/**
 * Default selector used by ExplorePage
 */

const makeSelectExplorePage = () =>
  createSelector(
    selectExplorePageDomain,
    substate => substate,
  );

const makeSelectProjects = () =>
  createSelector(
    selectExplorePageDomain,
    substate => substate.projects,
  );

const makeSelectError = () =>
  createSelector(
    selectExplorePageDomain,
    substate => substate.error,
  );

export {
  selectExplorePageDomain,
  makeSelectExplorePage,
  makeSelectProjects,
  makeSelectError,
};
