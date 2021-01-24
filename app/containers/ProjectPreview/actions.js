/*
 *
 * ProjectPreview actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PROJECT_DETAILS,
  LOAD_PROJECT_DETAILS_FAILURE,
  LOAD_PROJECT_DETAILS_SUCCESS,
  LOAD_USER_INFO,
  LOAD_USER_INFO_FAILURE,
  LOAD_USER_INFO_SUCCESS,
  USER_TOGGLE_LIKE,
  USER_TOGGLE_LIKE_FAILURE,
  USER_TOGGLE_LIKE_SUCCESS,
  USER_TOGGLE_BOOKMARK,
  USER_TOGGLE_BOOKMARK_FAILURE,
  USER_TOGGLE_BOOKMARK_SUCCESS,
  UPDATE_PROJECT_INFORMATION,
  UPDATE_PROJECT_INFORMATION_FAILURE,
  UPDATE_PROJECT_INFORMATION_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProjectDetails(projectid) {
  return {
    type: LOAD_PROJECT_DETAILS,
    projectid,
  };
}

export function loadProjectDetailsFailure(error) {
  return {
    type: LOAD_PROJECT_DETAILS_FAILURE,
    error,
  };
}

export function loadProjectDetailsSuccess(project) {
  return {
    type: LOAD_PROJECT_DETAILS_SUCCESS,
    project,
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

export function userToggleLike(projectid, likesProject) {
  return {
    type: USER_TOGGLE_LIKE,
    projectid,
    likesProject,
  };
}

export function userToggleLikeFailure(error) {
  return {
    type: USER_TOGGLE_LIKE_FAILURE,
    error,
  };
}

export function userToggleLikeSuccess(project) {
  return {
    type: USER_TOGGLE_LIKE_SUCCESS,
    project,
  };
}

export function userToggleBookmark(projectid, bookmarksProject) {
  return {
    type: USER_TOGGLE_BOOKMARK,
    projectid,
    bookmarksProject,
  };
}

export function userToggleBookmarkFailure(error) {
  return {
    type: USER_TOGGLE_BOOKMARK_FAILURE,
    error,
  };
}

export function userToggleBookmarkSuccess(project) {
  return {
    type: USER_TOGGLE_BOOKMARK_SUCCESS,
    project,
  };
}

export function updateProjectInformation(
  projectid,
  title,
  instructions,
  description,
) {
  return {
    type: UPDATE_PROJECT_INFORMATION,
    projectid,
    title,
    instructions,
    description,
  };
}

export function updateProjectInformationFailure(error) {
  return {
    type: UPDATE_PROJECT_INFORMATION_FAILURE,
    error,
  };
}

export function updateProjectInformationSuccess(project) {
  return {
    type: UPDATE_PROJECT_INFORMATION_SUCCESS,
    project,
  };
}
