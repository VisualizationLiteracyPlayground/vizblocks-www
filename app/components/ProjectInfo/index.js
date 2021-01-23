/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * ProjectInfo
 *
 */

import React, { memo, useEffect, useState } from 'react';
import {
  Avatar,
  BookmarkIcon,
  Button,
  CommentIcon,
  ConfirmIcon,
  Dialog,
  EditIcon,
  EyeOpenIcon,
  ForkIcon,
  Heading,
  HeartIcon,
  Icon,
  IconButton,
  LinkIcon,
  Pane,
  Paragraph,
  RefreshIcon,
  TextareaField,
  TextInputField,
  Tooltip,
} from 'evergreen-ui';

import { prettyDateFormat } from 'utils/dateUtil';

const ProjectView = require('containers/VizblocksGui/project-view.jsx');

function ProjectInfo({
  user,
  userinfo,
  project,
  history,
  location,
  onClickShare,
  likeCallback,
  bookmarkCallback,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userLikedProject, setUserLikedProject] = useState(false);
  const [userBookmarkedProject, setUserBookmarkedProject] = useState(false);
  // Edit fields
  const [projectTitleField, setProjectTitleField] = useState('');
  const [projectInstructionField, setProjectInstructionField] = useState('');
  const [projectDescriptionField, setProjectDescriptionField] = useState('');
  // Dialog state
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  function redirectToProjectGui() {
    history.push({
      pathname: `/project-gui`,
      state: {
        title: project.title,
        projectid: project._id,
        authorid: project.author._id,
      },
    });
  }

  function userIsAuthor() {
    if (!user) {
      // User not logged in
      return false;
    }
    return project ? project.author._id === user.data.id : false;
  }

  useEffect(() => {
    setProjectTitleField(project.title);
    setProjectInstructionField(project.instructions);
    setProjectDescriptionField(project.description);
  }, [project]);
  useEffect(() => {
    if (userinfo && project) {
      setUserLikedProject(userinfo.likedProjects.includes(project._id));
      setUserBookmarkedProject(
        userinfo.bookmarkedProjects.includes(project._id),
      );
    }
  }, [userinfo]);

  return (
    <Pane
      height="80vh"
      marginX="2rem"
      marginY="1rem"
      padding="1rem"
      display="flex"
      flexDirection="column"
    >
      <Pane aria-label="project-header" display="flex" marginBottom="1rem">
        <Avatar isSolid name={project.author.username} size={52} />
        <Pane
          aria-label="project-header-info"
          display="flex"
          flexDirection="column"
          marginLeft="1rem"
        >
          {!isEditMode && (
            <Heading size={600} marginLeft="1rem">
              {project.title}
            </Heading>
          )}
          {isEditMode && (
            <TextInputField
              width="400px"
              id="title"
              label=""
              marginLeft="0.5rem"
              marginBottom="0rem"
              value={projectTitleField}
              onChange={e => setProjectTitleField(e.target.value)}
            />
          )}
          <Heading size={400} marginLeft="1rem">
            {`by ${project.author.username}`}
          </Heading>
          <Heading size={300} marginLeft="1rem" color="gray">
            {prettyDateFormat(project.history.created)}
          </Heading>
        </Pane>
        <Pane flexGrow={1} />
        <Pane aria-label="header-buttons" display="flex">
          {userIsAuthor() && (
            <IconButton
              icon={EditIcon}
              intent="success"
              appearance={isEditMode ? 'primary' : 'default'}
              onClick={() => setIsEditMode(!isEditMode)}
              alignSelf="flex-end"
              marginRight="1rem"
            />
          )}
          {user && (
            <Button
              iconBefore={ForkIcon}
              intent="success"
              appearance="primary"
              onClick={onClickShare}
              alignSelf="flex-end"
              marginRight="1rem"
            >
              Remix
            </Button>
          )}
          <Button
            iconBefore={RefreshIcon}
            intent="success"
            appearance="primary"
            onClick={redirectToProjectGui}
            alignSelf="flex-end"
          >
            See Inside
          </Button>
        </Pane>
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Pane aria-label="left column">
          <Pane aria-label="project-player" width="481px" height="auto">
            {/* Key is needed to trigger rerendering */}
            <ProjectView.View
              user={user}
              projectid={project._id}
              title={project.title}
              history={history}
              location={location}
              authorid={project.author._id}
              isPlayerOnly
              key={project._id}
            />
          </Pane>
          <Pane
            aria-label="project-stats"
            display="flex"
            flexDirection="row"
            marginTop="1rem"
          >
            <Tooltip content="Views">
              <Pane display="flex">
                <Icon icon={EyeOpenIcon} color="info" size={16} />
                <Heading size={300} marginLeft="0.5rem">
                  {project.stats.views}
                </Heading>
              </Pane>
            </Tooltip>
            <Tooltip content="Likes">
              <Pane display="flex">
                <Icon
                  icon={HeartIcon}
                  color="danger"
                  size={16}
                  marginLeft="1.5rem"
                />
                <Heading size={300} marginLeft="0.5rem">
                  {project.stats.loves}
                </Heading>
              </Pane>
            </Tooltip>
            <Tooltip content="Bookmarks">
              <Pane display="flex">
                <Icon
                  icon={BookmarkIcon}
                  color="success"
                  size={16}
                  marginLeft="1.5rem"
                />
                <Heading size={300} marginLeft="0.5rem">
                  {project.stats.favorites}
                </Heading>
              </Pane>
            </Tooltip>
            <Tooltip content="Comments">
              <Pane display="flex">
                <Icon
                  icon={CommentIcon}
                  color="info"
                  size={16}
                  marginLeft="1.5rem"
                />
                <Heading size={300} marginLeft="0.5rem">
                  {project.stats.comments}
                </Heading>
              </Pane>
            </Tooltip>
            <Tooltip content="Remixes">
              <Pane display="flex">
                <Icon
                  icon={ForkIcon}
                  color="success"
                  size={16}
                  marginLeft="1.5rem"
                />
                <Heading size={300} marginLeft="0.5rem">
                  {project.stats.remixes}
                </Heading>
              </Pane>
            </Tooltip>
          </Pane>
        </Pane>
        <Pane aria-label="right-column" marginLeft="1.5rem" flexGrow={1}>
          <Pane display="flex" flexDirection="column" height="100%">
            <Pane aria-label="Project description" marginTop="2.5rem">
              <TextareaField
                id="instructions"
                label="Instructions"
                width="100%"
                value={projectInstructionField}
                onChange={e => setProjectInstructionField(e.target.value)}
                readOnly={!isEditMode}
              />
              <TextareaField
                id="description"
                label="Description"
                width="100%"
                value={projectDescriptionField}
                onChange={e => setProjectDescriptionField(e.target.value)}
                readOnly={!isEditMode}
              />
              {isEditMode && (
                <Button
                  iconBefore={ConfirmIcon}
                  intent="success"
                  appearance="primary"
                  onClick={() => setShowUpdateConfirmation(true)}
                >
                  Update Project
                </Button>
              )}
            </Pane>
            <Pane flexGrow={2} />
            <Pane
              aria-label="project-stats-buttons"
              display="flex"
              flexDirection="row-reverse"
            >
              <Button
                iconBefore={LinkIcon}
                intent="success"
                appearance="primary"
                onClick={onClickShare}
              >
                Share
              </Button>
              <Button
                iconBefore={BookmarkIcon}
                intent={userBookmarkedProject ? 'success' : 'default'}
                appearance="default"
                marginRight="1rem"
                onClick={() => {
                  // callback to server
                  bookmarkCallback(project._id, !userBookmarkedProject);
                  // update state
                  setUserBookmarkedProject(!userBookmarkedProject);
                }}
                disabled={!user || userIsAuthor()}
              >
                {userBookmarkedProject ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                iconBefore={HeartIcon}
                intent={userLikedProject ? 'danger' : 'default'}
                appearance="default"
                marginRight="1rem"
                onClick={() => {
                  // callback to server
                  likeCallback(project._id, !userLikedProject);
                  // update state
                  setUserLikedProject(!userLikedProject);
                }}
                disabled={!user || userIsAuthor()}
              >
                {userLikedProject ? 'Liked' : 'Like'}
              </Button>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
      <Pane
        width="100%"
        borderColor="grey"
        borderWidth="0.1rem"
        borderTopStyle="solid"
        marginTop="1rem"
        aria-label="Horizontal divider"
      />
      <Dialog
        isShown={showUpdateConfirmation}
        hasHeader={false}
        intent="success"
        width="40vw"
        onCloseComplete={() => {
          setShowUpdateConfirmation(false);
        }}
        onConfirm={() => {
          setShowUpdateConfirmation(false);
        }}
        confirmLabel="Confirm"
      >
        <Pane>
          <Heading size={600}>
            <b>Project Information</b>
          </Heading>
          <Heading size={400} marginTop="0.5rem">
            will be updated as follows
          </Heading>
          <Heading size={400} marginTop="1rem">
            Title:
          </Heading>
          <Paragraph>{projectTitleField}</Paragraph>
          <Heading size={400} marginTop="1rem">
            Instructions:
          </Heading>
          <Paragraph>{projectInstructionField}</Paragraph>
          <Heading size={400} marginTop="1rem">
            Description:
          </Heading>
          <Paragraph>{projectDescriptionField}</Paragraph>
        </Pane>
      </Dialog>
    </Pane>
  );
}

ProjectInfo.propTypes = {};

export default memo(ProjectInfo);
