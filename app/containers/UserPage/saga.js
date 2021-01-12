/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from 'utils/api';

import {
  LOAD_PROFILE_INFO,
  LOAD_USER_FOLLOWING,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from './constants';
import {
  loadProfileInfoFailure,
  loadProfileInfoSuccess,
  loadUserFollowingFailure,
  loadUserFollowingSuccess,
  followUserFailure,
  followUserSuccess,
  unfollowUserFailure,
  unfollowUserSuccess,
} from './actions';
import { setSuccess } from '../App/actions';

function* loadProfileInfo({ profileid }) {
  const [success, response] = yield get(
    `/user/${profileid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const profileinfo = response.data;
    if (profileinfo.projects) {
      profileinfo.projects = profileinfo.projects.filter(
        project => !project.deleted,
      );
    }
    yield put(loadProfileInfoSuccess(profileinfo));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadProfileInfoFailure(msg));
  }
}

function* loadUserFollowing({ userid }) {
  const [success, response] = yield get(
    `/user/following/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userFollowing = response.data.following;
    yield put(loadUserFollowingSuccess(userFollowing));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadUserFollowingFailure(msg));
  }
}

function* followUser({ userid }) {
  const [success, response] = yield patch(
    `/user/follow/${userid}`,
    {},
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userFollowing = response.data;
    yield put(followUserSuccess(userFollowing));
    yield put(
      setSuccess({
        title: 'Followed successfully!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(followUserFailure(msg));
  }
}

function* unfollowUser({ userid }) {
  const [success, response] = yield patch(
    `/user/unfollow/${userid}`,
    { returnFollowing: true },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const userFollowing = response.data;
    yield put(unfollowUserSuccess(userFollowing));
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
export default function* userPageSaga() {
  yield takeLatest(LOAD_PROFILE_INFO, loadProfileInfo);
  yield takeLatest(LOAD_USER_FOLLOWING, loadUserFollowing);
  yield takeLatest(FOLLOW_USER, followUser);
  yield takeLatest(UNFOLLOW_USER, unfollowUser);
}
