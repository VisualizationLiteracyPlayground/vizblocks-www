/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * UserCard
 *
 */

import React, { memo } from 'react';
import { Avatar, Card, Heading, Pane, Text } from 'evergreen-ui';

import history from 'utils/history';
import { truncateString } from 'utils/stringUtil';
import { prettyDateFormat } from 'utils/dateUtil';

import ColorPallete from '../../colorPallete';

function UserCard({ user }) {
  return (
    <Card
      key={user._id}
      elevation={2}
      height="auto"
      maxWidth="10rem"
      display="flex"
      flexDirection="column"
      background="white"
      onClick={() => history.push(`/user-profile/${user._id}`)}
    >
      <Pane
        display="flex"
        width="10rem"
        marginTop="0.5rem"
        paddingBottom="0.5rem"
        justifyContent="center"
        borderBottomStyle="solid"
        borderWidth="0.2rem"
        borderColor={ColorPallete.backgroundColor}
      >
        <Avatar isSolid name={user.username} size={64} />
      </Pane>
      <Pane display="flex" alignSelf="center" padding="0.2rem">
        <Pane
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="center"
        >
          <Heading size={500} color={ColorPallete.grey} overflow="hidden">
            {truncateString(user.username, 16)}
          </Heading>
          <Text size={300} color={ColorPallete.grey} overflow="hidden">
            {truncateString(user.email, 23)}
          </Text>
          <Text size={300} color={ColorPallete.grey} overflow="hidden">
            {`Joined ${prettyDateFormat(user.joinDate)}`}
          </Text>
          <Text size={300} color={ColorPallete.grey} overflow="hidden">
            {`Friends: ${user.following.length}`}
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
}

UserCard.propTypes = {};

export default memo(UserCard);
