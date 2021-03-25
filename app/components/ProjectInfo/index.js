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
  Text,
  TextareaField,
  TextInputField,
  Tooltip,
} from 'evergreen-ui';
import { Link } from 'react-router-dom';

import { prettyDateFormat } from 'utils/dateUtil';
import { getAvaterImage } from 'utils/util';

import ColorPallete from '../../colorPallete';

const ProjectView = require('containers/VizblocksGui/project-view.jsx');

function validateProjectTitle(title) {
  let msg = null;
  if (title === '') {
    msg = 'Title is required';
  } else if (title.length > 50) {
    msg = `${title.length}/50 characters`;
  }
  return msg;
}

function validateProjectInstructions(instructions) {
  let msg = null;
  if (instructions.length > 500) {
    msg = `${instructions.length}/500 characters`;
  }
  return msg;
}

function validateProjectDescription(description) {
  let msg = null;
  if (description.length > 255) {
    msg = `${description.length}/255 characters`;
  }
  return msg;
}

function ProjectInfo({
  user,
  userinfo,
  project,
  history,
  location,
  onClickShare,
  likeCallback,
  bookmarkCallback,
  errorCallback,
  submitUpdateCallback,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userLikedProject, setUserLikedProject] = useState(false);
  const [userBookmarkedProject, setUserBookmarkedProject] = useState(false);
  const [userToggledButtons, setUserToggledButtons] = useState(false);
  // Edit fields
  const [projectTitleField, setProjectTitleField] = useState('');
  const [projectInstructionField, setProjectInstructionField] = useState('');
  const [projectDescriptionField, setProjectDescriptionField] = useState('');
  // Dialog state
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

  function redirectToProjectGui(isRemixing) {
    history.push({
      pathname: `/project-gui`,
      state: {
        title: project.title,
        projectid: project._id,
        authorid: project.author._id,
        isRemixing,
      },
    });
  }

  function resetProjectInformationFields() {
    setProjectTitleField(project.title);
    setProjectInstructionField(project.instructions);
    setProjectDescriptionField(project.description);
    if (userinfo && !userToggledButtons) {
      setUserLikedProject(userinfo.likedProjects.includes(project._id));
      setUserBookmarkedProject(
        userinfo.bookmarkedProjects.includes(project._id),
      );
    }
  }

  function submitInformationChange() {
    const checkTitle = validateProjectTitle(projectTitleField);
    const checkInstruction = validateProjectInstructions(
      projectInstructionField,
    );
    const checkDescription = validateProjectDescription(
      projectDescriptionField,
    );

    if (!checkTitle && !checkInstruction && !checkDescription) {
      submitUpdateCallback(
        project._id,
        projectTitleField,
        projectInstructionField,
        projectDescriptionField,
      );
      setIsEditMode(false);
    } else {
      errorCallback(
        checkTitle ||
          checkInstruction ||
          checkDescription ||
          'There are fields with error',
      );
    }
    setShowUpdateConfirmation(false);
  }

  function userIsAuthor() {
    if (!user) {
      // User not logged in
      return false;
    }
    return project ? project.author._id === user.data.id : false;
  }

  function remixParentIsRoot() {
    if (project && project.remix) {
      return project.remix.parent._id === project.remix.root._id;
    }
    return false;
  }

  useEffect(() => {
    resetProjectInformationFields();
  }, [project]);

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
        <Link to={`/user-profile/${project.author._id}`}>
          <Avatar
            isSolid
            src={getAvaterImage(project.author)}
            name={project.author.username}
            size={52}
          />
        </Link>
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
              validationMessage={validateProjectTitle(projectTitleField)}
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
            <Pane display="flex" alignSelf="flex-end">
              {isEditMode && (
                <Heading
                  size={300}
                  marginRight="1rem"
                  color="gray"
                  alignSelf="center"
                >
                  Edit mode
                </Heading>
              )}
              <IconButton
                icon={EditIcon}
                intent="success"
                appearance={isEditMode ? 'primary' : 'default'}
                onClick={() => {
                  resetProjectInformationFields();
                  setIsEditMode(!isEditMode);
                }}
                marginRight="1rem"
              />
            </Pane>
          )}
          {user && (
            <Tooltip content="Create a copy">
              <Button
                iconBefore={ForkIcon}
                intent="success"
                appearance="primary"
                onClick={() => redirectToProjectGui(true)}
                alignSelf="flex-end"
                marginRight="1rem"
              >
                Remix
              </Button>
            </Tooltip>
          )}
          <Button
            iconBefore={RefreshIcon}
            intent="success"
            appearance="primary"
            onClick={() => redirectToProjectGui(false)}
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
            {project.remix && (
              <Pane aria-label="Remix credits">
                <Heading size={400}>Credits</Heading>
                {project.remix.parent && (
                  <Pane
                    aria-label="Credit parents"
                    marginTop="0.5rem"
                    display="flex"
                  >
                    <Avatar
                      isSolid
                      src={getAvaterImage(project.remix.parent.author)}
                      name={project.remix.parent.author.username}
                      size={36}
                    />
                    <Text size={400} marginLeft="1rem" alignSelf="center">
                      Thanks to{' '}
                      <Link
                        to={`/user-profile/${project.remix.parent.author._id}`}
                        style={{
                          color: ColorPallete.primaryColor,
                          textDecoration: 'none',
                        }}
                      >
                        <b>{project.remix.parent.author.username}</b>
                      </Link>{' '}
                      for the parent project{' '}
                      <Link
                        to={{
                          pathname: '/project-preview',
                          state: { projectid: project.remix.parent._id },
                        }}
                        style={{
                          color: ColorPallete.primaryColor,
                          textDecoration: 'none',
                        }}
                      >
                        <b>{project.remix.parent.title}</b>
                      </Link>
                    </Text>
                  </Pane>
                )}
                {project.remix.root && !remixParentIsRoot() && (
                  <Pane
                    aria-label="Credit root"
                    marginTop="0.5rem"
                    display="flex"
                  >
                    <Avatar
                      isSolid
                      src={getAvaterImage(project.remix.root.author)}
                      name={project.remix.root.author.username}
                      size={36}
                    />
                    <Text size={400} marginLeft="1rem" alignSelf="center">
                      Thanks to{' '}
                      <Link
                        to={`/user-profile/${project.remix.root.author._id}`}
                        style={{
                          color: ColorPallete.primaryColor,
                          textDecoration: 'none',
                        }}
                      >
                        <b>{project.remix.root.author.username}</b>
                      </Link>{' '}
                      for the original project{' '}
                      <Link
                        to={{
                          pathname: '/project-preview',
                          state: { projectid: project.remix.root._id },
                        }}
                        style={{
                          color: ColorPallete.primaryColor,
                          textDecoration: 'none',
                        }}
                      >
                        <b>{project.remix.root.title}</b>
                      </Link>
                    </Text>
                  </Pane>
                )}
              </Pane>
            )}
            <Pane
              aria-label="Project description"
              marginTop={project.remix ? '1rem' : '2.5rem'}
            >
              <TextareaField
                id="instructions"
                label="Instructions"
                width="100%"
                value={projectInstructionField}
                onChange={e => setProjectInstructionField(e.target.value)}
                validationMessage={validateProjectInstructions(
                  projectInstructionField,
                )}
                readOnly={!isEditMode}
              />
              <TextareaField
                id="description"
                label="Description"
                width="100%"
                value={projectDescriptionField}
                onChange={e => setProjectDescriptionField(e.target.value)}
                validationMessage={validateProjectDescription(
                  projectDescriptionField,
                )}
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
                intent={userBookmarkedProject ? 'success' : 'none'}
                appearance="default"
                marginRight="1rem"
                onClick={() => {
                  // callback to server
                  bookmarkCallback(project._id, !userBookmarkedProject);
                  // update state
                  setUserBookmarkedProject(!userBookmarkedProject);
                  setUserToggledButtons(true);
                }}
                disabled={!user || userIsAuthor()}
              >
                {userBookmarkedProject ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button
                iconBefore={HeartIcon}
                intent={userLikedProject ? 'danger' : 'none'}
                appearance="default"
                marginRight="1rem"
                onClick={() => {
                  // callback to server
                  likeCallback(project._id, !userLikedProject);
                  // update state
                  setUserLikedProject(!userLikedProject);
                  setUserToggledButtons(true);
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
          submitInformationChange();
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
