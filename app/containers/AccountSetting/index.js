/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * AccountSetting
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  EyeOpenIcon,
  Heading,
  IconButton,
  Pane,
  Text,
  TextInputField,
  TickCircleIcon,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectAccountSetting,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import {
  updateSuccess,
  updateFailure,
  updateUsername,
  updatePassword,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';

function validateUsername(username, isAdmin) {
  if (username === '') {
    return 'Username is required';
  }
  if (username.length > 50) {
    return `${username.length}/50 characters`;
  }
  if (username.length < 3) {
    return 'Username needs to be at least 3 characters';
  }
  if (!isAdmin && username.toLowerCase().includes('vizblock')) {
    return 'Website name is reserved and unavailable as username';
  }
  return null;
}

function validatePassword(password) {
  if (password === '') {
    return 'Password is required';
  }
  if (password && password.length < 8) {
    return 'Password must be of 8 characters or more';
  }
  if (password && !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) {
    return 'Password needs at least 1 number 1 alphabet';
  }
  return null;
}

function validatePasswordConfirmation(password, retypePassword) {
  return password === retypePassword ? null : "New passwords don't match";
}

export function AccountSetting({
  user,
  error,
  success,
  setError,
  setSuccess,
  updateUsername,
  updatePassword,
}) {
  useInjectReducer({ key: 'accountSetting', reducer });
  useInjectSaga({ key: 'accountSetting', saga });

  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState('password');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [retypePassword, setRetypePassword] = useState('');
  const [showRetypePassword, setShowRetypePassword] = useState('password');

  function makeSubmitPasswordValid() {
    return (
      !validatePassword(oldPassword) &&
      !validatePassword(password) &&
      !validatePassword(retypePassword) &&
      !validatePasswordConfirmation(password, retypePassword)
    );
  }

  function resetPasswordFields() {
    setOldPassword('');
    setPassword('');
    setRetypePassword('');
  }

  useEffect(() => {
    if (error) {
      toaster.danger('', {
        description: error,
      });
      setError(false);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      toaster.success('', {
        description: success,
      });
      setSuccess(false);
    }
  }, [success]);

  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      background={ColorPallete.secondaryColor}
    >
      <NavigationBar user={user} />
      <Pane
        height="92vh"
        display="flex"
        padding="2rem"
        background={ColorPallete.secondaryColor}
      >
        <Pane
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
          background="white"
          elavation={1}
          paddingX="3rem"
          aria-label="Elevated-pane"
        >
          <Heading size={600} marginTop="2rem">
            Account Settings
          </Heading>
          <Pane
            width="100%"
            borderColor={ColorPallete.lightGrey}
            borderWidth="0.1rem"
            borderTopStyle="solid"
            marginY="1.5rem"
            aria-label="Horizontal divider"
          />
          <Pane
            display="flex"
            flexDirection="column"
            height="100%"
            width="100%"
            marginBottom="2rem"
            overflowY="auto"
            aria-label="options"
          >
            <Pane
              display="flex"
              flexDirection="column"
              aria-label="change-username"
            >
              <Text size={500}>
                <b>Change your username</b>
              </Text>
              <Text size={400} marginTop="1rem" color="grey">
                Current username
              </Text>
              <Pane display="flex" alignItems="center" marginTop="0.5rem">
                <Text size={400} color="black">
                  {user.data.username}
                </Text>
                <TickCircleIcon color="success" marginLeft="0.5rem" />
              </Pane>
              <Text size={400} marginTop="0.5rem" color="grey">
                New username
              </Text>
              <TextInputField
                width="350px"
                id="new-username"
                label=""
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                marginBottom="0.5rem"
                validationMessage={validateUsername(
                  newUsername,
                  user.data.isAdmin,
                )}
              />
              <Pane display="flex">
                <Button
                  intent="success"
                  appearance="primary"
                  disabled={validateUsername(newUsername, user.data.isAdmin)}
                  onClick={() => {
                    updateUsername(newUsername);
                    setNewUsername('');
                  }}
                >
                  Change username
                </Button>
              </Pane>
            </Pane>
            <Pane
              display="flex"
              flexDirection="column"
              aria-label="change-password"
            >
              <Text size={500} marginTop="1.5rem">
                <b>Change your password</b>
              </Text>
              <Text size={400} marginTop="1rem" color="grey">
                Old password
              </Text>
              <Pane display="flex">
                <TextInputField
                  width="350px"
                  id="old-password"
                  label=""
                  type={showOldPassword}
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  marginBottom="0.5rem"
                  validationMessage={validatePassword(oldPassword)}
                />
                <IconButton
                  icon={EyeOpenIcon}
                  marginTop="0.3rem"
                  marginLeft="0.5rem"
                  appearance="minimal"
                  // eslint-disable-next-line no-unused-vars
                  onMouseDown={event => setShowOldPassword('text')}
                  // eslint-disable-next-line no-unused-vars
                  onMouseUp={event => setShowOldPassword('password')}
                />
              </Pane>
              <Text size={400} color="grey">
                New password
              </Text>
              <Pane display="flex">
                <TextInputField
                  width="350px"
                  id="new-password"
                  label=""
                  type={showPassword}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  marginBottom="0.5rem"
                  validationMessage={
                    validatePassword(password) ||
                    validatePasswordConfirmation(password, retypePassword)
                  }
                />
                <IconButton
                  icon={EyeOpenIcon}
                  marginTop="0.3rem"
                  marginLeft="0.5rem"
                  appearance="minimal"
                  // eslint-disable-next-line no-unused-vars
                  onMouseDown={event => setShowPassword('text')}
                  // eslint-disable-next-line no-unused-vars
                  onMouseUp={event => setShowPassword('password')}
                />
              </Pane>
              <Text size={400} color="grey">
                New password confirmation
              </Text>
              <Pane display="flex">
                <TextInputField
                  width="350px"
                  id="retype-password"
                  label=""
                  type={showRetypePassword}
                  value={retypePassword}
                  onChange={e => setRetypePassword(e.target.value)}
                  marginBottom="0.5rem"
                  validationMessage={
                    validatePassword(retypePassword) ||
                    validatePasswordConfirmation(password, retypePassword)
                  }
                />
                <IconButton
                  icon={EyeOpenIcon}
                  marginTop="0.3rem"
                  marginLeft="0.5rem"
                  appearance="minimal"
                  // eslint-disable-next-line no-unused-vars
                  onMouseDown={event => setShowRetypePassword('text')}
                  // eslint-disable-next-line no-unused-vars
                  onMouseUp={event => setShowRetypePassword('password')}
                />
              </Pane>
              <Pane display="flex">
                <Button
                  intent="success"
                  appearance="primary"
                  marginBottom="1.5rem"
                  disabled={!makeSubmitPasswordValid()}
                  onClick={() => {
                    updatePassword(oldPassword, password);
                    resetPasswordFields();
                  }}
                >
                  Change password
                </Button>
              </Pane>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

AccountSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountSetting: makeSelectAccountSetting(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(updateFailure(error)),
    setSuccess: success => dispatch(updateSuccess(success)),
    updateUsername: username => dispatch(updateUsername(username)),
    updatePassword: (oldPassword, newPassword) =>
      dispatch(updatePassword(oldPassword, newPassword)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountSetting);
