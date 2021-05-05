/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get } from 'utils/api';

import { LOAD_USER_VLAT_SCORE } from './constants';
import { loadUserVlatScoreSuccess } from './actions';

function* loadUserVlatScore({ userid }) {
  const [success, response] = yield get(
    `/vlat/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadUserVlatScoreSuccess(response.data));
  } else {
    yield put(loadUserVlatScoreSuccess(null));
  }
}

// Individual exports for testing
export default function* vlatCategoryPageSaga() {
  yield takeLatest(LOAD_USER_VLAT_SCORE, loadUserVlatScore);
}
