/*
 *
 * VlatQuizPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_QUIZ,
  LOAD_QUIZ_FAILURE,
  LOAD_QUIZ_SUCCESS,
  SUBMIT_QUIZ,
  SUBMIT_QUIZ_FAILURE,
  SET_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadQuiz(testType, category) {
  return {
    type: LOAD_QUIZ,
    testType,
    category,
  };
}

export function loadQuizFailure(error) {
  return {
    type: LOAD_QUIZ_FAILURE,
    error,
  };
}

export function loadQuizSuccess(quiz) {
  return {
    type: LOAD_QUIZ_SUCCESS,
    quiz,
  };
}

export function submitQuiz(userid, testType, testScore) {
  return {
    type: SUBMIT_QUIZ,
    userid,
    testType,
    testScore,
  };
}

export function submitQuizFailure(error) {
  return {
    type: SUBMIT_QUIZ_FAILURE,
    error,
  };
}

export function setSuccess(success) {
  return {
    type: SET_SUCCESS,
    success,
  };
}
