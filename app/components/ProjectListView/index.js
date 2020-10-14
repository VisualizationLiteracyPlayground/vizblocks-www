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
  BookmarkIcon,
  CommentIcon,
  EyeOpenIcon,
  ForkIcon,
  Heading,
  HeartIcon,
  Pane,
  Paragraph,
  Table,
  Text,
  TrashIcon,
  UndoIcon,
} from 'evergreen-ui';

import history from 'utils/history';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-project-thumbnail.png';
import {
  makeSelectProjects,
  makeSelectDeletedProjects,
} from 'containers/MyStuff/selectors';
import { deleteProject, undeleteProject } from 'containers/MyStuff/actions';
import DeleteProjectConfirmation from 'components/DeleteProjectConfirmation';
import UndeleteProjectConfirmation from 'components/UndeleteProjectConfirmation';

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

function ProjectListView({
  showDeleted,
  projects,
  deletedProjects,
  deleteProject,
  undeleteProject,
}) {
  const [data, setData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showUndeleteConfirmation, setShowUndeleteConfirmation] = useState(
    false,
  );
  const [currentProject, setCurrentProject] = useState({
    id: 0,
    title: '',
  });

  useEffect(() => {
    if (showDeleted) {
      setData(deletedProjects);
    } else {
      setData(projects);
    }
  }, [projects, deletedProjects]);

  return (
    <Pane>
      {showDeleted && deletedProjects.length === 0 && (
        <Paragraph>You have not deleted any projects!</Paragraph>
      )}
      {!showDeleted && projects.length === 0 && (
        <Paragraph>Start creating projects now!</Paragraph>
      )}
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
                  showDeleted ? () => {} : () => redirectToProjectGui(project)
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
                    <Pane display="flex" flexDirection="column" flexGrow={1}>
                      <Heading size={600}>
                        {project.title ? project.title : 'Untitled'}
                      </Heading>
                      <Heading size={300} marginTop="0.2rem" color="dark-gray">
                        Last modified:{' '}
                        {prettyDateFormat(project.history.modified)}
                      </Heading>
                    </Pane>
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
                      <Text marginRight="0.5rem">{project.stats.comments}</Text>
                      <ForkIcon color="success" marginRight="0.5rem" />
                      <Text marginRight="0.5rem">{project.stats.remixes}</Text>
                    </Pane>
                  </Pane>
                  {!showDeleted && (
                    <TrashIcon
                      marginRight="1rem"
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
                  )}
                  {showDeleted && (
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
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
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
    </Pane>
  );
}

ProjectListView.propTypes = {};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  deletedProjects: makeSelectDeletedProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteProject: (projectid, projects, deletedProjects) =>
      dispatch(deleteProject(projectid, projects, deletedProjects)),
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
