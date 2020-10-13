/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * ProjectCard
 *
 */

import React, { memo } from 'react';
import { Avatar, Card, Heading, Pane, Text } from 'evergreen-ui';

import history from 'utils/history';
import DefaultThumbnail from 'images/default-project-thumbnail.png';

import ColorPallete from '../../colorPallete';

function truncateString(stringValue, maxLength) {
  let trimmed = stringValue.substring(
    0,
    Math.min(maxLength, stringValue.length),
  );
  if (stringValue.length > maxLength) {
    trimmed = trimmed.concat('...');
  }
  return trimmed;
}

function ProjectCard({ project }) {
  return (
    <Card
      key={project._id}
      elevation={2}
      height="auto"
      minWidth="10rem"
      display="flex"
      flexDirection="column"
      marginRight="2rem"
      marginTop="1rem"
      onClick={() =>
        history.push({
          pathname: `/project-gui`,
          state: {
            title: project.title,
            projectid: project._id,
          },
        })
      }
    >
      <img
        style={{
          width: 'auto',
          height: '8rem',
          borderBottomStyle: 'solid',
          borderWidth: '0.2rem',
          borderColor: ColorPallete.backgroundColor,
        }}
        src={DefaultThumbnail}
        alt="Vizblock default project thumbnail"
      />
      <Pane display="flex" alignItems="center" padding="0.2rem">
        <Avatar
          isSolid
          name={project.author.username}
          size={24}
          marginLeft="0.3rem"
          marginRight="0.5rem"
        />
        <Pane display="flex" flexDirection="column" flexWrap="wrap">
          <Heading
            size={400}
            color={ColorPallete.grey}
            width="7.5rem"
            height="20px"
            overflow="hidden"
          >
            {truncateString(project.title, 13)}
          </Heading>
          <Text
            size={300}
            color={ColorPallete.grey}
            width="7.5rem"
            height="16px"
            overflow="hidden"
          >
            {truncateString(project.author.username, 15)}
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
}

ProjectCard.propTypes = {};

export default memo(ProjectCard);
