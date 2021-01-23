/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from 'utils/api';

import {
  LOAD_PROJECT_DETAILS,
  LOAD_USER_INFO,
  USER_TOGGLE_LIKE,
  USER_TOGGLE_BOOKMARK,
} from './constants';
import {
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure,
  loadUserInfoSuccess,
  loadUserInfoFailure,
  userToggleLikeSuccess,
  userToggleLikeFailure,
  userToggleBookmarkSuccess,
  userToggleBookmarkFailure,
} from './actions';
import { setSuccess } from '../App/actions';

function* loadProjectDetails({ projectid }) {
  const [success, response] = yield get(
    `/project/view/${projectid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadProjectDetailsSuccess(response));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadProjectDetailsFailure(msg));
  }
}

function* loadUserInfo() {
  const [success, response] = yield get(
    `/user/current-no-populate`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userinfo = response.data;
    yield put(loadUserInfoSuccess(userinfo));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadUserInfoFailure(msg));
  }
}

function* userToggleLike({ projectid, likesProject }) {
  const [success, response] = yield patch(
    `/project/toggle-like/${projectid}`,
    {
      likesProject,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(userToggleLikeSuccess(response));
    let successMsg = '';
    if (likesProject) {
      successMsg = 'Liked project!';
    } else {
      successMsg = 'Unliked project.';
    }
    yield put(
      setSuccess({
        title: successMsg,
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(userToggleLikeFailure(msg));
  }
}

function* userToggleBookmark({ projectid, bookmarksProject }) {
  const [success, response] = yield patch(
    `/project/toggle-bookmark/${projectid}`,
    {
      bookmarksProject,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(userToggleBookmarkSuccess(response));
    let successMsg = '';
    if (bookmarksProject) {
      successMsg = 'Bookmarked project!';
    } else {
      successMsg = 'Unbookmarked project.';
    }
    yield put(
      setSuccess({
        title: successMsg,
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(userToggleBookmarkFailure(msg));
  }
}

// Individual exports for testing
export default function* projectPreviewSaga() {
  yield takeLatest(LOAD_PROJECT_DETAILS, loadProjectDetails);
  yield takeLatest(LOAD_USER_INFO, loadUserInfo);
  yield takeLatest(USER_TOGGLE_LIKE, userToggleLike);
  yield takeLatest(USER_TOGGLE_BOOKMARK, userToggleBookmark);
}
