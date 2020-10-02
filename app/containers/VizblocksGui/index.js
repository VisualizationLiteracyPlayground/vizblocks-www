/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VizblocksGui
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';

import { makeSelectVizblocksGui } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from '../App/selectors';

const redux = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { IntlProvider } = require('react-intl');

const ProjectView = require('./project-view.jsx');

export function VizblocksGui({ user }) {
  useInjectReducer({ key: 'vizblocksGui', reducer });
  useInjectSaga({ key: 'vizblocksGui', saga });

  const location = useLocation();
  const title = location.state ? location.state.title : '';
  const projectid = location.state ? location.state.projectid : 0;

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

  return (
    <Provider store={createStore()}>
      <IntlProvider locale={locale} messages={messages}>
        <ProjectView.View
          user={user}
          projectid={projectid}
          title={title}
          history={history}
        />
      </IntlProvider>
    </Provider>
  );
}

VizblocksGui.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vizblocksGui: makeSelectVizblocksGui(),
  user: makeSelectCurrentUser(),
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
)(VizblocksGui);
