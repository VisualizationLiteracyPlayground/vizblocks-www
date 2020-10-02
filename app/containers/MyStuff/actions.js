/*
 *
 * MyStuff actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PROJECTS,
  LOAD_PROJECTS_FAILURE,
  LOAD_PROJECTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadProjects(userid) {
  return {
    type: LOAD_PROJECTS,
    userid,
  };
}

export function loadProjectsFailure(error) {
  return {
    type: LOAD_PROJECTS_FAILURE,
    error,
  };
}

export function loadProjectsSuccess(projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    projects,
  };
}
