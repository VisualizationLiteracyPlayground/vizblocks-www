/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, post } from '../../utils/api';
import { CREATE_STUDIO, LOAD_STUDIO } from './constants';
import {
  createStudioFailure,
  createStudioSuccess,
  loadStudioFailure,
  loadStudioSuccess,
} from './actions';

function* loadStudio({ studioid }) {
  const [success, response] = yield get(
    `/studio/${studioid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(loadStudioSuccess(studio));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadStudioFailure(msg));
  }
}

function* createStudio() {
  const [success, response] = yield post(
    '/studio/create',
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(createStudioSuccess(studio));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(createStudioFailure(msg));
  }
}

// Individual exports for testing
export default function* studioPageSaga() {
  yield takeLatest(CREATE_STUDIO, createStudio);
  yield takeLatest(LOAD_STUDIO, loadStudio);
}
