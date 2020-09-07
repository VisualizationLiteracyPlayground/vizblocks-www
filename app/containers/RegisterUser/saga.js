/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import { put, takeLatest } from 'redux-saga/effects';

import history from '../../utils/history';
import { post } from '../../utils/api';
import { setSuccess } from '../App/actions';
import { REGISTER_USER } from './constants';
import { registerUserFailure, registerUserSuccess } from './actions';

function* registerUser({ username, email, password }) {
  const [success, response] = yield post(
    '/user/register',
    {
      username,
      email,
      password,
    },
    response => response,
    e => e.response,
  );
  if (success) {
    yield put(registerUserSuccess());
    yield put(
      setSuccess({
        title: 'Registration success',
        description: `Welcome ${username}`,
      }),
    );
    yield history.push('/');
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error[Object.keys(response.data.error)[0]][0];
    }
    yield put(registerUserFailure(msg));
  }
}

// Individual exports for testing
export default function* registerUserSaga() {
  yield takeLatest(REGISTER_USER, registerUser);
}
