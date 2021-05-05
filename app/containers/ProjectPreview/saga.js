/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, patch } from 'utils/api';

import {
  LOAD_PROJECT_DETAILS,
  LOAD_USER_INFO,
  LOAD_PROJECT_COMMENTS,
  ADD_PROJECT_COMMENT,
  USER_TOGGLE_LIKE,
  USER_TOGGLE_BOOKMARK,
  UPDATE_PROJECT_INFORMATION,
  UPDATE_PROJECT_COMMENT_PERMISSIONS,
} from './constants';
import {
  loadProjectDetailsSuccess,
  loadProjectDetailsFailure,
  loadUserInfoSuccess,
  loadUserInfoFailure,
  loadProjectCommentsSuccess,
  loadProjectCommentsFailure,
  addProjectCommentFailure,
  userToggleLikeSuccess,
  userToggleLikeFailure,
  userToggleBookmarkSuccess,
  userToggleBookmarkFailure,
  updateProjectInformationSuccess,
  updateProjectInformationFailure,
  updateProjectCommentPermissionsFailure,
  setSuccess,
} from './actions';

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
      msg = response.error;
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
      msg = response.error;
    }
    yield put(loadUserInfoFailure(msg));
  }
}

function* loadProjectComments({ projectid, queryPacket }) {
  if (projectid === 0) {
    yield put(loadProjectCommentsSuccess([]));
    return;
  }
  const queryString = Object.keys(queryPacket)
    .map(key => `${key}=${queryPacket[key]}`)
    .join('&');

  const [success, response] = yield get(
    `/comment/${projectid}?${queryString}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(loadProjectCommentsSuccess(response.data.docs));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(loadProjectCommentsFailure(msg));
  }
}

function* addProjectComment({ projectid, comment, loadedComments }) {
  const [success, response] = yield patch(
    `/project/add-comment/${projectid}`,
    {
      comment,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { comment } = response.data;
    let comments = [comment];
    comments = comments.concat(loadedComments);
    yield put(loadProjectCommentsSuccess(comments));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(addProjectCommentFailure(msg));
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

function* updateProjectInformation({
  projectid,
  title,
  instructions,
  description,
}) {
  const [success, response] = yield patch(
    `/project/information/${projectid}`,
    {
      title,
      instructions,
      description,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(updateProjectInformationSuccess(response));
    yield put(
      setSuccess({
        title: 'Updated project information!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateProjectInformationFailure(msg));
  }
}

function* updateProjectCommentPermissions({ projectid, permissions }) {
  const [success, response] = yield patch(
    `/project/comment-permissions/${projectid}`,
    {
      permissions,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    yield put(
      setSuccess({
        title: response.data,
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.error;
    }
    yield put(updateProjectCommentPermissionsFailure(msg));
  }
}

// Individual exports for testing
export default function* projectPreviewSaga() {
  yield takeLatest(LOAD_PROJECT_DETAILS, loadProjectDetails);
  yield takeLatest(LOAD_USER_INFO, loadUserInfo);
  yield takeLatest(LOAD_PROJECT_COMMENTS, loadProjectComments);
  yield takeLatest(ADD_PROJECT_COMMENT, addProjectComment);
  yield takeLatest(USER_TOGGLE_LIKE, userToggleLike);
  yield takeLatest(USER_TOGGLE_BOOKMARK, userToggleBookmark);
  yield takeLatest(UPDATE_PROJECT_INFORMATION, updateProjectInformation);
  yield takeLatest(
    UPDATE_PROJECT_COMMENT_PERMISSIONS,
    updateProjectCommentPermissions,
  );
}
