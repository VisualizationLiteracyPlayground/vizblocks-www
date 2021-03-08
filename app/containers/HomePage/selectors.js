import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Default selector used by IdeasPage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectFeaturedProjects = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.featuredProjects,
  );

export { selectHomePageDomain, makeSelectHomePage, makeSelectFeaturedProjects };
