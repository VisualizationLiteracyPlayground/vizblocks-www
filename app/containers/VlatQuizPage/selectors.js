import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the vlatQuizPage state domain
 */

const selectVlatQuizPageDomain = state => state.vlatQuizPage || initialState;

/**
 * Default selector used by VlatQuizPage
 */

const makeSelectVlatQuizPage = () =>
  createSelector(
    selectVlatQuizPageDomain,
    substate => substate,
  );

const makeSelectQuiz = () =>
  createSelector(
    selectVlatQuizPageDomain,
    substate => substate.quiz,
  );

const makeSelectError = () =>
  createSelector(
    selectVlatQuizPageDomain,
    substate => substate.error,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectVlatQuizPageDomain,
    substate => substate.success,
  );

export {
  makeSelectVlatQuizPage,
  selectVlatQuizPageDomain,
  makeSelectQuiz,
  makeSelectError,
  makeSelectSuccess,
};
