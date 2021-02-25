/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * EditUserPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Avatar,
  BlockedPersonIcon,
  Button,
  Dialog,
  EditIcon,
  EyeOpenIcon,
  Heading,
  IconButton,
  Label,
  Pane,
  Spinner,
  Strong,
  Table,
  Text,
  TextareaField,
  Tooltip,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { prettyDateFormat } from 'utils/dateUtil';

import {
  loadUserInfo,
  loadUserInfoFailure,
  updateUserInfo,
  updateUserProfilePicture,
  unfollowUser,
} from './actions';
import {
  makeSelectUserInfo,
  makeSelectError,
  makeSelectEditUserPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import UploadImage from '../../components/UploadImage';
import history from '../../utils/history';
import { getAvaterImage } from '../../utils/util';

function getUserDetailsSubtitle(userinfo) {
  if (userinfo) {
    return `Joined: ${prettyDateFormat(userinfo.joinDate)} | Friends: ${
      userinfo.following.length
    }`;
  }
  return '';
}

function redirectToPreview(userid) {
  history.push(`/user-profile/${userid}`);
}

function validateAboutInput(about) {
  let msg = null;
  if (about.length > 500) {
    msg = `${about.length}/500 characters`;
  }
  return msg;
}

function validateCurrentFocusInput(currentFocus) {
  let msg = null;
  if (currentFocus.length > 500) {
    msg = `${currentFocus.length}/500 characters`;
  }
  return msg;
}

export function EditUserPage({
  user,
  userinfo,
  error,
  loadUserInfo,
  updateUserInfo,
  updateUserProfilePicture,
  unfollowUser,
  setError,
}) {
  useInjectReducer({ key: 'editUserPage', reducer });
  useInjectSaga({ key: 'editUserPage', saga });

  const [loaded, setLoaded] = useState(false);
  const [about, setAbout] = useState('');
  const [userCurrentFocus, setUserCurrentFocus] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({
    username: '',
    id: '',
  });

  function submitUserInfoUpdate() {
    if (
      !validateAboutInput(about) &&
      !validateCurrentFocusInput(userCurrentFocus)
    ) {
      // Valid change
      updateUserInfo({
        about,
        details: userCurrentFocus,
      });
    } else {
      setError('Character limit exceeded');
    }
  }

  function resetUnfollowDialog() {
    setShowUnfollowDialog(false);
    setUserToUnfollow({
      username: '',
      id: '',
    });
  }

  function setUnfollowDialog(user) {
    setUserToUnfollow({
      username: user.username,
      id: user._id,
    });
    setShowUnfollowDialog(true);
  }

  useEffect(() => {
    if (!loaded) {
      loadUserInfo();
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (userinfo && userinfo.information) {
      setAbout(userinfo.information.about);
      setUserCurrentFocus(userinfo.information.details);
    }
  }, [userinfo]);
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
    <Pane height="120vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      {!userinfo && (
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
      {userinfo && (
        <Pane paddingX="3rem" paddingY="1.5rem">
          <Pane
            aria-label="Top Pane"
            display="flex"
            flexDirection="column"
            background="white"
            padding="1rem"
            elevation={1}
            justifyItems="center"
          >
            <Pane
              aria-label="User information"
              marginLeft="2rem"
              display="flex"
              flexDirection="row"
              height="8vh"
            >
              <Avatar
                isSolid
                src={getAvaterImage(user.data)}
                name={user.data.username}
                size={52}
              />
              <IconButton
                icon={EditIcon}
                appearance="minimal"
                intent="success"
                display="inline-block"
                alignSelf="flex-end"
                onClick={() => setShowProfileUpload(true)}
              />
              <Pane display="flex" flexDirection="column">
                <Heading size={600} marginLeft="1rem">
                  {user.data.username}
                </Heading>
                <Heading
                  size={300}
                  marginTop="0.5rem"
                  marginLeft="1rem"
                  color="gray"
                >
                  {getUserDetailsSubtitle(userinfo)}
                </Heading>
              </Pane>
              <Pane flexGrow={2} />
              <Tooltip content="Preview Profile Page">
                <IconButton
                  icon={EyeOpenIcon}
                  appearance="primary"
                  intent="success"
                  alignSelf="center"
                  onClick={() => redirectToPreview(user.data.id)}
                />
              </Tooltip>
            </Pane>
            <Pane
              width="100%"
              borderColor={ColorPallete.backgroundColor}
              borderWidth="0.2rem"
              borderTopStyle="solid"
              aria-label="Horizontal divider"
            />
            <Pane
              aria-label="User Description"
              marginX="2rem"
              display="flex"
              flexDirection="column"
            >
              <Pane width="100%" marginTop="0.5rem">
                <TextareaField
                  id="textarea-1"
                  label="About me"
                  width="100%"
                  isInvalid={validateAboutInput(about)}
                  value={about}
                  onChange={e => setAbout(e.target.value)}
                  validationMessage={validateAboutInput(about)}
                />
                <TextareaField
                  id="textarea-2"
                  label="What I'm working on"
                  width="100%"
                  isInvalid={validateCurrentFocusInput(userCurrentFocus)}
                  value={userCurrentFocus}
                  onChange={e => setUserCurrentFocus(e.target.value)}
                  validationMessage={validateCurrentFocusInput(
                    userCurrentFocus,
                  )}
                />
                <Button
                  appearance="primary"
                  intent="success"
                  onClick={() => submitUserInfoUpdate()}
                >
                  Update
                </Button>
              </Pane>
            </Pane>
          </Pane>
          <Pane
            aria-label="Bottom Pane"
            display="flex"
            flexDirection="column"
            height="32vh"
            background="white"
            padding="1rem"
            marginTop="1rem"
            elevation={1}
          >
            <Label htmlFor="following-table" marginBottom={8} display="block">
              Following
            </Label>
            <Table width="100%" id="following-table">
              <Table.Head>
                <Table.SearchHeaderCell
                  flexGrow={2}
                  onChange={value => setSearchValue(value)}
                  placeholder="Search friends"
                />
                {/* This empty text element is needed to align the header cells */}
                <Text size={300} marginLeft="1rem" />
                <Table.HeaderCell>
                  <Text size={300}>
                    <b>Projects</b>
                  </Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text size={300}>
                    <b>Unfollow</b>
                  </Text>
                </Table.HeaderCell>
              </Table.Head>
              <Table.Body height="25vh">
                {userinfo.following
                  .filter(friend => friend.username.includes(searchValue))
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
                      <Table.Cell flexGrow={2}>
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
                      <Table.Cell>
                        <Text size={300}>{friend.projects.length}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <IconButton
                          icon={BlockedPersonIcon}
                          intent="danger"
                          appearance="minimal"
                          alignSelf="center"
                          onClickCapture={event => {
                            event.stopPropagation();
                            setUnfollowDialog(friend);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Pane>
        </Pane>
      )}
      <UploadImage
        title="Upload Profile Picture"
        isShown={showProfileUpload}
        setShownCallback={shown => setShowProfileUpload(shown)}
        submitCallback={(filename, data, contentType) =>
          updateUserProfilePicture(filename, data, contentType)
        }
      />
      <Dialog
        isShown={showUnfollowDialog}
        hasHeader={false}
        intent="warning"
        width="25vw"
        onCloseComplete={() => resetUnfollowDialog()}
        onConfirm={() => {
          unfollowUser(userToUnfollow.id);
          resetUnfollowDialog();
        }}
        confirmLabel="Confirm"
      >
        <Strong>{`Confirm unfollow ${userToUnfollow.username}?`}</Strong>
      </Dialog>
    </Pane>
  );
}

EditUserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editUserPage: makeSelectEditUserPage(),
  user: makeSelectCurrentUser(),
  userinfo: makeSelectUserInfo(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUserInfo: () => dispatch(loadUserInfo()),
    updateUserInfo: information => dispatch(updateUserInfo(information)),
    updateUserProfilePicture: (filename, data, contentType) =>
      dispatch(updateUserProfilePicture(filename, data, contentType)),
    unfollowUser: userid => dispatch(unfollowUser(userid)),
    setError: error => dispatch(loadUserInfoFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditUserPage);
