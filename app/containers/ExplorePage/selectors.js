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

const makeSelectStudios = () =>
  createSelector(
    selectExplorePageDomain,
    substate => substate.studios,
  );

const makeSelectUsers = () =>
  createSelector(
    selectExplorePageDomain,
    substate => substate.users,
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
  makeSelectStudios,
  makeSelectUsers,
  makeSelectError,
};
