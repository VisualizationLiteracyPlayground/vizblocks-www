/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get } from '../../utils/api';
import { LOAD_FEATURED } from './constants';
import { loadFeaturedSuccess } from './actions';
import { setError } from '../App/actions';

function* loadFeaturedProjects({ queryPacket }) {
  const queryString = Object.keys(queryPacket)
    .map(key => `${key}=${queryPacket[key]}`)
    .join('&');

  const [success, response] = yield get(
    `/project/featured?${queryString}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadFeaturedSuccess(response.data));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(
      setError({
        title: 'Failed to load featured projects',
        description: msg,
      }),
    );
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(LOAD_FEATURED, loadFeaturedProjects);
}
