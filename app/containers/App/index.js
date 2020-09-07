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

import React, { memo, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterUser from 'containers/RegisterUser/';
import SignInPage from 'containers/SignInPage';

import { makeSelectError, makeSelectSuccess } from './selectors';
import { setError, setSuccess } from './actions';
import GlobalStyle from '../../global-styles';

function App({ error, setError, success }) {
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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register-user" component={RegisterUser} />
        <Route exact path="/sign-in" component={SignInPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(setError(error)),
    setSuccess: error => dispatch(setSuccess(error)),
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
