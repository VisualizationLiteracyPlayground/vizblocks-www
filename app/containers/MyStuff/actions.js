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
  LOAD_DELETED_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILURE,
  UNDELETE_PROJECT,
  UNDELETE_PROJECT_FAILURE,
  UPDATE_PROJECTS_SUCCESS,
  UPDATE_DELETED_SUCCESS,
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

export function loadDeletedSuccess(projects) {
  return {
    type: LOAD_DELETED_SUCCESS,
    projects,
  };
}

export function deleteProject(projectid, projects, deletedProjects) {
  return {
    type: DELETE_PROJECT,
    projectid,
    projects,
    deletedProjects,
  };
}

export function deleteProjectFailure(error) {
  return {
    type: DELETE_PROJECT_FAILURE,
    error,
  };
}

export function undeleteProject(projectid, projects, deletedProjects) {
  return {
    type: UNDELETE_PROJECT,
    projectid,
    projects,
    deletedProjects,
  };
}

export function undeleteProjectFailure(error) {
  return {
    type: UNDELETE_PROJECT_FAILURE,
    error,
  };
}

export function updateProjectsSuccess(projects) {
  return {
    type: UPDATE_PROJECTS_SUCCESS,
    projects,
  };
}

export function updateDeletedSuccess(projects) {
  return {
    type: UPDATE_DELETED_SUCCESS,
    projects,
  };
}
