/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * ProjectCard
 *
 */

import React, { memo } from 'react';
import { Avatar, Card, Heading, Pane, Text, Tooltip } from 'evergreen-ui';

import history from 'utils/history';
import { getAvaterImage } from 'utils/util';
import { truncateString } from 'utils/stringUtil';
import DefaultThumbnail from 'images/default-project-thumbnail.png';

import ColorPallete from '../../colorPallete';

function getProjectThumbnail(project) {
  return project.image
    ? `data:${project.image.contentType};base64,${project.image.data}`
    : DefaultThumbnail;
}

function ProjectCard({ project, onClickCallback }) {
  return (
    <Tooltip content={project.title}>
      <Card
        key={project._id}
        elevation={2}
        height="auto"
        maxWidth="10rem"
        display="flex"
        flexDirection="column"
        background="white"
        onClick={() => {
          if (onClickCallback) {
            // Custom callback supplied
            onClickCallback();
          } else {
            // Default callback
            history.push({
              pathname: `/project-preview`,
              state: {
                projectid: project._id,
              },
            });
          }
        }}
      >
        <img
          style={{
            width: '10rem',
            height: '8rem',
            borderBottomStyle: 'solid',
            borderWidth: '0.2rem',
            borderColor: ColorPallete.backgroundColor,
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            objectFit: 'cover',
          }}
          src={getProjectThumbnail(project)}
          alt={
            project.image
              ? project.image.filename
              : 'Vizblock project thumbnail'
          }
        />
        <Pane display="flex" alignItems="center" padding="0.2rem">
          <Avatar
            isSolid
            src={getAvaterImage(project.author)}
            name={project.author.username}
            size={24}
            marginLeft="0.3rem"
            marginRight="0.5rem"
          />
          <Pane display="flex" flexDirection="column" flexWrap="wrap">
            <Heading size={400} color={ColorPallete.grey} overflow="hidden">
              {truncateString(project.title, 13)}
            </Heading>
            <Text size={300} color={ColorPallete.grey} overflow="hidden">
              {truncateString(project.author.username, 16)}
            </Text>
          </Pane>
        </Pane>
      </Card>
    </Tooltip>
  );
}

ProjectCard.propTypes = {};

export default memo(ProjectCard);
