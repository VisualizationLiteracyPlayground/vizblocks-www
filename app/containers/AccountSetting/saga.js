/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { patch } from '../../utils/api';
import { UPDATE_USERNAME, UPDATE_PASSWORD } from './constants';
import { userUpdatedUsername } from '../App/actions';
import { updateSuccess, updateFailure } from './actions';

function* updateUsername({ username }) {
  const [success, response] = yield patch(
    '/user/username',
    {
      username,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(
      updateSuccess(`Username successfully updated: ${response.data.username}`),
    );
    yield put(userUpdatedUsername(response.data.username));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(updateFailure(msg));
  }
}

function* updatePassword({ oldPassword, newPassword }) {
  const [success, response] = yield patch(
    '/user/password',
    {
      oldPassword,
      newPassword,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(updateSuccess(response.data.msg));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(updateFailure(msg));
  }
}

// Individual exports for testing
export default function* accountSettingSaga() {
  yield takeLatest(UPDATE_USERNAME, updateUsername);
  yield takeLatest(UPDATE_PASSWORD, updatePassword);
}
