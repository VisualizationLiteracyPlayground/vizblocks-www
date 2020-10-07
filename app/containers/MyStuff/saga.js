/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from '../../utils/api';
import { setSuccess } from '../App/actions';
import { DELETE_PROJECT, UNDELETE_PROJECT, LOAD_PROJECTS } from './constants';
import {
  loadDeletedSuccess,
  loadProjectsFailure,
  loadProjectsSuccess,
  deleteProjectFailure,
  undeleteProjectFailure,
  updateProjectsSuccess,
  updateDeletedSuccess,
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

function* deleteProject({ projectid, projects, deletedProjects }) {
  const [success, response] = yield patch(
    `/project/remove/${projectid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const newProjects = projects.filter(project => project.id !== projectid);
    const newDeleted = [...deletedProjects];
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

function* undeleteProject({ projectid, projects, deletedProjects }) {
  const [success, response] = yield patch(
    `/project/unremove/${projectid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const newProjects = [...projects];
    newProjects.push(response.data.project);
    const newDeleted = deletedProjects.filter(
      project => project.id !== projectid,
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

// Individual exports for testing
export default function* myStuffSaga() {
  yield takeLatest(LOAD_PROJECTS, loadProjects);
  yield takeLatest(DELETE_PROJECT, deleteProject);
  yield takeLatest(UNDELETE_PROJECT, undeleteProject);
}
