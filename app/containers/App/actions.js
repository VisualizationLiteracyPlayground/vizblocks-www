/* eslint-disable prettier/prettier */
/*
 *
 * App actions
 * 
 */

import { 
  SET_ERROR,
  SET_SUCCESS,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
} from './constants';

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function setSuccess(msg) {
  return {
    type: SET_SUCCESS,
    msg,
  };
}

export function userSignedIn(user) {
  return {
    ...user,
    type: USER_SIGNED_IN,
  };
}

export function userSignedOut() {
  return {
    type: USER_SIGNED_OUT,
  };
}
