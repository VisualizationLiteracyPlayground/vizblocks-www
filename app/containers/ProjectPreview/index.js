/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * ProjectPreview
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DuplicateIcon,
  Heading,
  IconButton,
  Pane,
  Strong,
  TextareaField,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { WEBSITE_BASE_URL } from 'utils/constants';

import { loadProjectDetails, loadProjectDetailsFailure } from './actions';
import {
  makeSelectProjectPreview,
  makeSelectProject,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import ProjectInfo from '../../components/ProjectInfo';

export function ProjectPreview({
  project,
  loadProjectDetails,
  user,
  error,
  setError,
}) {
  useInjectReducer({ key: 'projectPreview', reducer });
  useInjectSaga({ key: 'projectPreview', saga });

  // Get state from route
  const location = useLocation();
  const projectid = location.state ? location.state.projectid : 0;

  const [currentTab, setCurrentTab] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showShareURL, setShowShareURL] = useState(false);
  // Text area that contains project share url
  const copyAreaRef = useRef(null);

  function copyUrlToClipboard() {
    copyAreaRef.current.select();
    document.execCommand('copy');
    setSuccess({
      title: 'Copied link to clipboard!',
      description: '',
    });
  }

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
  useEffect(() => {
    if (!loaded) {
      loadProjectDetails(projectid);
      setLoaded(true);
    }
  }, []);
  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <Pane display="flex" aria-label="header" background="white">
        <Pane display="flex" flexGrow={1} />
        <Pane
          display="flex"
          aria-label="Tab-bar"
          flexDirection="row"
          marginTop="0.5rem"
        >
          <Pane
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
            onClick={() => setCurrentTab(0)}
          >
            <Strong size={500} color={currentTab === 0 ? 'black' : 'grey'}>
              Project
            </Strong>
            <Pane
              width="10vw"
              borderColor={
                currentTab === 0 ? ColorPallete.accentColor : 'white'
              }
              borderWidth="0.3rem"
              borderTopStyle="solid"
              marginTop="0.3rem"
              aria-label="Horizontal divider"
            />
          </Pane>
          <Pane
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
            onClick={() => setCurrentTab(1)}
          >
            <Strong size={500} color={currentTab === 1 ? 'black' : 'grey'}>
              Comments
            </Strong>
            <Pane
              width="10vw"
              borderColor={
                currentTab === 1 ? ColorPallete.accentColor : 'white'
              }
              borderWidth="0.3rem"
              borderTopStyle="solid"
              marginTop="0.3rem"
              aria-label="Horizontal divider"
            />
          </Pane>
        </Pane>
        <Pane display="flex" flexGrow={1} />
      </Pane>
      {currentTab === 0 && project && (
        <ProjectInfo
          user={user}
          project={project}
          history={history}
          location={location}
          onClickShare={() => setShowShareURL(true)}
        />
      )}
      <Dialog
        isShown={showShareURL}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setShowShareURL(false)}
      >
        <Pane display="flex" alignItems="center">
          <Heading size={400}>
            <b>Share project url:</b>
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
          value={`${WEBSITE_BASE_URL}share-project/${projectid}`}
          readOnly
        />
      </Dialog>
    </Pane>
  );
}

ProjectPreview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projectPreview: makeSelectProjectPreview(),
  user: makeSelectCurrentUser(),
  project: makeSelectProject(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProjectDetails: projectid => dispatch(loadProjectDetails(projectid)),
    setError: error => dispatch(loadProjectDetailsFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectPreview);
