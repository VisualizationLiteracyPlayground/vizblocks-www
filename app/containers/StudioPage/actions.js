/*
 *
 * StudioPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CREATE_STUDIO,
  CREATE_STUDIO_FAILURE,
  CREATE_STUDIO_SUCCESS,
  LOAD_STUDIO,
  LOAD_STUDIO_FAILURE,
  LOAD_STUDIO_SUCCESS,
  UPDATE_STUDIO_PERMISSIONS,
  UPDATE_STUDIO_PERMISSIONS_FAILURE,
  UPDATE_STUDIO_INFORMATION,
  UPDATE_STUDIO_INFORMATION_FAILURE,
  UPDATE_STUDIO_THUMBNAIL,
  UPDATE_STUDIO_THUMBNAIL_FAILURE,
  ADD_FOLLOWER,
  ADD_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER,
  REMOVE_FOLLOWER_FAILURE,
  UPDATE_CURATOR_ROLE,
  UPDATE_CURATOR_ROLE_FAILURE,
  CREATE_SUBFOLDER,
  CREATE_SUBFOLDER_FAILURE,
  UPDATE_SUBFOLDER_NAME,
  UPDATE_SUBFOLDER_NAME_FAILURE,
  ADD_PROJECTS,
  ADD_PROJECTS_FAILURE,
  DELETE_SUBFOLDERS,
  DELETE_SUBFOLDERS_FAILURE,
  DELETE_PROJECTS,
  DELETE_PROJECTS_FAILURE,
  UPDATE_STUDIO_SUCCESS,
  LOAD_USER_PROJECTS,
  LOAD_USER_PROJECTS_FAILURE,
  LOAD_USER_PROJECTS_SUCCESS,
  LOAD_SUBFOLDER_PROJECTS,
  LOAD_SUBFOLDER_PROJECTS_FAILURE,
  LOAD_SUBFOLDER_PROJECTS_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createStudio() {
  return {
    type: CREATE_STUDIO,
  };
}

export function createStudioFailure(error) {
  return {
    type: CREATE_STUDIO_FAILURE,
    error,
  };
}

export function createStudioSuccess(studio) {
  return {
    type: CREATE_STUDIO_SUCCESS,
    studio,
  };
}

export function loadStudio(studioid) {
  return {
    type: LOAD_STUDIO,
    studioid,
  };
}

export function loadStudioFailure(error) {
  return {
    type: LOAD_STUDIO_FAILURE,
    error,
  };
}

export function loadStudioSuccess(studio) {
  return {
    type: LOAD_STUDIO_SUCCESS,
    studio,
  };
}

export function updateStudioPermissions(studioid, permissions) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS,
    studioid,
    permissions,
  };
}

export function updateStudioPermissionsFailure(error) {
  return {
    type: UPDATE_STUDIO_PERMISSIONS_FAILURE,
    error,
  };
}

export function updateStudioInformation(studioid, information) {
  return {
    type: UPDATE_STUDIO_INFORMATION,
    studioid,
    information,
  };
}

export function updateStudioInformationFailure(error) {
  return {
    type: UPDATE_STUDIO_INFORMATION_FAILURE,
    error,
  };
}

export function updateStudioThumbnail(studioid, filename, data, contentType) {
  return {
    type: UPDATE_STUDIO_THUMBNAIL,
    studioid,
    filename,
    data,
    contentType,
  };
}

export function updateStudioThumbnailFailure(error) {
  return {
    type: UPDATE_STUDIO_THUMBNAIL_FAILURE,
    error,
  };
}

export function addFollower(studioid) {
  return {
    type: ADD_FOLLOWER,
    studioid,
  };
}

export function addFollowerFailure(error) {
  return {
    type: ADD_FOLLOWER_FAILURE,
    error,
  };
}

export function removeFollower(studioid) {
  return {
    type: REMOVE_FOLLOWER,
    studioid,
  };
}

export function removeFollowerFailure(error) {
  return {
    type: REMOVE_FOLLOWER_FAILURE,
    error,
  };
}

export function updateCuratorRole(studioid, curatorid, curatorRole) {
  return {
    type: UPDATE_CURATOR_ROLE,
    studioid,
    curatorid,
    curatorRole,
  };
}

export function updateCuratorRoleFailure(error) {
  return {
    type: UPDATE_CURATOR_ROLE_FAILURE,
    error,
  };
}

export function createSubfolder(studioid, folderName) {
  return {
    type: CREATE_SUBFOLDER,
    studioid,
    folderName,
  };
}

export function createSubfolderFailure(error) {
  return {
    type: CREATE_SUBFOLDER_FAILURE,
    error,
  };
}

export function updateSubfolderName(studioid, folderid, folderName) {
  return {
    type: UPDATE_SUBFOLDER_NAME,
    studioid,
    folderid,
    folderName,
  };
}

export function updateSubfolderNameFailure(error) {
  return {
    type: UPDATE_SUBFOLDER_NAME_FAILURE,
    error,
  };
}

export function addProjects(studioid, folderid, projects) {
  return {
    type: ADD_PROJECTS,
    studioid,
    folderid,
    projects,
  };
}

export function addProjectsFailure(error) {
  return {
    type: ADD_PROJECTS_FAILURE,
    error,
  };
}

export function deleteSubfolders(studioid, folderids) {
  return {
    type: DELETE_SUBFOLDERS,
    studioid,
    folderids,
  };
}

export function deleteSubfoldersFailure(error) {
  return {
    type: DELETE_SUBFOLDERS_FAILURE,
    error,
  };
}

export function deleteProjects(studioid, folderid, projectids) {
  return {
    type: DELETE_PROJECTS,
    studioid,
    folderid,
    projectids,
  };
}

export function deleteProjectsFailure(error) {
  return {
    type: DELETE_PROJECTS_FAILURE,
    error,
  };
}

export function updateStudioSuccess(studio) {
  return {
    type: UPDATE_STUDIO_SUCCESS,
    studio,
  };
}

export function loadUserProjects(userid, filterList) {
  return {
    type: LOAD_USER_PROJECTS,
    userid,
    filterList,
  };
}

export function loadUserProjectsFailure(error) {
  return {
    type: LOAD_USER_PROJECTS_FAILURE,
    error,
  };
}

export function loadUserProjectsSuccess(userProjects) {
  return {
    type: LOAD_USER_PROJECTS_SUCCESS,
    userProjects,
  };
}

export function loadSubfolderProjects(projectids) {
  return {
    type: LOAD_SUBFOLDER_PROJECTS,
    projectids,
  };
}

export function loadSubfolderProjectsFailure(error) {
  return {
    type: LOAD_SUBFOLDER_PROJECTS_FAILURE,
    error,
  };
}

export function loadSubfolderProjectsSuccess(subfolderProjects) {
  return {
    type: LOAD_SUBFOLDER_PROJECTS_SUCCESS,
    subfolderProjects,
  };
}

export function addComment(studioid, comment, loadedComments) {
  return {
    type: ADD_COMMENT,
    studioid,
    comment,
    loadedComments,
  };
}

export function addCommentFailure(error) {
  return {
    type: ADD_COMMENT_FAILURE,
    error,
  };
}

export function loadComments(studioid, pageIndex, loadedComments) {
  return {
    type: LOAD_COMMENTS,
    studioid,
    pageIndex,
    loadedComments,
  };
}

export function loadCommentsFailure(error) {
  return {
    type: LOAD_COMMENTS_FAILURE,
    error,
  };
}

export function loadCommentsSuccess(comments) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    comments,
  };
}
