/* eslint-disable react/prop-types */
/**
 *
 * SignInPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Card, Heading, TextInputField, toaster } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectSignInPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import LogoWord from '../../components/LogoWord';

export function SignInPage({ history }) {
  useInjectReducer({ key: 'signInPage', reducer });
  useInjectSaga({ key: 'signInPage', saga });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function requestSignIn() {
    // Call api to sign in
    toaster.success('Sign in successful!');
    history.push('/');
  }

  function validateInputs() {
    return username !== '' && password !== '';
  }

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
            label="Username"
            placeholder="username"
            required
            validationMessage={username === '' ? 'Username is required' : null}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextInputField
            type="password"
            width="80%"
            label="Choose a password"
            placeholder="password"
            required
            validationMessage={password === '' ? 'Password is required' : null}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            onClick={() =>
              validateInputs()
                ? requestSignIn()
                : toaster.danger('Invalid username/password')
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
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
