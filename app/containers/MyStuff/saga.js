/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from '../../utils/api';
import { setSuccess } from '../App/actions';
import {
  DELETE_PROJECT,
  UNBOOKMARK_PROJECT,
  UNDELETE_PROJECT,
  LOAD_PROJECTS,
  LOAD_BOOKMARKED_PROJECTS,
  LOAD_STUDIOS,
} from './constants';
import {
  loadDeletedSuccess,
  loadProjectsFailure,
  loadProjectsSuccess,
  loadBookmarkedProjectsFailure,
  loadBookmarkedProjectsSuccess,
  deleteProjectFailure,
  unbookmarkProjectFailure,
  undeleteProjectFailure,
  updateProjectsSuccess,
  updateBookmarksSuccess,
  updateDeletedSuccess,
  loadStudiosFailure,
  loadStudiosSuccess,
} from './actions';

function* loadProjects({ userid }) {
  const [success, response] = yield get(
    `/user/projects/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { projects } = response.data;
    const projectDetails = [];
    const deletedDetails = [];
    // Check each project for deleted flag
    projects.forEach(project => {
      if (!project.deleted) {
        projectDetails.push(project);
      } else {
        deletedDetails.push(project);
      }
    });
    yield put(loadProjectsSuccess(projectDetails));
    yield put(loadDeletedSuccess(deletedDetails));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadProjectsFailure(msg));
  }
}

function* loadBookmarkedProjects({ userid }) {
  const [success, response] = yield get(
    `/user/bookmark-projects/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { bookmarkedProjects } = response.data;
    const projectDetails = [];
    // Check each project for deleted flag
    bookmarkedProjects.forEach(project => {
      if (!project.deleted) {
        projectDetails.push(project);
      }
    });
    yield put(loadBookmarkedProjectsSuccess(projectDetails));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadBookmarkedProjectsFailure(msg));
  }
}

function* deleteProject({ projectid, projects, deletedProjects }) {
  const [success, response] = yield patch(
    `/project/remove/${projectid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const newProjects = projects.filter(project => project._id !== projectid);
    const newDeleted = Array.from(deletedProjects);
    newDeleted.push(response.data.project);
    yield put(
      setSuccess({
        title: 'Deleted successfully',
        description: `Project Title: ${response.data.project.title}`,
      }),
    );
    yield put(updateProjectsSuccess(newProjects));
    yield put(updateDeletedSuccess(newDeleted));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(deleteProjectFailure(msg));
  }
}

function* unbookmarkProject({ projectid, bookmarkedProjects }) {
  const [success, response] = yield patch(
    `/project/toggle-bookmark/${projectid}`,
    {
      bookmarksProject: false,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const newBookmarkedProjects = bookmarkedProjects.filter(
      project => project._id !== projectid,
    );
    yield put(
      setSuccess({
        title: 'Unbookmarked successfully',
        description: `Project Title: ${response.title}`,
      }),
    );
    yield put(updateBookmarksSuccess(newBookmarkedProjects));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(unbookmarkProjectFailure(msg));
  }
}

function* undeleteProject({ projectid, projects, deletedProjects }) {
  const [success, response] = yield patch(
    `/project/unremove/${projectid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const newProjects = Array.from(projects);
    newProjects.push(response.data.project);
    const newDeleted = deletedProjects.filter(
      project => project._id !== projectid,
    );
    yield put(
      setSuccess({
        title: 'Restored successfully',
        description: `Project Title: ${response.data.project.title}`,
      }),
    );
    yield put(updateProjectsSuccess(newProjects));
    yield put(updateDeletedSuccess(newDeleted));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(undeleteProjectFailure(msg));
  }
}

function* loadStudios({ userid }) {
  const [success, response] = yield get(
    `/user/studios/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studios } = response.data;
    yield put(loadStudiosSuccess(studios));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadStudiosFailure(msg));
  }
}

// Individual exports for testing
export default function* myStuffSaga() {
  yield takeLatest(LOAD_PROJECTS, loadProjects);
  yield takeLatest(LOAD_BOOKMARKED_PROJECTS, loadBookmarkedProjects);
  yield takeLatest(DELETE_PROJECT, deleteProject);
  yield takeLatest(UNBOOKMARK_PROJECT, unbookmarkProject);
  yield takeLatest(UNDELETE_PROJECT, undeleteProject);
  yield takeLatest(LOAD_STUDIOS, loadStudios);
}
