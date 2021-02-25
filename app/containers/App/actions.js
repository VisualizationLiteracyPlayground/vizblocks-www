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
  USER_UPDATED_PROFILE_PICTURE,
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

export function userUpdatedProfilePicture(image) {
  return {
    type: USER_UPDATED_PROFILE_PICTURE,
    image,
  }
}
