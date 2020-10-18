/*
 *
 * RegisterUser actions
 *
 */

import {
  DEFAULT_ACTION,
  REGISTER_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function registerUser(username, email, password) {
  return {
    type: REGISTER_USER,
    username,
    email,
    password,
  };
}

export function registerUserFailure(error) {
  return {
    type: REGISTER_USER_FAILURE,
    error,
  };
}

export function registerUserSuccess() {
  return {
    type: REGISTER_USER_SUCCESS,
  };
}
