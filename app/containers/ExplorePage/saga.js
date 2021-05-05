/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get } from '../../utils/api';
import { SEARCH_PROJECTS, SEARCH_STUDIOS, SEARCH_USERS } from './constants';
import {
  searchProjectsSuccess,
  searchStudiosSuccess,
  searchUsersSuccess,
  searchFailure,
} from './actions';

function* searchProjects({ queryPacket }) {
  const queryString = Object.keys(queryPacket)
    .map(key => `${key}=${queryPacket[key]}`)
    .join('&');

  const [success, response] = yield get(
    `/project/explore?${queryString}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(searchProjectsSuccess(response.data));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(searchFailure(msg));
  }
}

function* searchStudios({ queryPacket }) {
  const queryString = Object.keys(queryPacket)
    .map(key => `${key}=${queryPacket[key]}`)
    .join('&');

  const [success, response] = yield get(
    `/studio/explore?${queryString}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(searchStudiosSuccess(response.data));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(searchFailure(msg));
  }
}

function* searchUsers({ queryPacket }) {
  const queryString = Object.keys(queryPacket)
    .map(key => `${key}=${queryPacket[key]}`)
    .join('&');

  const [success, response] = yield get(
    `/user/explore?${queryString}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(searchUsersSuccess(response.data));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(searchFailure(msg));
  }
}

// Individual exports for testing
export default function* explorePageSaga() {
  yield takeLatest(SEARCH_PROJECTS, searchProjects);
  yield takeLatest(SEARCH_STUDIOS, searchStudios);
  yield takeLatest(SEARCH_USERS, searchUsers);
}
