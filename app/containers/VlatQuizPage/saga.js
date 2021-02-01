/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from 'utils/api';

import { LOAD_QUIZ, SUBMIT_QUIZ } from './constants';
import {
  loadQuizFailure,
  loadQuizSuccess,
  submitQuizFailure,
  setSuccess,
} from './actions';

function* loadQuiz({ testType, category }) {
  const [success, response] = yield get(
    `/quiz/${testType}/${category}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadQuizSuccess(response.data));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(loadQuizFailure(msg));
    yield put(loadQuizSuccess(null));
  }
}

function* submitQuiz({ userid, testType, testScore }) {
  // eslint-disable-next-line no-unused-vars
  const [success, response] = yield patch(
    `/vlat/${userid}`,
    {
      testType,
      testScore,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(setSuccess('Submitted quiz score!'));
  } else {
    const msg = 'Unable to reach the server, please try again later.';
    yield put(submitQuizFailure(msg));
  }
}

// Individual exports for testing
export default function* vlatQuizPageSaga() {
  yield takeLatest(LOAD_QUIZ, loadQuiz);
  yield takeLatest(SUBMIT_QUIZ, submitQuiz);
}
