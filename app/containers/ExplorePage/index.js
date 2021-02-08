/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * ExplorePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, Strong, toaster } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectExplorePage,
  makeSelectProjects,
  makeSelectError,
} from './selectors';
import { searchProjects, searchFailure } from './actions';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import ExploreProjects from '../../components/ExploreProjects';

const tabs = ['Projects', 'Studios', 'Users'];
const PAGE_LIMIT = 14;

export function ExplorePage({
  user,
  projects,
  error,
  searchProjects,
  setError,
}) {
  useInjectReducer({ key: 'explorePage', reducer });
  useInjectSaga({ key: 'explorePage', saga });

  const [currentTab, setCurrentTab] = useState(0);
  const [queryPacket, setQueryPacket] = useState({
    offset: 0,
    limit: PAGE_LIMIT,
    tag: 'all',
    visualizationTag: [],
    queryString: '',
    userid: user ? user.data.id : 0,
  });

  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger(error.error);
      setError(false);
    }
  }, [error]);
  useEffect(() => {
    searchProjects(queryPacket);
  }, [queryPacket]);

  return (
    <Pane height="100vh" background={ColorPallete.secondaryColor}>
      <NavigationBar user={user} />
      <Pane display="flex" aria-label="header" background="white">
        <Pane display="flex" flexGrow={1} />
        <Pane
          display="flex"
          aria-label="tutorial type"
          flexDirection="row"
          marginTop="0.5rem"
        >
          {tabs.map((tabTitle, idx) => (
            <Pane
              key={tabTitle}
              display="flex"
              flexDirection="column"
              justifyItems="center"
              alignItems="center"
              onClick={() => setCurrentTab(idx)}
            >
              <Strong size={500} color={currentTab === idx ? 'black' : 'grey'}>
                {tabTitle}
              </Strong>
              <Pane
                width="10vw"
                borderColor={
                  currentTab === idx ? ColorPallete.accentColor : 'white'
                }
                borderWidth="0.3rem"
                borderTopStyle="solid"
                marginTop="0.3rem"
                aria-label="Horizontal divider"
              />
            </Pane>
          ))}
        </Pane>
        <Pane display="flex" flexGrow={1} />
      </Pane>
      {currentTab === 0 && (
        <ExploreProjects
          projects={projects}
          setQueryPacket={setQueryPacket}
          pageLimit={PAGE_LIMIT}
          user={user}
        />
      )}
    </Pane>
  );
}

ExplorePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  explorePage: makeSelectExplorePage(),
  user: makeSelectCurrentUser(),
  projects: makeSelectProjects(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchProjects: queryPacket => dispatch(searchProjects(queryPacket)),
    setError: error => dispatch(searchFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ExplorePage);
