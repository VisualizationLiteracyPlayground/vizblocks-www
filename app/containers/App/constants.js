/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_ERROR = 'app/App/SET_ERROR';
export const SET_SUCCESS = 'app/App/SET_SUCCESS';
export const USER_SIGNED_IN = 'app/App/USER_SIGNED_IN';
export const USER_SIGNED_OUT = 'app/App/USER_SIGNED_OUT';
export const USER_UPDATED_PROFILE_PICTURE =
  'app/App/USER_UPDATED_PROFILE_PICTURE';
export const USER_UPDATED_USERNAME = 'app/App/USER_UPDATED_USERNAME';
