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
