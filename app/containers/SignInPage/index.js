/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * SignInPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Card, Heading, TextInputField, toaster } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { userSignIn, userSignInFailure } from './actions';
import makeSelectSignInPage, { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import LogoWord from '../../components/LogoWord';

export function SignInPage({ error, setError, userSignIn }) {
  useInjectReducer({ key: 'signInPage', reducer });
  useInjectSaga({ key: 'signInPage', saga });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function requestSignIn() {
    userSignIn(email, password);
  }

  function validateInputs() {
    return email !== '' && password !== '';
  }

  useEffect(() => {
    if (error) {
      toaster.danger('Login failed', {
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
          <Heading size={800}>Sign in</Heading>
          <TextInputField
            width="80%"
            marginTop="2rem"
            label="Email"
            placeholder="email"
            required
            validationMessage={email === '' ? 'Email is required' : null}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextInputField
            type="password"
            width="80%"
            label="Password"
            placeholder="password"
            required
            validationMessage={password === '' ? 'Password is required' : null}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                if (validateInputs()) {
                  requestSignIn();
                } else {
                  toaster.danger('Invalid email/password');
                }
              }
            }}
          />
          <Button
            onClick={() =>
              validateInputs()
                ? requestSignIn()
                : toaster.danger('Invalid email/password')
            }
            appearance="primary"
            intent="success"
          >
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

SignInPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signInPage: makeSelectSignInPage(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(userSignInFailure(error)),
    userSignIn: (email, password) => dispatch(userSignIn(email, password)),
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
)(SignInPage);
