/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import {
  SET_ERROR,
  SET_SUCCESS,
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_UPDATED_PROFILE_PICTURE,
  USER_UPDATED_USERNAME,
} from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  success: false,
  currentUser: false,
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ERROR:
        draft.error = action.error;
        break;
      case SET_SUCCESS:
        draft.success = action.msg;
        break;
      case USER_SIGNED_IN:
        const user = { ...action };
        delete user.type;
        draft.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        break;
      case USER_SIGNED_OUT:
        draft.currentUser = false;
        localStorage.removeItem('user');
        draft.success = { title: "Signed out!" };
        break;
      case USER_UPDATED_PROFILE_PICTURE:
        let userObj = draft.currentUser;
        userObj.data.image = action.image;
        draft.currentUser = userObj;
        localStorage.setItem('user', JSON.stringify(userObj));
        break;
      case USER_UPDATED_USERNAME:
        userObj = draft.currentUser;
        userObj.data.username = action.username;
        draft.currentUser = userObj;
        localStorage.setItem('user', JSON.stringify(userObj));
        break;
      default:
        return draft;
    }
  });

export default appReducer;