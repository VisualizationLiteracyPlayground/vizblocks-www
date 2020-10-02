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
import {
  BookmarkIcon,
  CommentIcon,
  EyeOpenIcon,
  ForkIcon,
  Heading,
  HeartIcon,
  Pane,
  Paragraph,
  SidebarTab,
  Spinner,
  Tablist,
  Table,
  Text,
  TrashIcon,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-project-thumbnail.png';

import { loadProjects, loadProjectsFailure } from './actions';
import {
  makeSelectMyStuff,
  makeSelectProjects,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import NavigationBar from '../../components/NavigationBar';
import MyStuffMast from '../../components/MyStuffMast';
import { makeSelectCurrentUser } from '../App/selectors';

export function MyStuff({ user, projects, error, setError, loadProjects }) {
  useInjectReducer({ key: 'myStuff', reducer });
  useInjectSaga({ key: 'myStuff', saga });

  const [tabIndex, setTabIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const tabsList = ['My Projects', 'My Studio', 'Bookmark Projects', 'Trash'];

  useEffect(() => {
    if (user && !loaded) {
      loadProjects(user.data.id);
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
                {index === 0 && projects.length <= 0 && <Spinner />}
                {index === 0 && projects.length > 0 && (
                  <Table display="flex" height="100%">
                    <Table.Body>
                      {projects
                        .sort((a, b) => {
                          const aCreated = Date.parse(a.history.created);
                          const bCreated = Date.parse(b.history.created);
                          return sortDateDesc(aCreated, bCreated);
                        })
                        .map(project => (
                          <Table.Row
                            key={project.id}
                            height="auto"
                            paddingY={12}
                            isSelectable
                            onSelect={() =>
                              history.push({
                                pathname: `/project-gui`,
                                state: {
                                  title: project.title,
                                  projectid: project.id,
                                },
                              })
                            }
                          >
                            <Table.Cell>
                              <img
                                style={{
                                  width: 'auto',
                                  height: '8rem',
                                  marginRight: '3rem',
                                  borderStyle: 'solid',
                                  borderWidth: '0.2rem',
                                  borderColor: ColorPallete.backgroundColor,
                                }}
                                src={DefaultThumbnail}
                                alt="Vizblock default project thumbnail"
                              />
                              <Pane
                                flex={1}
                                height="8rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="left"
                                padding="0.5rem"
                              >
                                <Pane
                                  display="flex"
                                  flexDirection="column"
                                  flexGrow={1}
                                >
                                  <Heading size={600}>
                                    {project.title ? project.title : 'Untitled'}
                                  </Heading>
                                  <Text size={400}>
                                    Last modified:{' '}
                                    {prettyDateFormat(project.history.modified)}
                                  </Text>
                                </Pane>
                                <Pane display="flex" alignItems="flex-end">
                                  <EyeOpenIcon
                                    color="info"
                                    marginRight="0.5rem"
                                  />
                                  <Text marginRight="0.5rem">
                                    {project.stats.views}
                                  </Text>
                                  <HeartIcon
                                    color="danger"
                                    marginRight="0.5rem"
                                  />
                                  <Text marginRight="0.5rem">
                                    {project.stats.loves}
                                  </Text>
                                  <BookmarkIcon
                                    color="success"
                                    marginRight="0.5rem"
                                  />
                                  <Text marginRight="0.5rem">
                                    {project.stats.favorites}
                                  </Text>
                                  <CommentIcon
                                    color="info"
                                    marginRight="0.5rem"
                                  />
                                  <Text marginRight="0.5rem">
                                    {project.stats.comments}
                                  </Text>
                                  <ForkIcon
                                    color="success"
                                    marginRight="0.5rem"
                                  />
                                  <Text marginRight="0.5rem">
                                    {project.stats.remixes}
                                  </Text>
                                </Pane>
                              </Pane>
                              <TrashIcon
                                marginRight="1rem"
                                size={24}
                                onClickCapture={event => {
                                  event.stopPropagation();
                                  console.log('icon captured');
                                }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                )}
                {index !== 0 && <Paragraph>Panel {tab}</Paragraph>}
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
  error: makeSelectError(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProjects: userid => dispatch(loadProjects(userid)),
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
