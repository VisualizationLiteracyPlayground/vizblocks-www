/*
 *
 * StudioPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CREATE_STUDIO,
  CREATE_STUDIO_FAILURE,
  CREATE_STUDIO_SUCCESS,
  LOAD_STUDIO,
  LOAD_STUDIO_FAILURE,
  LOAD_STUDIO_SUCCESS,
  UPDATE_STUDIO_PERMISSIONS,
  UPDATE_STUDIO_PERMISSIONS_FAILURE,
  UPDATE_STUDIO_INFORMATION,
  UPDATE_STUDIO_INFORMATION_FAILURE,
  ADD_FOLLOWER,
  ADD_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWER_FAILURE,
  UPDATE_CURATOR_ROLE,
  UPDATE_CURATOR_ROLE_FAILURE,
  UPDATE_STUDIO_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createStudio() {
  return {
    type: CREATE_STUDIO,
  };
}

export function createStudioFailure(error) {
  return {
    type: CREATE_STUDIO_FAILURE,
    error,
  };
}

export function createStudioSuccess(studio) {
  return {
    type: CREATE_STUDIO_SUCCESS,
    studio,
  };
}

export function loadStudio(studioid) {
  return {
    type: LOAD_STUDIO,
    studioid,
  };
}

export function loadStudioFailure(error) {
  return {
    type: LOAD_STUDIO_FAILURE,
    error,
  };
}

export function loadStudioSuccess(studio) {
  return {
    type: LOAD_STUDIO_SUCCESS,
    studio,
  };
}

export function updateStudioPermissions(studioid, permissions) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS,
    studioid,
    permissions,
  };
}

export function updateStudioPermissionsFailure(error) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS_FAILURE,
    error,
  };
}

export function updateStudioInformation(studioid, information) {
  return {
    type: UPDATE_STUDIO_INFORMATION,
    studioid,
    information,
  };
}

export function updateStudioInformationFailure(error) {
  return {
    type: UPDATE_STUDIO_INFORMATION_FAILURE,
    error,
  };
}

export function addFollower(studioid) {
  return {
    type: ADD_FOLLOWER,
    studioid,
  };
}

export function addFollowerFailure(error) {
  return {
    type: ADD_FOLLOWER_FAILURE,
    error,
  };
}

export function removeFollower(studioid) {
  return {
    type: REMOVE_FOLLOWER,
    studioid,
  };
}

export function removeFollowerFailure(error) {
  return {
    type: REMOVE_FOLLOWER_FAILURE,
    error,
  };
}

export function updateCuratorRole(studioid, curatorid, curatorRole) {
  return {
    type: UPDATE_CURATOR_ROLE,
    studioid,
    curatorid,
    curatorRole,
  };
}

export function updateCuratorRoleFailure(error) {
  return {
    type: UPDATE_CURATOR_ROLE_FAILURE,
    error,
  };
}

export function updateStudioSuccess(studio) {
  return {
    type: UPDATE_STUDIO_SUCCESS,
    studio,
  };
}
