/*
 *
 * SignInPage actions
 *
 */

import {
  DEFAULT_ACTION,
  USER_SIGNIN,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function userSignIn(email, password) {
  return {
    type: USER_SIGNIN,
    email,
    password,
  };
}

export function userSignInSuccess() {
  return {
    type: USER_SIGNIN_SUCCESS,
  };
}

export function userSignInFailure(error) {
  return {
    type: USER_SIGNIN_FAILURE,
    error,
  };
}
