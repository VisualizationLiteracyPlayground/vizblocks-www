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
import { Switch, Route, Redirect } from 'react-router-dom';
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
import EditUserPage from 'containers/EditUserPage/Loadable';
import UserPage from 'containers/UserPage/Loadable';
import IdeasPage from 'containers/IdeasPage/Loadable';
import ExplorePage from 'containers/ExplorePage/Loadable';
import VideoTutorialPage from 'containers/VideoTutorialPage/Loadable';
import InteractiveTutorialPage from 'containers/InteractiveTutorialPage/Loadable';
import ProjectPreview from 'containers/ProjectPreview/Loadable';
import VlatLandingPage from 'containers/VlatLandingPage/Loadable';
import VlatCategoryPage from 'containers/VlatCategoryPage/Loadable';
import VlatQuizPage from 'containers/VlatQuizPage/Loadable';
import VlatStats from 'containers/VlatStats/Loadable';

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

  // Evergreen-ui toaster has zIndex of 30
  // Scratch-gui components have custom zIndex up to the 1000 range
  function overwriteToasterZIndex() {
    const toasterOverlay = document.getElementsByClassName('css-1sugtjn');
    if (toasterOverlay[0]) {
      toasterOverlay[0].style.zIndex = '9000';
    }
  }

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
      if (error.overwriteZIndex) {
        overwriteToasterZIndex();
      }
      setError(false);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      toaster.success(success.title, {
        description: success.description,
      });
      if (success.overwriteZIndex) {
        overwriteToasterZIndex();
      }
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
          <Route exact path="/ideas" component={IdeasPage} />
          <Route exact path="/explore" component={ExplorePage} />
          <Route
            exact
            path="/ideas/video-tutorials"
            component={VideoTutorialPage}
          />
          <Route
            exact
            path="/ideas/interactive-tutorials"
            component={InteractiveTutorialPage}
          />
          <Route exact path="/ideas/vlat" component={VlatLandingPage} />
          <Route
            exact
            path="/ideas/vlat/:testType"
            component={VlatCategoryPage}
          />
          <Route
            exact
            path="/vlat-quiz/:testType/:visualizationType"
            component={VlatQuizPage}
          />
          <PrivateRoute
            path="/vlat-stats"
            isAuthenticated={user}
            component={VlatStats}
          />
          <Route exact path="/register-user" component={RegisterUser} />
          <Route exact path="/sign-in" component={SignInPage} />
          <PrivateRoute
            path="/project-gui"
            isAuthenticated={user}
            component={VizblocksGui}
          />
          <Route exact path="/project-preview" component={ProjectPreview} />
          <Route
            exact
            path="/share-project/:projectid"
            render={props => (
              <Redirect
                to={{
                  pathname: '/project-preview',
                  state: { projectid: props.match.params.projectid },
                }}
              />
            )}
          />
          <PrivateRoute
            path="/edit-profile"
            isAuthenticated={user}
            component={EditUserPage}
          />
          <Route exact path="/user-profile/:profileid" component={UserPage} />
          <Route exact path="/studio" component={StudioPage} />
          <Route
            exact
            path="/share-studio/:studioid"
            render={props => (
              <Redirect
                to={{
                  pathname: '/studio',
                  state: { studioid: props.match.params.studioid },
                }}
              />
            )}
          />
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
