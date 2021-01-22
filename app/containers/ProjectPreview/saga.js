/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get } from 'utils/api';

import { LOAD_PROJECT_DETAILS } from './constants';
import {
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure,
} from './actions';

function* loadProjectDetails({ projectid }) {
  const [success, response] = yield get(
    `/project/view/${projectid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadProjectDetailsSuccess(response));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadProjectDetailsFailure(msg));
  }
}

// Individual exports for testing
export default function* projectPreviewSaga() {
  yield takeLatest(LOAD_PROJECT_DETAILS, loadProjectDetails);
}
