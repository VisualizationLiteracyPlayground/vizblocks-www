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
  LOAD_BOOKMARKED_PROJECTS,
  LOAD_BOOKMARKED_PROJECTS_FAILURE,
  LOAD_BOOKMARKED_PROJECTS_SUCCESS,
  LOAD_DELETED_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILURE,
  UNDELETE_PROJECT,
  UNDELETE_PROJECT_FAILURE,
  UNBOOKMARK_PROJECT,
  UNBOOKMARK_PROJECT_FAILURE,
  UPDATE_PROJECTS_SUCCESS,
  UPDATE_BOOKMARKS_SUCCESS,
  UPDATE_DELETED_SUCCESS,
  LOAD_STUDIOS,
  LOAD_STUDIOS_FAILURE,
  LOAD_STUDIOS_SUCCESS,
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

export function loadBookmarkedProjects(userid) {
  return {
    type: LOAD_BOOKMARKED_PROJECTS,
    userid,
  };
}

export function loadBookmarkedProjectsFailure(error) {
  return {
    type: LOAD_BOOKMARKED_PROJECTS_FAILURE,
    error,
  };
}

export function loadBookmarkedProjectsSuccess(projects) {
  return {
    type: LOAD_BOOKMARKED_PROJECTS_SUCCESS,
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

export function unbookmarkProject(projectid, bookmarkedProjects) {
  return {
    type: UNBOOKMARK_PROJECT,
    projectid,
    bookmarkedProjects,
  };
}

export function unbookmarkProjectFailure(error) {
  return {
    type: UNBOOKMARK_PROJECT_FAILURE,
    error,
  };
}

export function updateProjectsSuccess(projects) {
  return {
    type: UPDATE_PROJECTS_SUCCESS,
    projects,
  };
}

export function updateBookmarksSuccess(projects) {
  return {
    type: UPDATE_BOOKMARKS_SUCCESS,
    projects,
  };
}

export function updateDeletedSuccess(projects) {
  return {
    type: UPDATE_DELETED_SUCCESS,
    projects,
  };
}

export function loadStudios(userid) {
  return {
    type: LOAD_STUDIOS,
    userid,
  };
}

export function loadStudiosFailure(error) {
  return {
    type: LOAD_STUDIOS_FAILURE,
    error,
  };
}

export function loadStudiosSuccess(studios) {
  return {
    type: LOAD_STUDIOS_SUCCESS,
    studios,
  };
}
