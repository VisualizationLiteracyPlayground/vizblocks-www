/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterUser from 'containers/RegisterUser/';
import SignInPage from 'containers/SignInPage';

import {
  makeSelectCurrentUser,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import { setError, setSuccess, userSignedIn } from './actions';
import GlobalStyle from '../../global-styles';

function App({ error, setError, success, setSuccess, user, userSignedIn }) {
  const [loaded, setLoaded] = useState(false);
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    if (!user && storedUser) {
      const temp = JSON.parse(storedUser);
      if (temp.data && !temp.user) {
        temp.user = temp.data;
      }
      userSignedIn(temp);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (error) {
      toaster.danger(error.title, {
        description: error.description,
      });
      setError(false);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      toaster.success(success.title, {
        description: success.description,
      });
      setSuccess(false);
    }
  }, [success]);
  return (
    <div>
      {loaded && (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register-user" component={RegisterUser} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(setError(error)),
    setSuccess: success => dispatch(setSuccess(success)),
    userSignedIn: user => dispatch(userSignedIn(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
