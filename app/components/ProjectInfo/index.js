/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * ProjectInfo
 *
 */

import React, { memo } from 'react';
import {
  Avatar,
  BookmarkIcon,
  Button,
  CommentIcon,
  EyeOpenIcon,
  ForkIcon,
  Heading,
  HeartIcon,
  Icon,
  LinkIcon,
  Pane,
  TextareaField,
  Tooltip,
} from 'evergreen-ui';

import { prettyDateFormat } from 'utils/dateUtil';

const ProjectView = require('containers/VizblocksGui/project-view.jsx');

function ProjectInfo({ user, project, history, location, onClickShare }) {
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
          <Heading size={600} marginLeft="1rem">
            {project.title}
          </Heading>
          <Heading size={400} marginLeft="1rem">
            {`by ${project.author.username}`}
          </Heading>
          <Heading size={300} marginLeft="1rem" color="gray">
            {prettyDateFormat(project.history.created)}
          </Heading>
        </Pane>
      </Pane>
      <Pane display="flex" flexDirection="row">
        <Pane aria-label="left column">
          <Pane aria-label="project-player" width="481px" height="auto">
            <ProjectView.View
              user={user}
              projectid={project._id}
              title={project.title}
              history={history}
              location={location}
              authorid={project.author._id}
              isPlayerOnly
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
                value={project.instructions}
                readOnly
              />
              <TextareaField
                id="description"
                label="Description"
                width="100%"
                value={project.description}
                readOnly
              />
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
                intent="success"
                appearance="default"
                marginRight="1rem"
                onClick={() => {}}
              >
                Bookmarked
              </Button>
              <Button
                iconBefore={HeartIcon}
                intent="danger"
                appearance="default"
                marginRight="1rem"
                onClick={() => {}}
              >
                Liked
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
    </Pane>
  );
}

ProjectInfo.propTypes = {};

export default memo(ProjectInfo);
