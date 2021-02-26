/*
 *
 * AccountSetting actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  UPDATE_FAILURE,
  UPDATE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    username,
  };
}

export function updatePassword(oldPassword, newPassword) {
  return {
    type: UPDATE_PASSWORD,
    oldPassword,
    newPassword,
  };
}

export function updateSuccess(success) {
  return {
    type: UPDATE_SUCCESS,
    success,
  };
}

export function updateFailure(error) {
  return {
    type: UPDATE_FAILURE,
    error,
  };
}
