/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * UserPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Avatar,
  Button,
  EditIcon,
  Heading,
  IconButton,
  Label,
  Pane,
  Spinner,
  Table,
  Text,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { prettyDateFormat } from 'utils/dateUtil';

import {
  loadProfileInfo,
  loadProfileInfoFailure,
  loadUserFollowing,
  followUser,
  unfollowUser,
} from './actions';
import {
  makeSelectProfileInfo,
  makeSelectUserFollowing,
  makeSelectError,
  makeSelectUserPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import history from '../../utils/history';

function getProfileJoinDate(profileinfo) {
  return `Joined: ${prettyDateFormat(profileinfo.joinDate)}`;
}

function getProfileFriendsNumber(profileinfo) {
  return `| ${profileinfo.following.length}`;
}

function getProfileAbout(about) {
  return about === '' ? 'Wow! Much empty :)' : about;
}

function getProfileDetails(details) {
  return details === '' ? 'Wow! Much empty :)' : details;
}

function redirectToEditPage() {
  history.push(`/edit-profile`);
}

function redirectToPreview(userid) {
  history.push(`/user-profile/${userid}`);
}

function isUserOwnProfile(user, profileinfo) {
  if (user && profileinfo) {
    return user.data.id === profileinfo._id;
  }
  return false;
}

function userFollowsProfile(userFollowing, profileinfo) {
  if (userFollowing && profileinfo) {
    return userFollowing.includes(profileinfo._id);
  }
  return false;
}

function shouldShowFollowButton(user, profileinfo, userFollowing) {
  return (
    !isUserOwnProfile(user, profileinfo) &&
    !userFollowsProfile(userFollowing, profileinfo)
  );
}

export function UserPage({
  user,
  profileinfo,
  userFollowing,
  error,
  loadProfileInfo,
  loadUserFollowing,
  followUser,
  unfollowUser,
  setError,
}) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });
  // Id of the profile the user is viewing
  const { profileid } = useParams();

  // State
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      loadProfileInfo(profileid);
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (user) {
      loadUserFollowing(user.data.id);
    }
  }, [user]);
  useEffect(() => {
    loadProfileInfo(profileid);
  }, [profileid]);
  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger('Encountered error:', {
        description: error,
      });
      setError(false);
    }
  }, [error]);

  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      {!profileinfo && (
        <Pane
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Pane>
      )}
      {profileinfo && (
        <Pane paddingX="3rem" paddingY="1.5rem">
          <Pane
            aria-label="Profile information"
            display="flex"
            flexDirection="row"
            height="45vh"
            background="white"
            elevation={1}
            justifyItems="center"
          >
            <Pane
              aria-label="User details"
              width="70%"
              display="flex"
              flexDirection="column"
            >
              <Pane
                aria-label="User information"
                marginLeft="2rem"
                display="flex"
                flexDirection="row"
                height="26%"
                padding="1rem"
              >
                <Avatar isSolid name={profileinfo.username} size={52} />
                {/* To be replaced with user retrieved w/ id */}
                <Pane
                  aria-label="user name"
                  display="flex"
                  flexDirection="column"
                >
                  <Heading size={600} marginLeft="1rem">
                    {profileinfo.username}
                  </Heading>
                  <Heading
                    size={300}
                    marginTop="0.5rem"
                    marginLeft="1rem"
                    color="gray"
                  >
                    {getProfileJoinDate(profileinfo)}
                  </Heading>
                </Pane>
                <Pane flexGrow={2} />
                {isUserOwnProfile(user, profileinfo) && (
                  <IconButton
                    icon={EditIcon}
                    appearance="primary"
                    intent="success"
                    marginRight="1rem"
                    alignSelf="center"
                    onClick={() => redirectToEditPage()}
                  />
                )}
                {userFollowsProfile(userFollowing, profileinfo) && (
                  <Button
                    appearance="primary"
                    intent="warning"
                    marginRight="1rem"
                    alignSelf="center"
                    onClick={() => unfollowUser(profileinfo._id)}
                  >
                    Unfollow
                  </Button>
                )}
                {shouldShowFollowButton(user, profileinfo, userFollowing) && (
                  <Button
                    appearance="primary"
                    intent="success"
                    marginRight="1rem"
                    alignSelf="center"
                    disabled={!user}
                    onClick={() => followUser(profileinfo._id)}
                  >
                    Follow
                  </Button>
                )}
              </Pane>
              <Pane
                width="100%"
                borderColor={ColorPallete.backgroundColor}
                borderWidth="0.2rem"
                borderTopStyle="solid"
                aria-label="Horizontal divider"
              />
              <Pane
                aria-label="User description"
                height="74%"
                paddingX="2rem"
                paddingY="1rem"
              >
                <Label htmlFor="about-me" marginBottom={4} display="block">
                  About me
                </Label>
                <Text id="about-me" size={400}>
                  {getProfileAbout(profileinfo.information.about)}
                </Text>
                <Label
                  htmlFor="current-work"
                  marginBottom={4}
                  marginTop={12}
                  display="block"
                >
                  {"What I'm working on"}
                </Label>
                <Text id="current-work" size={400}>
                  {getProfileDetails(profileinfo.information.details)}
                </Text>
              </Pane>
            </Pane>
            <Pane
              height="100%"
              borderColor={ColorPallete.backgroundColor}
              borderWidth="0.2rem"
              borderLeftStyle="solid"
              aria-label="Vertical divider"
            />
            <Pane aria-label="User Friends" width="30%">
              <Pane
                display="flex"
                flexDirection="row"
                alignItems="center"
                marginBottom="0.5rem"
              >
                <Heading size={500} marginTop="0.5rem" marginLeft="1rem">
                  Friends
                </Heading>
                <Heading
                  size={400}
                  marginTop="0.5rem"
                  marginLeft="0.5rem"
                  color="gray"
                >
                  {getProfileFriendsNumber(profileinfo)}
                </Heading>
              </Pane>
              <Table width="100%" id="friend-list">
                <Table.Body height="35vh">
                  {profileinfo.following
                    .sort((friendA, friendB) =>
                      friendA.username.localeCompare(friendB.username),
                    )
                    .map(friend => (
                      <Table.Row
                        key={friend._id}
                        height="auto"
                        paddingY={12}
                        isSelectable
                        onSelect={() => redirectToPreview(friend._id)}
                      >
                        <Table.Cell>
                          <Avatar isSolid name={friend.username} size={24} />
                          <Text size={300} marginLeft="1rem">
                            {friend.username}
                          </Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </Pane>
          </Pane>
        </Pane>
      )}
    </Pane>
  );
}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userPage: makeSelectUserPage(),
  user: makeSelectCurrentUser(),
  profileinfo: makeSelectProfileInfo(),
  userFollowing: makeSelectUserFollowing(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProfileInfo: profileid => dispatch(loadProfileInfo(profileid)),
    loadUserFollowing: userid => dispatch(loadUserFollowing(userid)),
    followUser: userid => dispatch(followUser(userid)),
    unfollowUser: userid => dispatch(unfollowUser(userid)),
    setError: error => dispatch(loadProfileInfoFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserPage);
