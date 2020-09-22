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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectVizblocksGui from './selectors';
import reducer from './reducer';
import saga from './saga';

const redux = require('redux');
const thunk = require('redux-thunk').default;
const { Provider } = require('react-redux');
const { IntlProvider } = require('react-intl');

const ProjectView = require('./project-view.jsx');

export function VizblocksGui() {
  useInjectReducer({ key: 'vizblocksGui', reducer });
  useInjectSaga({ key: 'vizblocksGui', saga });

  const locale = window._locale || 'en';
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

  const store = redux.createStore(reducers, initState, enhancers);

  const messages = {};

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <ProjectView.View />
      </IntlProvider>
    </Provider>
  );
}

VizblocksGui.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vizblocksGui: makeSelectVizblocksGui(),
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
