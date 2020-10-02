/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get } from '../../utils/api';
import { LOAD_PROJECTS } from './constants';
import { loadProjectsFailure, loadProjectsSuccess } from './actions';

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
    // Fetch each project details using project id
    yield Promise.all(
      projectIds.map(async id => {
        const [success, details] = await loadProjectDetail(id);
        if (success && !details.deleted) {
          projectDetails.push(details);
        }
      }),
    );
    yield put(loadProjectsSuccess(projectDetails));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadProjectsFailure(msg));
  }
}

// Individual exports for testing
export default function* myStuffSaga() {
  yield takeLatest(LOAD_PROJECTS, loadProjects);
}
