/*
 *
 * UserPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PROFILE_INFO,
  LOAD_PROFILE_INFO_FAILURE,
  LOAD_PROFILE_INFO_SUCCESS,
  LOAD_USER_FOLLOWING,
  LOAD_USER_FOLLOWING_FAILURE,
  LOAD_USER_FOLLOWING_SUCCESS,
  FOLLOW_USER,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProfileInfo(profileid) {
  return {
    type: LOAD_PROFILE_INFO,
    profileid,
  };
}

export function loadProfileInfoFailure(error) {
  return {
    type: LOAD_PROFILE_INFO_FAILURE,
    error,
  };
}

export function loadProfileInfoSuccess(profileinfo) {
  return {
    type: LOAD_PROFILE_INFO_SUCCESS,
    profileinfo,
  };
}

export function loadUserFollowing(userid) {
  return {
    type: LOAD_USER_FOLLOWING,
    userid,
  };
}

export function loadUserFollowingFailure(error) {
  return {
    type: LOAD_USER_FOLLOWING_FAILURE,
    error,
  };
}

export function loadUserFollowingSuccess(userFollowing) {
  return {
    type: LOAD_USER_FOLLOWING_SUCCESS,
    userFollowing,
  };
}

export function followUser(userid) {
  return {
    type: FOLLOW_USER,
    userid,
  };
}

export function followUserFailure(error) {
  return {
    type: FOLLOW_USER_FAILURE,
    error,
  };
}

export function followUserSuccess(userFollowing) {
  return {
    type: FOLLOW_USER_SUCCESS,
    userFollowing,
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

export function unfollowUserSuccess(userFollowing) {
  return {
    type: UNFOLLOW_USER_SUCCESS,
    userFollowing,
  };
}
