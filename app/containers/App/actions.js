/* eslint-disable prettier/prettier */
/*
 *
 * App actions
 * 
 */

import { SET_ERROR, SET_SUCCESS } from './constants';

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function setSuccess(msg) {
  return {
    type: SET_SUCCESS,
    msg,
  };
}
