/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
/**
 *
 * RegisterUser
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Card,
  Checkbox,
  Heading,
  Paragraph,
  Strong,
  TextInputField,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { registerUser, registerUserFailure } from './actions';
import makeSelectRegisterUser, { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import LogoWord from '../../components/LogoWord';
import RegistrationConfirmationDialog from '../../components/RegistrationConfirmation';

const formFields = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
};

export function RegisterUser({ error, setError, registerUser }) {
  useInjectReducer({ key: 'registerUser', reducer });
  useInjectSaga({ key: 'registerUser', saga });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [shouldDisplayPassword, setShouldDisplayPassword] = useState(false);
  const [confirmationIsShown, setConfirmationIsShown] = useState(false);

  function confirmationCloseCallback() {
    setConfirmationIsShown(false);
  }

  function confirmationSuccessCallback() {
    setConfirmationIsShown(false);
    registerUser(username, email, password);
  }

  // Returns null if field is valid
  // Else returns validation message
  function validateFormFields(field) {
    switch (field) {
      case formFields.USERNAME:
        return username === '' ? 'Username is required' : null;
      case formFields.EMAIL:
        if (email === '') {
          return 'Email is required';
        }
        const lastAtPos = email.lastIndexOf('@');
        const lastDotPos = email.lastIndexOf('.');

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf('@@') === -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2
          )
        ) {
          return 'Email is not valid';
        }
        return null;
      case formFields.PASSWORD:
        if (password === '') {
          return 'Password is required';
        }
        if (password && password.length < 8) {
          return 'Password must be of 8 characters or more';
        }
        if (
          password &&
          !/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)
        ) {
          return 'Password needs at least 1 number 1 alphabet';
        }
        return null;
      default:
        return 'This field is required';
    }
  }

  // Returns null if all form fields are valid
  // Else returns validation message
  function validateForm() {
    const usernameValidation = validateFormFields(formFields.USERNAME);
    if (usernameValidation) {
      return usernameValidation;
    }
    const emailValidation = validateFormFields(formFields.EMAIL);
    if (emailValidation) {
      return emailValidation;
    }
    const passwordValidation = validateFormFields(formFields.PASSWORD);
    if (passwordValidation) {
      return passwordValidation;
    }
    if (password !== retypePassword) {
      return "Passwords don't match";
    }
    return null;
  }

  useEffect(() => {
    if (error) {
      toaster.danger('Registration failed', {
        description: error,
      });
      setError(false);
    }
  }, [error]);

  return (
    <div
      style={{
        backgroundColor: ColorPallete.primaryColor,
        display: 'flex',
      }}
    >
      <div
        style={{
          overlay: { zIndex: 10 },
          position: 'absolute',
        }}
      >
        <Link to="/">
          <LogoWord />
        </Link>
      </div>
      <div
        style={{
          backgroundColor: ColorPallete.primaryColor,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          background="white"
          width="40vw"
          padding="2rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size={800}>Join VizBlocks</Heading>
          <Strong size={500} marginTop="0.5rem">
            {"Create projects, share ideas, make friends. It's free!"}
          </Strong>
          <TextInputField
            width="80%"
            marginTop="2rem"
            label="Create your username"
            placeholder="username"
            required
            validationMessage={validateFormFields(formFields.USERNAME)}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextInputField
            width="80%"
            label="Email address"
            placeholder="email"
            required
            validationMessage={validateFormFields(formFields.EMAIL)}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextInputField
            type={shouldDisplayPassword ? 'text' : 'password'}
            width="80%"
            label="Choose a password"
            placeholder="password"
            required
            validationMessage={validateFormFields(formFields.PASSWORD)}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextInputField
            type={shouldDisplayPassword ? 'text' : 'password'}
            width="80%"
            label="Confirm password"
            placeholder="Type password again"
            required
            validationMessage={
              retypePassword === '' ? 'This field is required' : null
            }
            value={retypePassword}
            onChange={e => setRetypePassword(e.target.value)}
          />
          <Checkbox
            label="Show password"
            checked={shouldDisplayPassword}
            onChange={e => setShouldDisplayPassword(e.target.checked)}
          />
          <Button
            onClick={() => {
              const validation = validateForm();
              return validation
                ? toaster.danger(validation)
                : setConfirmationIsShown(true);
            }}
          >
            Create
          </Button>
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <Paragraph
              color={ColorPallete.accentColor}
              marginTop="1rem"
              size={300}
            >
              <b>Already have account? Sign in instead</b>
            </Paragraph>
          </Link>
        </Card>
        <RegistrationConfirmationDialog
          isShown={confirmationIsShown}
          information={{ username, email }}
          closeCallback={confirmationCloseCallback}
          confirmCallback={confirmationSuccessCallback}
        />
      </div>
    </div>
  );
}

RegisterUser.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerUser: makeSelectRegisterUser(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUser: (username, email, password) =>
      dispatch(registerUser(username, email, password)),
    setError: error => dispatch(registerUserFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(RegisterUser);
