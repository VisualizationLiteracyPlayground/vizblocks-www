/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, post, patch } from 'utils/api';
import history from 'utils/history';

import {
  CREATE_STUDIO,
  LOAD_STUDIO,
  UPDATE_STUDIO_PERMISSIONS,
  UPDATE_STUDIO_INFORMATION,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
} from './constants';
import {
  createStudioFailure,
  createStudioSuccess,
  loadStudioSuccess,
  updateStudioPermissionsFailure,
  updateStudioInformationFailure,
  addFollowerFailure,
  removeFollowerFailure,
  updateStudioSuccess,
} from './actions';
import { setSuccess, setError } from '../App/actions';

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
    const msg = {
      title: 'Studio does not exist',
      description: '',
    };
    if (response) {
      msg.description = response.error.value;
    }
    yield put(setError(msg));
    history.push('/');
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

function* updateStudioPermissions({ studioid, permissions }) {
  const [success, response] = yield patch(
    `/studio/permissions/${studioid}`,
    {
      permissions,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
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

function* updateStudioInformation({ studioid, information }) {
  const [success, response] = yield patch(
    `/studio/information/${studioid}`,
    {
      information,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
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

function* addFollower({ studioid }) {
  const [success, response] = yield patch(
    `/studio/add-curator/${studioid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Welcome to the studio!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(addFollowerFailure(msg));
  }
}

function* removeFollower({ studioid }) {
  const [success, response] = yield post(
    `/studio/remove-curator/${studioid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { unfollowed } = response.data;
    yield put(
      setSuccess({
        title: 'Unfollowed studio:',
        description: unfollowed,
      }),
    );
    history.push('/my-stuff');
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(removeFollowerFailure(msg));
  }
}

// Individual exports for testing
export default function* studioPageSaga() {
  yield takeLatest(CREATE_STUDIO, createStudio);
  yield takeLatest(LOAD_STUDIO, loadStudio);
  yield takeLatest(UPDATE_STUDIO_PERMISSIONS, updateStudioPermissions);
  yield takeLatest(UPDATE_STUDIO_INFORMATION, updateStudioInformation);
  yield takeLatest(ADD_FOLLOWER, addFollower);
  yield takeLatest(REMOVE_FOLLOWER, removeFollower);
}
