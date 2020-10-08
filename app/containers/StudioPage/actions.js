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
