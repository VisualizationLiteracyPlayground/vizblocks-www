/* eslint-disable no-shadow */
import { put, takeEvery } from 'redux-saga/effects';

import { get } from 'utils/api';
import { VLAT_TEST_TYPE } from 'utils/vlatUtil';
import { setError } from 'containers/App/actions';

import { LOAD_ASSESSMENT_STATS } from './constants';
import {
  loadInitialAssessmentStatsSuccess,
  loadPostAssessmentStatsSuccess,
} from './actions';

function* loadAssessmentStats({ testType }) {
  const [success, response] = yield get(
    `/vlat/${testType}/stats`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    if (testType === VLAT_TEST_TYPE.INITIAL_ASSESSMENT) {
      yield put(loadInitialAssessmentStatsSuccess(response.data));
    } else if (testType === VLAT_TEST_TYPE.POST_ASSESSMENT) {
      yield put(loadPostAssessmentStatsSuccess(response.data));
    }
  } else {
    const msg = 'Unable to reach the server, please try again later.';
    yield put(setError({ title: msg }));
  }
}

// Individual exports for testing
export default function* vlatStatsSaga() {
  yield takeEvery(LOAD_ASSESSMENT_STATS, loadAssessmentStats);
}
