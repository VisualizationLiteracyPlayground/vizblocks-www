/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * StudioPage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  CogIcon,
  Dialog,
  DuplicateIcon,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  Popover,
  Position,
  SidebarTab,
  Spinner,
  Tablist,
  TextareaField,
  toaster,
} from 'evergreen-ui';

import { WEBSITE_BASE_URL } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-studio-thumbnail.jpg';

import {
  createStudio,
  loadStudio,
  loadStudioFailure,
  updateStudioPermissions,
  updateStudioInformation,
  updateStudioThumbnail,
  addFollower,
  removeFollower,
} from './actions';
import {
  makeSelectError,
  makeSelectStudio,
  makeSelectStudioPage,
} from './selectors';
import { USER_ROLE } from './constants';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import NavigationBar from '../../components/NavigationBar';
import StudioProjectView from '../../components/StudioProjectView';
import StudioCommentView from '../../components/StudioCommentView';
import CuratorListView from '../../components/CuratorListView';
import StudioInformationDialog from '../../components/StudioInformationDialog';
import StudioPermissionsDialog from '../../components/StudioPermissionsDialog';
import StudioUnfollowConfirmation from '../../components/StudioUnfollowConfirmation';
import UploadImage from '../../components/UploadImage';
import { makeSelectCurrentUser } from '../App/selectors';
import history from '../../utils/history';

function getStudioHeaderInfo(studio) {
  return studio
    ? `Updated: ${prettyDateFormat(studio.history.modified)} | Curators: 
      ${studio.curators.length}`
    : '';
}

function getStudioThumbnail(studio) {
  return studio.image
    ? `data:${studio.image.contentType};base64,${studio.image.data}`
    : DefaultThumbnail;
}

export function StudioPage({
  user,
  studio,
  createStudio,
  loadStudio,
  updateStudioPermissions,
  updateStudioInformation,
  updateStudioThumbnail,
  addFollower,
  removeFollower,
  error,
  setError,
}) {
  useInjectReducer({ key: 'studioPage', reducer });
  useInjectSaga({ key: 'studioPage', saga });

  // Load state from react-router
  const location = useLocation();
  const isStateful = !!location.state;

  const [tabIndex, setTabIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const [userRole, setUserRole] = useState(USER_ROLE.UNLISTED);
  const [studioid, setStudioid] = useState(
    isStateful ? location.state.studioid : 0,
  );
  const [loaded, setLoaded] = useState(false);
  // Dialog States
  const [showPermissions, setShowPermissions] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showThumbnailUpload, setShowThumbnailUpload] = useState(false);
  const [showShareURL, setShowShareURL] = useState(false);
  const [showUnfollowConfirmation, setShowUnfollowConfirmation] = useState(
    false,
  );
  // Text area that contains studio share url
  const copyAreaRef = useRef(null);
  const commentsListRef = useRef(null);

  const tabsList = ['Projects', 'Comments', 'Curators'];

  function copyUrlToClipboard() {
    copyAreaRef.current.select();
    document.execCommand('copy');
    setSuccess({
      title: 'Copied link to clipboard!',
      description: '',
    });
  }

  function resetCommentsScroll() {
    if (commentsListRef) {
      commentsListRef.current.scrollTop = 0;
    }
  }

  function switchTab(index) {
    if (index === 1) {
      // Comments view
      resetCommentsScroll();
    }
    setTabIndex(index);
  }

  function setUserInformation() {
    if (!user) {
      // Not logged in
      setUserRole(USER_ROLE.GUEST);
    } else {
      const userCuratorProfile = studio.curators.find(
        curator => curator.user._id === user.data.id,
      );
      if (userCuratorProfile) {
        setUserRole(userCuratorProfile.role);
      } else {
        setUserRole(USER_ROLE.UNLISTED);
      }
    }
  }

  function triggerFollowUnfollow() {
    if (userRole === USER_ROLE.UNLISTED) {
      addFollower(studioid);
    } else {
      setShowUnfollowConfirmation(true);
    }
  }

  function updateStudioid(id) {
    setStudioid(id);
    if (isStateful) {
      history.replace(location.pathname, { studioid: id });
    }
  }

  useEffect(() => {
    if (!loaded && isStateful) {
      if (studioid === 0) {
        // Create a new studio
        createStudio();
      } else {
        // load studio
        loadStudio(studioid);
      }
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (studio) {
      updateStudioid(studio._id);
      setUserInformation();
    }
  }, [studio]);
  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger('Encountered error:', {
        description: error,
      });
      setError(false);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      toaster.success(success.title, {
        description: success.description,
      });
      setSuccess(false);
    }
  }, [success]);

  return isStateful ? (
    <Pane height="100vh" background={ColorPallete.secondaryColor}>
      <NavigationBar user={user} />
      {!studio && (
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
      {studio && (
        <Pane padding="1.5rem">
          <Pane
            display="flex"
            height="22vh"
            background="white"
            padding="1rem"
            elevation={1}
            alignItems="center"
            justifyItems="center"
          >
            <img
              style={{
                width: '10rem',
                height: '8rem',
                marginLeft: '1rem',
                marginRight: '3rem',
                borderStyle: 'solid',
                borderWidth: '0.2rem',
                borderColor: ColorPallete.backgroundColor,
                objectFit: 'cover',
              }}
              src={getStudioThumbnail(studio)}
              alt={
                studio.image
                  ? studio.image.filename
                  : 'Vizblock default studio thumbnail'
              }
            />
            <Pane
              flex={1}
              height="8rem"
              display="flex"
              flexDirection="column"
              flexGrow={1}
              alignItems="left"
              justifyItems="center"
              padding="0.5rem"
            >
              <Heading size={600}>{studio.title}</Heading>
              <Heading size={300} marginTop="0.5rem" color="gray">
                {getStudioHeaderInfo(studio)}
              </Heading>
              <Pane maxHeight="4.5rem" overflowY="auto">
                <Paragraph marginTop="0.5rem">{studio.description}</Paragraph>
              </Pane>
            </Pane>
            <Pane
              height="8rem"
              display="flex"
              flexDirection="column"
              padding="0.5rem"
              marginRight="1rem"
              marginLeft="5rem"
              alignItems="flex-end"
            >
              <Pane display="flex" flexGrow={1}>
                <Popover
                  content={
                    <Pane
                      display="flex"
                      padding="0.5rem"
                      alignItems="left"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Button
                        appearance="minimal"
                        onClick={() => setShowInformation(true)}
                      >
                        Information
                      </Button>
                      <Button
                        appearance="minimal"
                        onClick={() => setShowPermissions(true)}
                      >
                        Permissions
                      </Button>
                      <Button
                        appearance="minimal"
                        onClick={() => setShowThumbnailUpload(true)}
                      >
                        Thumbnail
                      </Button>
                    </Pane>
                  }
                  position={Position.LEFT}
                >
                  <IconButton
                    icon={CogIcon}
                    display={userRole === USER_ROLE.MANAGER ? 'block' : 'none'}
                    appearance="minimal"
                  />
                </Popover>
              </Pane>
              <Pane display="flex">
                <Button
                  appearance="primary"
                  intent="success"
                  marginRight="1rem"
                  onClick={() => setShowShareURL(true)}
                >
                  Share
                </Button>
                <Button
                  disabled={userRole === USER_ROLE.GUEST}
                  appearance="primary"
                  intent={
                    userRole === USER_ROLE.UNLISTED ||
                    userRole === USER_ROLE.GUEST
                      ? 'success'
                      : 'warning'
                  }
                  onClick={() => triggerFollowUnfollow()}
                >
                  {userRole === USER_ROLE.UNLISTED ||
                  userRole === USER_ROLE.GUEST
                    ? 'Follow'
                    : 'Unfollow'}
                </Button>
              </Pane>
            </Pane>
          </Pane>
          <Pane
            display="flex"
            height="62vh"
            background="white"
            padding="1rem"
            marginTop="1rem"
            elevation={1}
          >
            <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
              {tabsList.map((tab, index) => (
                <SidebarTab
                  key={tab}
                  id={tab}
                  onSelect={() => switchTab(index)}
                  isSelected={index === tabIndex}
                  aria-controls={`panel-${tab}`}
                >
                  {tab}
                </SidebarTab>
              ))}
            </Tablist>
            <Pane
              padding={16}
              borderLeftStyle="solid"
              borderWidth="0.15rem"
              borderColor={ColorPallete.backgroundColor}
              flex="1"
            >
              {tabsList.map((tab, index) => (
                <Pane
                  key={tab}
                  height="100%"
                  width="100%"
                  id={`panel-${tab}`}
                  role="tabpanel"
                  aria-labelledby={tab}
                  aria-hidden={index !== tabIndex}
                  display={index === tabIndex ? 'block' : 'none'}
                >
                  {index === 0 && (
                    <StudioProjectView
                      userRole={userRole}
                      user={user}
                      studioid={studioid}
                      studio={studio}
                      setError={setError}
                    />
                  )}
                  {index === 1 && (
                    <StudioCommentView
                      memberCommentPermission={
                        studio.settings.member.commenting
                      }
                      user={user}
                      userRole={userRole}
                      studioid={studioid}
                      commentsListRef={commentsListRef}
                    />
                  )}
                  {index === 2 && (
                    <CuratorListView
                      userRole={userRole}
                      user={user}
                      curators={studio.curators}
                      studioid={studioid}
                    />
                  )}
                </Pane>
              ))}
            </Pane>
          </Pane>
          <StudioPermissionsDialog
            isShown={showPermissions}
            studio={studio}
            updateCallback={(studioid, permissionFields) =>
              updateStudioPermissions(studioid, permissionFields)
            }
            setShown={shown => setShowPermissions(shown)}
          />
          <StudioInformationDialog
            isShown={showInformation}
            studio={studio}
            updateCallback={(studioid, informationFields) =>
              updateStudioInformation(studioid, informationFields)
            }
            validationErrorCallback={error => setError(error)}
            setShown={shown => setShowInformation(shown)}
          />
          <UploadImage
            title="Update Studio Thumbnail"
            isShown={showThumbnailUpload}
            setShownCallback={shown => setShowThumbnailUpload(shown)}
            submitCallback={(filename, data, contentType) =>
              updateStudioThumbnail(studioid, filename, data, contentType)
            }
          />
          <Dialog
            isShown={showShareURL}
            hasFooter={false}
            hasHeader={false}
            onCloseComplete={() => setShowShareURL(false)}
          >
            <Pane display="flex" alignItems="center">
              <Heading size={400}>
                <b>Share studio url:</b>
              </Heading>
              {document.queryCommandSupported('copy') && (
                <IconButton
                  icon={DuplicateIcon}
                  marginLeft="1rem"
                  appearance="minimal"
                  onClick={() => copyUrlToClipboard()}
                />
              )}
            </Pane>
            <TextareaField
              label=""
              marginTop="1rem"
              flexGrow={2}
              ref={copyAreaRef}
              value={`${WEBSITE_BASE_URL}share-studio/${studioid}`}
              readOnly
            />
          </Dialog>
          <StudioUnfollowConfirmation
            isShown={showUnfollowConfirmation}
            userRole={userRole}
            curators={studio.curators}
            closeCallback={() => setShowUnfollowConfirmation(false)}
            confirmCallback={() => {
              setShowUnfollowConfirmation(false);
              removeFollower(studioid);
            }}
          />
        </Pane>
      )}
    </Pane>
  ) : (
    <Redirect to="/" />
  );
}

StudioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studioPage: makeSelectStudioPage(),
  user: makeSelectCurrentUser(),
  studio: makeSelectStudio(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createStudio: () => dispatch(createStudio()),
    loadStudio: studioid => dispatch(loadStudio(studioid)),
    updateStudioPermissions: (studioid, permissions) =>
      dispatch(updateStudioPermissions(studioid, permissions)),
    updateStudioInformation: (studioid, information) =>
      dispatch(updateStudioInformation(studioid, information)),
    updateStudioThumbnail: (studioid, filename, data, contentType) =>
      dispatch(updateStudioThumbnail(studioid, filename, data, contentType)),
    addFollower: studioid => dispatch(addFollower(studioid)),
    removeFollower: studioid => dispatch(removeFollower(studioid)),
    setError: error => dispatch(loadStudioFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioPage);
