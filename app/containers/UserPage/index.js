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
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
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
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';

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
import { getAvaterImage } from '../../utils/util';
import ProjectCard from '../../components/ProjectCard';

function getProfileJoinDate(profileinfo) {
  return `Joined: ${prettyDateFormat(profileinfo.joinDate)}`;
}

function getProfileFriendsNumber(profileinfo) {
  return `| ${profileinfo.following.length}`;
}

function getProfileProjectsNumber(profileinfo) {
  return `| ${profileinfo.projects.length}`;
}

function getProfileAbout(about) {
  return about === '' ? 'Wow! Much empty :)' : about;
}

function getProfileDetails(details) {
  return details === '' ? 'Wow! Much empty :)' : details;
}

function getProjectCardTotalPages(profileinfo) {
  const pageNumber = Math.ceil(
    profileinfo.projects.length / PROJECT_CARD_PER_PAGE,
  );
  return pageNumber === 0 ? 1 : pageNumber;
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

const PROJECT_CARD_PER_PAGE = 7;

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
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const [showFollowing, setShowFollowing] = useState(true);
  const [tableData, setTableData] = useState([]);

  function setTableDataOnStateChange(shouldShowFollowing) {
    if (profileinfo) {
      if (shouldShowFollowing) {
        setTableData(profileinfo.following);
      } else {
        setTableData(profileinfo.followers);
      }
    }
  }

  useEffect(() => {
    if (!loaded) {
      loadProfileInfo(profileid);
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (profileinfo) {
      setTableDataOnStateChange(showFollowing);
    }
  }, [profileinfo]);
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
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      background={ColorPallete.backgroundColor}
    >
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
                <Avatar
                  isSolid
                  src={getAvaterImage(profileinfo)}
                  name={profileinfo.username}
                  size={52}
                />
                <Pane
                  aria-label="user name"
                  display="flex"
                  flexDirection="column"
                >
                  <Pane display="flex" alignItems="center">
                    <Heading size={600} marginLeft="1rem" marginRight="1rem">
                      {profileinfo.username}
                    </Heading>
                    <Pane
                      height="100%"
                      borderWidth="0.15rem"
                      borderLeftStyle="solid"
                      borderColor={ColorPallete.lightGrey}
                      aria-label="Divider between username and email"
                    />
                    <Heading size={400} marginLeft="0.5rem" color="gray">
                      {profileinfo.email}
                    </Heading>
                  </Pane>
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
            <Pane aria-label="User Following-Followers" width="30%">
              <Pane
                aria-label="tab-selection"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderColor={ColorPallete.backgroundColor}
                borderWidth="0.2rem"
                borderBottomStyle="solid"
              >
                <Pane
                  aria-label="tab-following"
                  display="flex"
                  flexDirection="column"
                  justifyItems="center"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => {
                    setShowFollowing(true);
                    setTableDataOnStateChange(true);
                  }}
                >
                  <Pane display="flex" alignItems="center" marginTop="0.5rem">
                    <Heading size={500}>Following</Heading>
                    <Heading size={400} marginLeft="0.5rem" color="gray">
                      {getProfileFriendsNumber(profileinfo)}
                    </Heading>
                  </Pane>
                  <Pane
                    width="8vw"
                    borderColor={
                      showFollowing ? ColorPallete.accentColor : 'white'
                    }
                    borderWidth="0.3rem"
                    borderTopStyle="solid"
                    borderRadius="5px"
                    marginTop="0.3rem"
                    aria-label="Horizontal divider"
                  />
                </Pane>
                <Pane
                  aria-label="tab-followers"
                  display="flex"
                  flexDirection="column"
                  justifyItems="center"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => {
                    setShowFollowing(false);
                    setTableDataOnStateChange(false);
                  }}
                >
                  <Pane display="flex" alignItems="center" marginTop="0.5rem">
                    <Heading size={500}>Followers</Heading>
                    <Heading size={400} marginLeft="0.5rem" color="gray">
                      {`| ${profileinfo.followersCount}`}
                    </Heading>
                  </Pane>
                  <Pane
                    width="8vw"
                    borderColor={
                      !showFollowing ? ColorPallete.accentColor : 'white'
                    }
                    borderWidth="0.3rem"
                    borderTopStyle="solid"
                    borderRadius="5px"
                    marginTop="0.3rem"
                    aria-label="Horizontal divider"
                  />
                </Pane>
              </Pane>
              <Table width="100%" id="friend-list">
                <Table.Body height="39vh">
                  {tableData
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
                          <Avatar
                            isSolid
                            src={getAvaterImage(friend)}
                            name={friend.username}
                            size={24}
                          />
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
          <Pane aria-label="User Projects" marginTop="1rem">
            <Pane
              aria-label="project header"
              display="flex"
              flexDirection="row"
            >
              <Heading size={500} marginTop="0.5rem" marginLeft="1rem">
                Projects
              </Heading>
              <Heading
                size={400}
                marginTop="0.5rem"
                marginLeft="0.5rem"
                color="gray"
              >
                {getProfileProjectsNumber(profileinfo)}
              </Heading>
            </Pane>
            <Pane
              aria-label="project cards"
              display="flex"
              flexDirection="row"
              height="32vh"
            >
              <IconButton
                icon={CircleArrowLeftIcon}
                alignSelf="center"
                appearance="minimal"
                intent="success"
                height={40}
                disabled={currentProjectPage === 1}
                onClick={() => setCurrentProjectPage(currentProjectPage - 1)}
              />
              <Pane display="flex" alignItems="center">
                {profileinfo.projects
                  .slice(
                    (currentProjectPage - 1) * PROJECT_CARD_PER_PAGE,
                    currentProjectPage * PROJECT_CARD_PER_PAGE,
                  )
                  .sort((a, b) => {
                    const aCreated = Date.parse(a.history.created);
                    const bCreated = Date.parse(b.history.created);
                    return sortDateDesc(aCreated, bCreated);
                  })
                  .map(project => (
                    <Pane marginX="1rem" key={project._id}>
                      <ProjectCard project={project} />
                    </Pane>
                  ))}
              </Pane>
              <Pane display="flex" flexGrow={1} />
              <IconButton
                icon={CircleArrowRightIcon}
                alignSelf="center"
                appearance="minimal"
                intent="success"
                height={40}
                disabled={
                  currentProjectPage >= getProjectCardTotalPages(profileinfo)
                }
                onClick={() => setCurrentProjectPage(currentProjectPage + 1)}
              />
            </Pane>
            <Pane aria-label="project card page number" display="flex">
              <Pane display="flex" flexGrow={1} />
              <Heading
                size={400}
                color="gray"
                alignSelf="center"
                justifySelf="center"
              >
                {`${currentProjectPage} / ${getProjectCardTotalPages(
                  profileinfo,
                )}`}
              </Heading>
              <Pane display="flex" flexGrow={1} />
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
