/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from 'utils/api';

import {
  LOAD_USER_INFO,
  UPDATE_USER_INFO,
  UPDATE_USER_PROFILE_PICTURE,
  UNFOLLOW_USER,
} from './constants';
import {
  loadUserInfoFailure,
  loadUserInfoSuccess,
  updateUserInfoFailure,
  updateUserInfoSuccess,
  updateUserProfilePictureFailure,
  updateUserProfilePictureSuccess,
  unfollowUserFailure,
  unfollowUserSuccess,
} from './actions';
import { userUpdatedProfilePicture, setSuccess } from '../App/actions';

function* loadUserInfo() {
  const [success, response] = yield get(
    `/user/current`,
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

function* updateUserInfo({ information }) {
  const [success, response] = yield patch(
    `/user/bio`,
    {
      information,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userinfo = response.data;
    yield put(updateUserInfoSuccess(userinfo));
    yield put(
      setSuccess({
        title: 'Information updated!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateUserInfoFailure(msg));
  }
}

function* updateUserProfilePicture({ filename, data, contentType }) {
  const [success, response] = yield patch(
    `/user/thumbnail`,
    {
      filename,
      data,
      contentType,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userinfo = response.data;
    yield put(updateUserProfilePictureSuccess(userinfo));
    yield put(
      setSuccess({
        title: 'Profile picture updated',
        description: '',
      }),
    );
    yield put(userUpdatedProfilePicture(userinfo.image));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateUserProfilePictureFailure(msg));
  }
}

function* unfollowUser({ userid }) {
  const [success, response] = yield patch(
    `/user/unfollow/${userid}`,
    { returnFollowing: false },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userinfo = response.data;
    yield put(unfollowUserSuccess(userinfo));
    yield put(
      setSuccess({
        title: 'Unfollowed successfully.',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(unfollowUserFailure(msg));
  }
}

// Individual exports for testing
export default function* editUserPageSaga() {
  yield takeLatest(LOAD_USER_INFO, loadUserInfo);
  yield takeLatest(UPDATE_USER_INFO, updateUserInfo);
  yield takeLatest(UPDATE_USER_PROFILE_PICTURE, updateUserProfilePicture);
  yield takeLatest(UNFOLLOW_USER, unfollowUser);
}
