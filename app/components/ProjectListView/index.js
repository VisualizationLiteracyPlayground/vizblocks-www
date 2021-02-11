/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * ProjectListView
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Avatar,
  BookmarkIcon,
  CommentIcon,
  Dialog,
  EyeOpenIcon,
  ForkIcon,
  Heading,
  HeartIcon,
  Pane,
  Paragraph,
  Table,
  Text,
  TrashIcon,
  Tooltip,
  UndoIcon,
} from 'evergreen-ui';

import history from 'utils/history';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-project-thumbnail.png';
import {
  makeSelectProjects,
  makeSelectBookmarkedProjects,
  makeSelectDeletedProjects,
} from 'containers/MyStuff/selectors';
import {
  deleteProject,
  unbookmarkProject,
  undeleteProject,
} from 'containers/MyStuff/actions';
import DeleteProjectConfirmation from 'components/DeleteProjectConfirmation';
import UndeleteProjectConfirmation from 'components/UndeleteProjectConfirmation';
import EmptyDataPlaceholder from 'components/EmptyDataPlaceholder';

import ColorPallete from '../../colorPallete';

function redirectToProjectGui(project) {
  history.push({
    pathname: `/project-gui`,
    state: {
      title: project.title,
      projectid: project._id,
      authorid: project.author,
    },
  });
}

function redirectToProjectPreview(project) {
  history.push({
    pathname: `/project-preview`,
    state: {
      projectid: project._id,
    },
  });
}

function ProjectListView({
  showDeleted,
  showBookmark,
  projects,
  bookmarkedProjects,
  deletedProjects,
  deleteProject,
  unbookmarkProject,
  undeleteProject,
}) {
  const [data, setData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUndeleteConfirmation, setShowUndeleteConfirmation] = useState(
    false,
  );
  const [showUnbookmarkConfirmation, setShowUnbookmarkConfirmation] = useState(
    false,
  );
  const [currentProject, setCurrentProject] = useState({
    id: 0,
    title: '',
  });

  function getEmptyPlaceholderTitle() {
    if (showDeleted) {
      return 'No deleted projects found';
    }
    if (!showDeleted && !showBookmark) {
      return 'No projects found';
    }
    if (showBookmark) {
      return 'No bookmarked projects found';
    }
    return '';
  }

  function getEmptyPlaceholderSubtitle() {
    if (showDeleted) {
      return 'You have not deleted any projects!';
    }
    if (!showDeleted && !showBookmark) {
      return 'Start creating projects now!';
    }
    if (showBookmark) {
      return 'You have not bookmarked any projects!';
    }
    return '';
  }

  useEffect(() => {
    if (showDeleted) {
      setData(deletedProjects);
    } else if (showBookmark) {
      setData(bookmarkedProjects);
    } else {
      setData(projects);
    }
  }, [projects, bookmarkedProjects, deletedProjects]);

  return (
    <Pane height="100%">
      {data.length > 0 && (
        <Table display="flex" height="62vh">
          <Table.Body>
            {data
              .sort((a, b) => {
                const aCreated = Date.parse(a.history.created);
                const bCreated = Date.parse(b.history.created);
                return sortDateDesc(aCreated, bCreated);
              })
              .map(project => (
                <Table.Row
                  key={project._id}
                  height="auto"
                  paddingY={12}
                  isSelectable
                  onSelect={
                    showDeleted
                      ? () => {}
                      : () => redirectToProjectPreview(project)
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
                      <Pane display="flex">
                        {showBookmark && (
                          <Pane display="flex" alignItems="center">
                            <Avatar
                              isSolid
                              name={project.author.username}
                              size={32}
                            />
                            <Heading size={500} marginX="0.5rem">
                              {project.author.username}
                            </Heading>
                            <Pane
                              height="100%"
                              borderColor={ColorPallete.grey}
                              borderWidth="0.1rem"
                              borderLeftStyle="solid"
                              justifySelf="center"
                              alignSelf="center"
                              marginRight="1rem"
                              aria-label="Vertical divider"
                            />
                          </Pane>
                        )}
                        <Pane display="flex" flexDirection="column">
                          <Heading size={600}>
                            {project.title ? project.title : 'Untitled'}
                          </Heading>
                          <Heading
                            size={300}
                            marginTop="0.2rem"
                            color="dark-gray"
                          >
                            Last modified:{' '}
                            {prettyDateFormat(project.history.modified)}
                          </Heading>
                        </Pane>
                      </Pane>
                      <Pane display="flex" flexGrow={1} />
                      <Pane display="flex" alignItems="flex-end">
                        <EyeOpenIcon color="info" marginRight="0.5rem" />
                        <Text marginRight="0.5rem">{project.stats.views}</Text>
                        <HeartIcon color="danger" marginRight="0.5rem" />
                        <Text marginRight="0.5rem">{project.stats.loves}</Text>
                        <BookmarkIcon color="success" marginRight="0.5rem" />
                        <Text marginRight="0.5rem">
                          {project.stats.favorites}
                        </Text>
                        <CommentIcon color="info" marginRight="0.5rem" />
                        <Text marginRight="0.5rem">
                          {project.stats.comments}
                        </Text>
                        <ForkIcon color="success" marginRight="0.5rem" />
                        <Text marginRight="0.5rem">
                          {project.stats.remixes}
                        </Text>
                      </Pane>
                    </Pane>
                    {!showDeleted && !showBookmark && (
                      <Pane>
                        <Tooltip content="See Inside">
                          <EyeOpenIcon
                            marginRight="1.5rem"
                            size={24}
                            onClickCapture={event => {
                              event.stopPropagation();
                              redirectToProjectGui(project);
                            }}
                          />
                        </Tooltip>
                        <TrashIcon
                          marginRight="2rem"
                          size={24}
                          onClickCapture={event => {
                            event.stopPropagation();
                            setCurrentProject({
                              id: project._id,
                              title: project.title,
                            });
                            setShowDeleteConfirmation(true);
                          }}
                        />
                      </Pane>
                    )}
                    {showBookmark && (
                      <Tooltip content="Unbookmark">
                        <BookmarkIcon
                          marginRight="1rem"
                          color="success"
                          size={24}
                          onClickCapture={event => {
                            event.stopPropagation();
                            setCurrentProject({
                              id: project._id,
                              title: project.title,
                            });
                            setShowUnbookmarkConfirmation(true);
                          }}
                        />
                      </Tooltip>
                    )}
                    {showDeleted && (
                      <Tooltip content="Undo">
                        <UndoIcon
                          marginRight="1rem"
                          size={24}
                          onClickCapture={event => {
                            event.stopPropagation();
                            setCurrentProject({
                              id: project._id,
                              title: project.title,
                            });
                            setShowUndeleteConfirmation(true);
                          }}
                        />
                      </Tooltip>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
      {data.length === 0 && (
        <Pane
          aria-label="empty-placeholder-illustration"
          display="flex"
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <EmptyDataPlaceholder
            title={getEmptyPlaceholderTitle()}
            subtitle={getEmptyPlaceholderSubtitle()}
          />
        </Pane>
      )}
      <DeleteProjectConfirmation
        currentProject={currentProject}
        isShown={showDeleteConfirmation}
        closeCallback={() => setShowDeleteConfirmation(false)}
        confirmCallback={projectid => {
          setShowDeleteConfirmation(false);
          deleteProject(projectid, projects, deletedProjects);
        }}
      />
      <UndeleteProjectConfirmation
        currentProject={currentProject}
        isShown={showUndeleteConfirmation}
        closeCallback={() => setShowUndeleteConfirmation(false)}
        confirmCallback={projectid => {
          setShowUndeleteConfirmation(false);
          undeleteProject(projectid, projects, deletedProjects);
        }}
      />
      <Dialog
        aria-label="Unbookmark-confirmation"
        isShown={showUnbookmarkConfirmation}
        title={`Confirm unbookmark '${currentProject.title || 'project'}'?`}
        intent="warning"
        width="30vw"
        onCloseComplete={() => setShowUnbookmarkConfirmation(false)}
        onConfirm={() => {
          setShowUnbookmarkConfirmation(false);
          unbookmarkProject(currentProject.id, bookmarkedProjects);
        }}
        confirmLabel="Confirm"
      >
        <Paragraph size={400} color="gray">
          <b>Note:</b>
        </Paragraph>
        <Paragraph size={400} color="gray">
          You can bookmark the project again, by searching for it.
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

ProjectListView.propTypes = {};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  bookmarkedProjects: makeSelectBookmarkedProjects(),
  deletedProjects: makeSelectDeletedProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteProject: (projectid, projects, deletedProjects) =>
      dispatch(deleteProject(projectid, projects, deletedProjects)),
    unbookmarkProject: (projectid, bookmarkedProjects) =>
      dispatch(unbookmarkProject(projectid, bookmarkedProjects)),
    undeleteProject: (projectid, projects, deletedProjects) =>
      dispatch(undeleteProject(projectid, projects, deletedProjects)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectListView);
