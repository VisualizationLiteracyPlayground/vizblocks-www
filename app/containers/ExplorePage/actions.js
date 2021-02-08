/*
 *
 * ExplorePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SEARCH_PROJECTS,
  SEARCH_PROJECTS_SUCCESS,
  SEARCH_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function searchProjects(queryPacket) {
  return {
    type: SEARCH_PROJECTS,
    queryPacket,
  };
}

export function searchProjectsSuccess(projects) {
  return {
    type: SEARCH_PROJECTS_SUCCESS,
    projects,
  };
}

export function searchFailure(error) {
  return {
    type: SEARCH_FAILURE,
    error,
  };
}
