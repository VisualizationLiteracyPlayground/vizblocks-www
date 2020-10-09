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

export function updateStudioPermissions(studioid, permissions, studio) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS,
    studioid,
    permissions,
    studio,
  };
}

export function updateStudioPermissionsFailure(error) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS_FAILURE,
    error,
  };
}

export function updateStudioInformation(studioid, information, studio) {
  return {
    type: UPDATE_STUDIO_INFORMATION,
    studioid,
    information,
    studio,
  };
}

export function updateStudioInformationFailure(error) {
  return {
    type: UPDATE_STUDIO_INFORMATION_FAILURE,
    error,
  };
}

export function updateStudioSuccess(studio) {
  return {
    type: UPDATE_STUDIO_SUCCESS,
    studio,
  };
}
