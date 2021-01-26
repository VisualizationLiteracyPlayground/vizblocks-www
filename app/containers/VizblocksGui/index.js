/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VizblocksGui
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';

import { remixProject, remixProjectSuccess } from './actions';
import { makeSelectVizblocksGui, makeSelectRemixResponse } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from '../App/selectors';
import { setSuccess, setError } from '../App/actions';

/*
const redux = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { IntlProvider } = require('react-intl');
*/

const ProjectView = require('./project-view.jsx');

export function VizblocksGui({
  user,
  setSuccess,
  setError,
  remixResponse,
  remixProject,
  remixProjectSuccess,
}) {
  useInjectReducer({ key: 'vizblocksGui', reducer });
  useInjectSaga({ key: 'vizblocksGui', saga });

  const location = useLocation();
  const [title, setTitle] = useState(
    location.state ? location.state.title : '',
  );
  const [projectid, setProjectid] = useState(
    location.state ? location.state.projectid : 0,
  );
  const [authorid, setAuthorid] = useState(
    location.state ? location.state.authorid : null,
  );
  const [isRemixing, setIsRemixing] = useState(
    location.state ? location.state.isRemixing : false,
  );

  useEffect(() => {
    if (isRemixing) {
      remixProject(projectid);
    }
  }, []);
  useEffect(() => {
    if (remixResponse) {
      setIsRemixing(false);
      setAuthorid(user.data.id);
      setProjectid(remixResponse.id);
      setTitle(remixResponse['content-title']);
      // This is needed so that "create project" works
      remixProjectSuccess(null);
    }
  }, [remixResponse]);
  /*
  // Code yoinked from scratch-www, not sure if it's a neccesity

  const locale = window._locale || 'en';
  const messages = {};

  function createStore() {
    const allReducer = {
      ...ProjectView.guiReducers,
    };

    const reducers = redux.combineReducers(allReducer);

    const initState = {
      locales: ProjectView.initLocale(ProjectView.localesInitialState, locale),
      scratchGui: ProjectView.initGuiState(ProjectView.guiInitialState),
    };

    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
    const enhancers = composeEnhancers(
      redux.applyMiddleware(thunk),
      ProjectView.guiMiddleware,
    );
    return redux.createStore(reducers, initState, enhancers);
  }

  // Wrap ProjectView.View in this
  // <Provider store={createStore()}>
  //   <IntlProvider locale={locale} messages={messages}>
  */

  return (
    <ProjectView.View
      user={user}
      projectid={projectid}
      title={title}
      history={history}
      location={location}
      authorid={authorid}
      setSuccess={setSuccess}
      setError={setError}
      key={projectid}
    />
  );
}

VizblocksGui.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vizblocksGui: makeSelectVizblocksGui(),
  user: makeSelectCurrentUser(),
  remixResponse: makeSelectRemixResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setSuccess: (title, description) =>
      dispatch(setSuccess({ title, description, overwriteZIndex: true })),
    setError: (title, description) =>
      dispatch(setError({ title, description, overwriteZIndex: true })),
    remixProject: projectid => dispatch(remixProject(projectid)),
    remixProjectSuccess: remixResponse =>
      dispatch(remixProjectSuccess(remixResponse)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VizblocksGui);
