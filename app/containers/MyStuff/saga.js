/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, put as apiPut } from '../../utils/api';
import { setSuccess } from '../App/actions';
import { DELETE_PROJECT, LOAD_PROJECTS } from './constants';
import {
  loadDeletedSuccess,
  loadProjectsFailure,
  loadProjectsSuccess,
  deleteProjectFailure,
  updateProjectsSuccess,
  updateDeletedSuccess,
} from './actions';

// Helper method to fetch project details
async function loadProjectDetail(projectid) {
  return get(
    `/project/details/${projectid}`,
    response => response.data,
    e => e.response,
  );
}

function* loadProjects({ userid }) {
  const [success, response] = yield get(
    `/user/projects/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const projectIds = response.data.projects;
    const projectDetails = [];
    const deletedDetails = [];
    // Fetch each project details using project id
    yield Promise.all(
      projectIds.map(async id => {
        const [success, details] = await loadProjectDetail(id);
        if (success) {
          if (!details.deleted) {
            projectDetails.push(details);
          } else {
            deletedDetails.push(details);
          }
        }
      }),
    );
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
  const [success, response] = yield apiPut(
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

// Individual exports for testing
export default function* myStuffSaga() {
  yield takeLatest(LOAD_PROJECTS, loadProjects);
  yield takeLatest(DELETE_PROJECT, deleteProject);
}
