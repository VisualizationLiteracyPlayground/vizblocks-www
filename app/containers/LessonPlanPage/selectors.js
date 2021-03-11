import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the lessonPlanPage state domain
 */

const selectLessonPlanPageDomain = state =>
  state.lessonPlanPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LessonPlanPage
 */

const makeSelectLessonPlanPage = () =>
  createSelector(
    selectLessonPlanPageDomain,
    substate => substate,
  );

export default makeSelectLessonPlanPage;
export { selectLessonPlanPageDomain };
