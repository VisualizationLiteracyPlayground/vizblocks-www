/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { put as apiPut } from 'utils/api';

import { REMIX_PROJECT } from './constants';
import { remixProjectFailure, remixProjectSuccess } from './actions';
import { setSuccess, setError } from '../App/actions';

function* remixProject({ projectid }) {
  const [success, response] = yield apiPut(
    `/project/${projectid}`,
    { isRemix: true },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(remixProjectSuccess(response));
    yield put(
      setSuccess({
        title: 'Remixed project successfully!',
        description: '',
        overwriteZIndex: true,
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(remixProjectFailure(msg));
    yield put(
      setError({
        title: 'Remix project failed!',
        description: '',
        overwriteZIndex: true,
      }),
    );
  }
}

// Individual exports for testing
export default function* vizblocksGuiSaga() {
  yield takeLatest(REMIX_PROJECT, remixProject);
}
