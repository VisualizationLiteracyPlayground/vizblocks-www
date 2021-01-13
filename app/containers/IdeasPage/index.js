/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * IdeasPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Heading,
  LightbulbIcon,
  Pane,
  Strong,
  Tooltip,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import InteractiveTutorial from 'images/getting-started-illustration.svg';
import VizblocksLogo from 'images/vizblocks-logo.png';
import VideoTutorial from 'images/video-tutorial.png';

import makeSelectIdeasPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import history from '../../utils/history';

export function IdeasPage({ user }) {
  useInjectReducer({ key: 'ideasPage', reducer });
  useInjectSaga({ key: 'ideasPage', saga });

  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <Pane
        aria-label="Landing mast"
        background={ColorPallete.secondaryColor}
        height="20vh"
        display="flex"
        border="default"
      >
        <Pane
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="left"
          justifyContent="center"
          marginLeft="10vw"
        >
          <Strong size={600}>
            <b>What will you create?</b>
          </Strong>
        </Pane>
        <Pane display="flex" alignItems="flex-end">
          <img
            style={{
              width: '25vw',
              maxWidth: '50vw',
              height: 'auto',
              marginRight: '3rem',
            }}
            src={VizblocksLogo}
            alt="Vizblock logo with illustrations for landing page"
          />
        </Pane>
      </Pane>
      <Pane
        aria-label="Tutorial cards"
        display="flex"
        width="100vw"
        height="60vh"
        alignItems="center"
        justifyItems="center"
        marginTop="1rem"
      >
        <Pane
          aria-label="Video Tutorial"
          display="flex"
          width="50%"
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
        >
          <img
            style={{
              width: 'auto',
              height: '20vh',
              maxHeight: '40vh',
            }}
            src={VideoTutorial}
            alt="Illustration for video tutorials"
          />
          <Button
            iconBefore={LightbulbIcon}
            appearance="primary"
            intent="success"
            marginTop="1rem"
            onClick={() => history.push(`/ideas/video-tutorials`)}
          >
            Video Tutorials
          </Button>
          <Heading size={400} marginTop="1rem">
            New to VizBlocks?
          </Heading>
          <Heading size={400}>
            {`Watch tutorials on building different charts and graphs!`}
          </Heading>
        </Pane>
        <Pane
          height="20vh"
          borderColor={ColorPallete.grey}
          borderWidth="0.1rem"
          borderLeftStyle="solid"
          justifySelf="center"
          alignSelf="center"
          aria-label="Vertical divider"
        />
        <Pane
          aria-label="Video Tutorial"
          display="flex"
          width="50%"
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          opacity="0.5"
        >
          <Tooltip content="Coming soon">
            <img
              style={{
                width: 'auto',
                height: '20vh',
                maxHeight: '40vh',
              }}
              src={InteractiveTutorial}
              alt="Illustration for interactive tutorials"
            />
          </Tooltip>
          <Button
            iconBefore={LightbulbIcon}
            appearance="primary"
            intent="success"
            marginTop="1rem"
            onClick={() => {}}
            disabled
          >
            Interactive Tutorials
          </Button>
          <Heading size={400} marginTop="1rem">
            Looking to learn more about visualizations?
          </Heading>
        </Pane>
      </Pane>
    </Pane>
  );
}

IdeasPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ideasPage: makeSelectIdeasPage(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(IdeasPage);
