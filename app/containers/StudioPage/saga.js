/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, post, patch } from '../../utils/api';
import {
  CREATE_STUDIO,
  LOAD_STUDIO,
  UPDATE_STUDIO_PERMISSIONS,
  UPDATE_STUDIO_INFORMATION,
} from './constants';
import {
  createStudioFailure,
  createStudioSuccess,
  loadStudioFailure,
  loadStudioSuccess,
  updateStudioPermissionsFailure,
  updateStudioInformationFailure,
  updateStudioSuccess,
} from './actions';
import { setSuccess } from '../App/actions';

function* loadStudio({ studioid }) {
  const [success, response] = yield get(
    `/studio/${studioid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(loadStudioSuccess(studio));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadStudioFailure(msg));
  }
}

function* createStudio() {
  const [success, response] = yield post(
    '/studio/create',
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(createStudioSuccess(studio));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(createStudioFailure(msg));
  }
}

function* updateStudioPermissions({ studioid, permissions, studio }) {
  const [success, response] = yield patch(
    `/studio/permissions/${studioid}`,
    {
      permissions,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { permissions } = response.data;
    const updatedStudio = Object.assign({}, studio);
    updatedStudio.settings = permissions;
    yield put(updateStudioSuccess(updatedStudio));
    yield put(
      setSuccess({
        title: 'Permissions updated',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateStudioPermissionsFailure(msg));
  }
}

function* updateStudioInformation({ studioid, information, studio }) {
  const [success, response] = yield patch(
    `/studio/information/${studioid}`,
    {
      information,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { title, description } = response.data;
    const updatedStudio = Object.assign({}, studio);
    updatedStudio.title = title;
    updatedStudio.description = description;
    yield put(updateStudioSuccess(updatedStudio));
    yield put(
      setSuccess({
        title: 'Studio information updated',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateStudioInformationFailure(msg));
  }
}

// Individual exports for testing
export default function* studioPageSaga() {
  yield takeLatest(CREATE_STUDIO, createStudio);
  yield takeLatest(LOAD_STUDIO, loadStudio);
  yield takeLatest(UPDATE_STUDIO_PERMISSIONS, updateStudioPermissions);
  yield takeLatest(UPDATE_STUDIO_INFORMATION, updateStudioInformation);
}
