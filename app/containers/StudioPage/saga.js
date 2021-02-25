/* eslint-disable no-shadow */
import { put, takeLatest } from 'redux-saga/effects';

import { get, post, patch } from 'utils/api';
import history from 'utils/history';

import {
  CREATE_STUDIO,
  LOAD_STUDIO,
  UPDATE_STUDIO_PERMISSIONS,
  UPDATE_STUDIO_INFORMATION,
  UPDATE_STUDIO_THUMBNAIL,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
  UPDATE_CURATOR_ROLE,
  CREATE_SUBFOLDER,
  UPDATE_SUBFOLDER_NAME,
  LOAD_USER_PROJECTS,
  ADD_PROJECTS,
  LOAD_SUBFOLDER_PROJECTS,
  DELETE_SUBFOLDERS,
  DELETE_PROJECTS,
  ADD_COMMENT,
  LOAD_COMMENTS,
} from './constants';
import {
  createStudioFailure,
  createStudioSuccess,
  loadStudioSuccess,
  updateStudioPermissionsFailure,
  updateStudioInformationFailure,
  updateStudioThumbnailFailure,
  addFollowerFailure,
  removeFollowerFailure,
  updateCuratorRoleFailure,
  createSubfolderFailure,
  updateSubfolderNameFailure,
  addProjectsFailure,
  deleteSubfoldersFailure,
  deleteProjectsFailure,
  updateStudioSuccess,
  loadUserProjectsFailure,
  loadUserProjectsSuccess,
  loadSubfolderProjectsFailure,
  loadSubfolderProjectsSuccess,
  addCommentFailure,
  loadCommentsFailure,
  loadCommentsSuccess,
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
    studio.rootFolder = studio.rootFolder.filter(project => !project.deleted);
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

function* updateStudioThumbnail({ studioid, filename, data, contentType }) {
  const [success, response] = yield patch(
    `/studio/thumbnail/${studioid}`,
    {
      filename,
      data,
      contentType,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Studio thumbnail updated',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateStudioThumbnailFailure(msg));
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

function* updateCuratorRole({ studioid, curatorid, curatorRole }) {
  const [success, response] = yield patch(
    `/studio/curator-role/${studioid}`,
    {
      curatorid,
      curatorRole,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Curator role modified!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateCuratorRoleFailure(msg));
  }
}

function* createSubfolder({ studioid, folderName }) {
  const [success, response] = yield patch(
    `/studio/create-folder/${studioid}`,
    {
      folderName,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'New folder created!',
        description: folderName,
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(createSubfolderFailure(msg));
  }
}

function* updateSubfolderName({ studioid, folderid, folderName }) {
  const [success, response] = yield patch(
    `/studio/update-folder-name/${studioid}`,
    {
      folderid,
      folderName,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Folder name updated!',
        description: folderName,
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(updateSubfolderNameFailure(msg));
  }
}

function* loadUserProjects({ userid, filterList }) {
  const [success, response] = yield get(
    `/user/projects/${userid}`,
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { projects } = response.data;
    const projectDetails = [];
    // Check each project for deleted flag
    projects.forEach(project => {
      // eslint-disable-next-line no-underscore-dangle
      if (!project.deleted && !filterList.includes(project._id)) {
        projectDetails.push(project);
      }
    });
    yield put(loadUserProjectsSuccess(projectDetails));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadUserProjectsFailure(msg));
  }
}

function* addProjects({ studioid, folderid, projects }) {
  const [success, response] = yield patch(
    `/studio/add-projects/${studioid}`,
    {
      folderid,
      projects,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Project(s) added into studio!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(addProjectsFailure(msg));
  }
}

function* loadSubfolderProjects({ projectids }) {
  const [success, response] = yield post(
    `/project/multiple-details`,
    {
      projectids,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { projects } = response.data;
    const projectDetails = [];
    // Check each project for deleted flag
    projects.forEach(project => {
      if (!project.deleted) {
        projectDetails.push(project);
      }
    });
    yield put(loadSubfolderProjectsSuccess(projectDetails));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadSubfolderProjectsFailure(msg));
  }
}

function* deleteSubfolders({ studioid, folderids }) {
  const [success, response] = yield patch(
    `/studio/delete-folders/${studioid}`,
    {
      folderids,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Folder(s) deleted!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(deleteSubfoldersFailure(msg));
  }
}

function* deleteProjects({ studioid, folderid, projectids }) {
  const [success, response] = yield patch(
    `/studio/remove-projects/${studioid}`,
    {
      folderid,
      projectids,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { studio } = response.data;
    yield put(updateStudioSuccess(studio));
    yield put(
      setSuccess({
        title: 'Project(s) removed from studio!',
        description: '',
      }),
    );
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(deleteProjectsFailure(msg));
  }
}

function* addComment({ studioid, comment, loadedComments }) {
  const [success, response] = yield patch(
    `/studio/add-comment/${studioid}`,
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
    yield put(loadCommentsSuccess(comments));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(addCommentFailure(msg));
  }
}

// eslint-disable-next-line no-unused-vars
function* loadComments({ studioid, pageIndex, loadedComments }) {
  if (studioid === 0) {
    yield put(loadCommentsSuccess([]));
    return;
  }
  const [success, response] = yield post(
    `/studio/comments/${studioid}`,
    {
      pageIndex,
    },
    response => response.data,
    e => e.response,
  );
  if (success) {
    const { comments } = response.data;
    /* 
     * Pagination should only serve a page at a time
     * The original idea is to concat the new page with the loadedComments
     * However, an issue is that when user is not on page 0.
     * The loadComments call that is firing in the background is not fetching new comments
     * 
     * Current quick solution is to not fetch all comments from page 0 to the current pageIndex
     * 2 Solutions:
     * - Add a date field in the backend call, to control loading of comments
     * - Subscription based model
    if (pageIndex !== 0) {
      comments = loadedComments.concat(comments);
    }
    */
    yield put(loadCommentsSuccess(comments));
  } else {
    let msg = 'Unable to reach the server, please try again later.';
    if (response) {
      msg = response.data.error;
    }
    yield put(loadCommentsFailure(msg));
  }
}

// Individual exports for testing
export default function* studioPageSaga() {
  yield takeLatest(CREATE_STUDIO, createStudio);
  yield takeLatest(LOAD_STUDIO, loadStudio);
  yield takeLatest(UPDATE_STUDIO_PERMISSIONS, updateStudioPermissions);
  yield takeLatest(UPDATE_STUDIO_INFORMATION, updateStudioInformation);
  yield takeLatest(UPDATE_STUDIO_THUMBNAIL, updateStudioThumbnail);
  yield takeLatest(ADD_FOLLOWER, addFollower);
  yield takeLatest(REMOVE_FOLLOWER, removeFollower);
  yield takeLatest(UPDATE_CURATOR_ROLE, updateCuratorRole);
  yield takeLatest(CREATE_SUBFOLDER, createSubfolder);
  yield takeLatest(UPDATE_SUBFOLDER_NAME, updateSubfolderName);
  yield takeLatest(LOAD_USER_PROJECTS, loadUserProjects);
  yield takeLatest(ADD_PROJECTS, addProjects);
  yield takeLatest(LOAD_SUBFOLDER_PROJECTS, loadSubfolderProjects);
  yield takeLatest(DELETE_SUBFOLDERS, deleteSubfolders);
  yield takeLatest(DELETE_PROJECTS, deleteProjects);
  yield takeLatest(ADD_COMMENT, addComment);
  yield takeLatest(LOAD_COMMENTS, loadComments);
}
