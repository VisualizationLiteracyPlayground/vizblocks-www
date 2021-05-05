/*
 *
 * VizblocksGui actions
 *
 */

import {
  DEFAULT_ACTION,
  REMIX_PROJECT,
  REMIX_PROJECT_FAILURE,
  REMIX_PROJECT_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function remixProject(projectid) {
  return {
    type: REMIX_PROJECT,
    projectid,
  };
}

export function remixProjectFailure(error) {
  return {
    type: REMIX_PROJECT_FAILURE,
    error,
  };
}

export function remixProjectSuccess(remixResponse) {
  return {
    type: REMIX_PROJECT_SUCCESS,
    remixResponse,
  };
}
