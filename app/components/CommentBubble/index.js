/* eslint-disable react/prop-types */
/**
 *
 * CommentBubble
 *
 */

import React, { memo } from 'react';
import { Avatar, Heading, Pane, Paragraph, Text } from 'evergreen-ui';

import { dateTimeFormat } from 'utils/dateUtil';
import { getAvaterImage } from 'utils/util';

import ColorPallete from '../../colorPallete';

function CommentBubble({ user, comment }) {
  // eslint-disable-next-line no-underscore-dangle
  const isCurrentUser = user ? user.data.id === comment.author._id : false;

  return (
    <Pane>
      {!isCurrentUser && (
        <Pane display="flex" padding="0.5rem">
          <Pane display="flex" flexDirection="column">
            <Pane flexGrow={1} />
            <Avatar
              isSolid
              src={getAvaterImage(comment.author)}
              name={comment.author.username}
              size={32}
              marginRight="1rem"
            />
            <Pane flexGrow={1} />
          </Pane>
          <Pane display="flex" flexDirection="column">
            <Heading size={300} marginLeft="0.2rem">
              {comment.author.username}
            </Heading>
            <Pane
              display="flex"
              background="white"
              borderRadius={20}
              padding="0.5rem"
              marginTop="0.2rem"
            >
              <Paragraph size={300}>{comment.content}</Paragraph>
            </Pane>
            <Pane display="flex" marginTop="0.2rem">
              <Pane flexGrow={1} />
              <Text size={300} color="grey">
                {dateTimeFormat(comment.history.created)}
              </Text>
            </Pane>
          </Pane>
        </Pane>
      )}
      {isCurrentUser && (
        <Pane display="flex" padding="0.5rem">
          <Pane flexGrow={1} />
          <Pane display="flex" flexDirection="column">
            <Pane
              display="flex"
              background={ColorPallete.secondaryColor}
              borderRadius={20}
              padding="0.5rem"
              marginTop="0.2rem"
            >
              <Paragraph size={300}>{comment.content}</Paragraph>
            </Pane>
            <Pane display="flex" marginTop="0.2rem">
              <Pane flexGrow={1} />
              <Text size={300} color="grey">
                {dateTimeFormat(comment.history.created)}
              </Text>
            </Pane>
          </Pane>
        </Pane>
      )}
    </Pane>
  );
}

CommentBubble.propTypes = {};

export default memo(CommentBubble);
