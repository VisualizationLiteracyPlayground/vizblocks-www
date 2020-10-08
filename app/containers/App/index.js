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
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'containers/HomePage/Loadable';
import MyStuff from 'containers/MyStuff/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegisterUser from 'containers/RegisterUser/Loadable';
import SignInPage from 'containers/SignInPage/Loadable';
import StudioPage from 'containers/StudioPage/Loadable';
import VizblocksGui from 'containers/VizblocksGui';

import {
  makeSelectCurrentUser,
  makeSelectError,
  makeSelectSuccess,
} from './selectors';
import { setError, setSuccess, userSignedIn } from './actions';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
  max-height: 100vh;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);
`;
window.onresize = () => {
  document.body.height = window.innerHeight;
};
window.onresize();

export function App({
  error,
  setError,
  success,
  setSuccess,
  user,
  userSignedIn,
}) {
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
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);
  return (
    <AppWrapper>
      <Helmet titleTemplate="Vizblocks" defaultTitle="Vizblocks">
        <meta name="description" content="Education tool for data literacy!" />
      </Helmet>
      {loaded && (
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute
            path="/my-stuff"
            isAuthenticated={user}
            component={MyStuff}
          />
          <Route exact path="/register-user" component={RegisterUser} />
          <Route exact path="/sign-in" component={SignInPage} />
          <PrivateRoute
            path="/project-gui"
            isAuthenticated={user}
            component={VizblocksGui}
          />
          <Route exact path="/studio" component={StudioPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
      <GlobalStyle />
    </AppWrapper>
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
