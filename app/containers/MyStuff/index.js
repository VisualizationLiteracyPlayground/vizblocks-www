/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * MyStuff
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, SidebarTab, Spinner, Tablist, toaster } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  loadProjects,
  loadBookmarkedProjects,
  loadStudios,
  loadProjectsFailure,
} from './actions';
import {
  makeSelectMyStuff,
  makeSelectProjects,
  makeSelectBookmarkedProjects,
  makeSelectError,
  makeSelectDeletedProjects,
  makeSelectStudios,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import NavigationBar from '../../components/NavigationBar';
import MyStuffMast from '../../components/MyStuffMast';
import ProjectListView from '../../components/ProjectListView';
import StudioListView from '../../components/StudioListView';
import { makeSelectCurrentUser } from '../App/selectors';

export function MyStuff({
  user,
  error,
  setError,
  loadProjects,
  loadBookmarkedProjects,
  loadStudios,
}) {
  useInjectReducer({ key: 'myStuff', reducer });
  useInjectSaga({ key: 'myStuff', saga });

  const [tabIndex, setTabIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const tabsList = ['My Projects', 'My Studio', 'Bookmark Projects', 'Trash'];

  useEffect(() => {
    if (user && !loaded) {
      loadProjects(user.data.id);
      loadBookmarkedProjects(user.data.id);
      loadStudios(user.data.id);
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger(error.title, {
        description: error.description,
      });
      setError(false);
    }
  }, [error]);
  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <MyStuffMast />
      <Pane padding="1.5rem">
        <Pane
          display="flex"
          height="70vh"
          background="white"
          padding="1rem"
          elevation={1}
        >
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabsList.map((tab, index) => (
              <SidebarTab
                key={tab}
                id={tab}
                onSelect={() => setTabIndex(index)}
                isSelected={index === tabIndex}
                aria-controls={`panel-${tab}`}
              >
                {tab}
              </SidebarTab>
            ))}
          </Tablist>
          <Pane
            padding={16}
            borderLeftStyle="solid"
            borderWidth="0.15rem"
            borderColor={ColorPallete.backgroundColor}
            flex="1"
          >
            {tabsList.map((tab, index) => (
              <Pane
                key={tab}
                height="100%"
                width="100%"
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={tab}
                aria-hidden={index !== tabIndex}
                display={index === tabIndex ? 'block' : 'none'}
              >
                {!loaded && <Spinner />}
                {loaded && index !== 1 && (
                  <ProjectListView
                    showDeleted={index === 3}
                    showBookmark={index === 2}
                  />
                )}
                {loaded && index === 1 && <StudioListView />}
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

MyStuff.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myStuff: makeSelectMyStuff(),
  projects: makeSelectProjects(),
  deletedProjects: makeSelectDeletedProjects(),
  bookmarkedProjects: makeSelectBookmarkedProjects(),
  studios: makeSelectStudios(),
  error: makeSelectError(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProjects: userid => dispatch(loadProjects(userid)),
    loadBookmarkedProjects: userid => dispatch(loadBookmarkedProjects(userid)),
    loadStudios: userid => dispatch(loadStudios(userid)),
    setError: error => dispatch(loadProjectsFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyStuff);
