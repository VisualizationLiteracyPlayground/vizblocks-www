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
  Paragraph,
  Strong,
  Tooltip,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import InteractiveTutorial from 'images/getting-started-illustration.svg';
import VizblocksLogo from 'images/vizblocks-logo.png';
import VlatTestImage from 'images/test.png';
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
        height="15vh"
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
              width: '20vw',
              maxWidth: '50vw',
              height: 'auto',
              marginRight: '3rem',
            }}
            src={VizblocksLogo}
            alt="Vizblock logo with illustrations for landing page"
          />
        </Pane>
      </Pane>
      <Pane display="flex" flexDirection="column" height="76vh">
        <Pane
          aria-label="VLAT card"
          display="flex"
          flex={1}
          height="30vh"
          alignItems="center"
          justifyItems="center"
        >
          <img
            style={{
              width: '20vw',
              maxWidth: '50vw',
              height: 'auto',
              marginRight: '3rem',
              marginLeft: '8rem',
            }}
            src={VlatTestImage}
            alt="Kid furiously taking a test"
          />
          <Pane
            display="flex"
            flexDirection="column"
            aria-label="VLAT card description"
          >
            <Heading size={800}>VLAT</Heading>
            <Heading size={500} marginTop="0.5rem">
              Visualization Literacy Assessment Test
            </Heading>
            <Paragraph>
              {`Take a quick test to find out your proficiency on data visualizations!`}
            </Paragraph>
            <Button
              iconBefore={LightbulbIcon}
              appearance="primary"
              intent="success"
              marginTop="0.5rem"
              width="max-content"
              onClick={() => history.push(`/ideas/vlat`)}
            >
              Start
            </Button>
          </Pane>
        </Pane>
        <Pane
          borderColor={ColorPallete.lightGrey}
          width="100%"
          borderWidth="0.1rem"
          borderTopStyle="solid"
          justifySelf="center"
          alignSelf="center"
          aria-label="Horizontal divider"
        />
        <Pane
          aria-label="Tutorial cards"
          display="flex"
          width="100vw"
          marginY="2rem"
          alignItems="center"
          justifyItems="center"
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
                height: '18vh',
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
            height="15vh"
            borderColor={ColorPallete.lightGrey}
            borderWidth="0.1rem"
            borderLeftStyle="solid"
            justifySelf="center"
            alignSelf="center"
            aria-label="Vertical divider"
          />
          <Pane
            aria-label="Interactive Tutorial"
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
                  height: '18vh',
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
