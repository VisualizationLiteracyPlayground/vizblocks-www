/*
 *
 * EditUserPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_USER_INFO,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
  UNFOLLOW_USER,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUserInfo() {
  return {
    type: LOAD_USER_INFO,
  };
}

export function loadUserInfoFailure(error) {
  return {
    type: LOAD_USER_INFO_FAILURE,
    error,
  };
}

export function loadUserInfoSuccess(userinfo) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    userinfo,
  };
}

export function updateUserInfo(information) {
  return {
    type: UPDATE_USER_INFO,
    information,
  };
}

export function updateUserInfoFailure(error) {
  return {
    type: UPDATE_USER_INFO_FAILURE,
    error,
  };
}

export function updateUserInfoSuccess(userinfo) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    userinfo,
  };
}

export function unfollowUser(userid) {
  return {
    type: UNFOLLOW_USER,
    userid,
  };
}

export function unfollowUserFailure(error) {
  return {
    type: UNFOLLOW_USER_FAILURE,
    error,
  };
}

export function unfollowUserSuccess(userinfo) {
  return {
    type: UNFOLLOW_USER_SUCCESS,
    userinfo,
  };
}
