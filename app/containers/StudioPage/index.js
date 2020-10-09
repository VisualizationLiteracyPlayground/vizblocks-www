/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * StudioPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  CogIcon,
  Dialog,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  Popover,
  Position,
  SidebarTab,
  Spinner,
  Switch,
  Tablist,
  TextInputField,
  toaster,
} from 'evergreen-ui';

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
import CuratorListView from '../../components/CuratorListView';
import { makeSelectCurrentUser } from '../App/selectors';

function getStudioHeaderInfo(studio) {
  return studio
    ? `Updated: ${prettyDateFormat(studio.history.modified)} | Curators: 
      ${studio.curators.length}`
    : '';
}

function validateStudioTitle(title) {
  let msg = null;
  if (title === '') {
    msg = 'Title is required';
  } else if (title.length > 50) {
    msg = `${title.length}/50 characters`;
  }
  return msg;
}

function validateStudioDescription(description) {
  let msg = null;
  if (description.length > 255) {
    msg = `${description.length}/255 characters`;
  }
  return msg;
}

export function StudioPage({
  user,
  studio,
  createStudio,
  loadStudio,
  updateStudioPermissions,
  updateStudioInformation,
  error,
  setError,
}) {
  useInjectReducer({ key: 'studioPage', reducer });
  useInjectSaga({ key: 'studioPage', saga });

  // Load state from react-router
  const location = useLocation();
  const isStateful = !!location.state;

  const [tabIndex, setTabIndex] = useState(0);
  const [userRole, setUserRole] = useState(USER_ROLE.UNLISTED);
  const [studioid, setStudioid] = useState(
    isStateful ? location.state.studioid : 0,
  );
  const [loaded, setLoaded] = useState(false);
  const [permissionFields, setPermissionFields] = useState({
    member: {
      addFolder: false,
      addProject: false,
      commenting: false,
    },
  });
  const [showPermissions, setShowPermissions] = useState(false);
  const [informationFields, setInformationFields] = useState({
    title: '',
    description: '',
  });
  const [showInformation, setShowInformation] = useState(false);

  const tabsList = ['Projects', 'Comments', 'Curators'];

  function setUserInformation() {
    if (!user) {
      // Not logged in
      setUserRole(USER_ROLE.GUEST);
    }
    const userCuratorProfile = studio.curators.find(
      curator => curator.user._id === user.user.id,
    );
    if (userCuratorProfile) {
      setUserRole(userCuratorProfile.role);
    } else {
      setUserRole(USER_ROLE.UNLISTED);
    }
  }

  function setPermissions() {
    setPermissionFields({
      member: {
        addFolder: studio.settings.member.addFolder,
        addProject: studio.settings.member.addProject,
        commenting: studio.settings.member.commenting,
      },
    });
  }

  function setInformation() {
    setInformationFields({
      title: studio.title,
      description: studio.description,
    });
  }

  function submitInformationChange() {
    const checkTitle = validateStudioTitle(informationFields.title);
    const checkDescription = validateStudioDescription(
      informationFields.description,
    );

    if (!checkTitle && !checkDescription) {
      updateStudioInformation(studioid, informationFields, studio);
      setShowInformation(false);
    } else {
      setError(checkTitle || checkDescription || 'There are fields with error');
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
      setStudioid(studio._id);
      setUserInformation();
      setPermissions();
      setInformation();
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

  return isStateful ? (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
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
                width: 'auto',
                height: '8rem',
                marginLeft: '1rem',
                marginRight: '3rem',
                borderStyle: 'solid',
                borderWidth: '0.2rem',
                borderColor: ColorPallete.backgroundColor,
              }}
              src={DefaultThumbnail}
              alt="Vizblock default studio thumbnail"
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
              <Paragraph marginTop="0.5rem">{studio.description}</Paragraph>
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
                  onClick={() => {}}
                >
                  Share
                </Button>
                <Button
                  disabled={userRole === USER_ROLE.GUEST}
                  appearance="primary"
                  intent={
                    userRole === USER_ROLE.UNLISTED ? 'success' : 'warning'
                  }
                  onClick={() => {}}
                >
                  {userRole === USER_ROLE.UNLISTED ? 'Follow' : 'Unfollow'}
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
                  onSelect={() => setTabIndex(index)}
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
                  {index !== 2 && <Heading>{tab}</Heading>}
                  {index === 2 && (
                    <CuratorListView
                      userRole={userRole}
                      curators={studio.curators}
                    />
                  )}
                </Pane>
              ))}
            </Pane>
          </Pane>
        </Pane>
      )}
      <Dialog
        isShown={showPermissions}
        title="Permissions Settings"
        intent="success"
        onCloseComplete={() => setShowPermissions(false)}
        onConfirm={() => {
          updateStudioPermissions(studioid, permissionFields, studio);
          setShowPermissions(false);
        }}
        confirmLabel="Save"
      >
        <Heading size={300} marginTop="0.5rem" color="gray">
          <b>Member</b>
        </Heading>
        <Pane>
          <Heading size={300} marginTop="0.5rem" color="gray">
            Add new folder
          </Heading>
          <Switch
            checked={permissionFields.member.addFolder}
            onChange={e => {
              const newPermissions = Object.assign({}, permissionFields);
              newPermissions.member.addFolder = e.target.checked;
              setPermissionFields(newPermissions);
            }}
          />
          <Heading size={300} marginTop="0.5rem" color="gray">
            Add new project
          </Heading>
          <Switch
            checked={permissionFields.member.addProject}
            onChange={e => {
              const newPermissions = Object.assign({}, permissionFields);
              newPermissions.member.addProject = e.target.checked;
              setPermissionFields(newPermissions);
            }}
          />
          <Heading size={300} marginTop="0.5rem" color="gray">
            Comment
          </Heading>
          <Switch
            checked={permissionFields.member.commenting}
            onChange={e => {
              const newPermissions = Object.assign({}, permissionFields);
              newPermissions.member.commenting = e.target.checked;
              setPermissionFields(newPermissions);
            }}
          />
        </Pane>
      </Dialog>
      <Dialog
        isShown={showInformation}
        title="Studio Information"
        intent="success"
        onCloseComplete={() => setShowInformation(false)}
        onConfirm={() => {
          submitInformationChange();
        }}
        confirmLabel="Save"
      >
        <TextInputField
          width="100%"
          label="Title"
          placeholder="Title"
          validationMessage={validateStudioTitle(informationFields.title)}
          value={informationFields.title}
          onChange={e => {
            const newInformationFields = Object.assign({}, informationFields);
            newInformationFields.title = e.target.value;
            setInformationFields(newInformationFields);
          }}
        />
        <TextInputField
          width="100%"
          height="auto"
          marginTop="2rem"
          label="Description"
          placeholder="Description"
          validationMessage={validateStudioDescription(
            informationFields.description,
          )}
          value={informationFields.description}
          onChange={e => {
            const newInformationFields = Object.assign({}, informationFields);
            newInformationFields.description = e.target.value;
            setInformationFields(newInformationFields);
          }}
        />
      </Dialog>
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
    updateStudioPermissions: (studioid, permissions, studio) =>
      dispatch(updateStudioPermissions(studioid, permissions, studio)),
    updateStudioInformation: (studioid, information, studio) =>
      dispatch(updateStudioInformation(studioid, information, studio)),
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
