/* eslint-disable prefer-destructuring */
import { put, takeLatest } from 'redux-saga/effects';

import { post } from '../../utils/api';
import history from '../../utils/history';
import { userSignedIn } from '../App/actions';
import { userSignInFailure, userSignInSuccess } from './actions';
import { USER_SIGNIN } from './constants';

function* userSignIn({ email, password }) {
  const [success, response] = yield post(
    '/user/login',
    {
      email,
      password,
    },
    res => {
      localStorage.setItem('access_token', res.data['access-token']);
      return res;
    },
    e => e.response,
  );
  if (success) {
    yield put(userSignInSuccess());
    yield put(userSignedIn(response.data));
    yield history.push('/my-stuff');
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(userSignInFailure(msg));
  }
}

// Individual exports for testing
export default function* signInPageSaga() {
  yield takeLatest(USER_SIGNIN, userSignIn);
}
