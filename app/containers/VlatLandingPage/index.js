/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VlatLandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  BookIcon,
  Button,
  Heading,
  Pane,
  PredictiveAnalysisIcon,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { VLAT_TEST_TYPE, getBackgroundColorForTestType } from 'utils/vlatUtil';
import PostStudyImage from 'images/poststudy.png';
import PreStudyImage from 'images/prestudy.png';
import ResearchImage from 'images/research.png';

import makeSelectVlatLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import history from '../../utils/history';

export function VlatLandingPage({ user }) {
  useInjectReducer({ key: 'vlatLandingPage', reducer });
  useInjectSaga({ key: 'vlatLandingPage', saga });

  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <Pane display="flex" flexDirection="column" height="93vh">
        <Pane
          display="flex"
          flex={1}
          background={getBackgroundColorForTestType(
            VLAT_TEST_TYPE.INITIAL_ASSESSMENT,
          )}
          alignItems="center"
          justifyItems="center"
        >
          <img
            style={{
              width: 'auto',
              height: '18vh',
              marginRight: '3rem',
              marginLeft: '8rem',
            }}
            src={PreStudyImage}
            alt="Illustration of test"
          />
          <Pane
            display="flex"
            flexDirection="column"
            aria-label="first-pane description"
          >
            <Heading size={600}>Initial Assessment</Heading>
            <Heading size={400} marginTop="1rem">
              {`Take an initial test to assess your proficiency in data visualizations`}
            </Heading>
            <Button
              iconBefore={PredictiveAnalysisIcon}
              appearance="primary"
              intent="danger"
              marginTop="0.5rem"
              width="max-content"
              onClick={() =>
                history.push(`/ideas/vlat/${VLAT_TEST_TYPE.INITIAL_ASSESSMENT}`)
              }
            >
              Start
            </Button>
          </Pane>
        </Pane>
        <Pane
          display="flex"
          flex={1}
          flexDirection="row-reverse"
          background={getBackgroundColorForTestType(
            VLAT_TEST_TYPE.POST_ASSESSMENT,
          )}
          alignItems="center"
          justifyItems="center"
        >
          <img
            style={{
              width: 'auto',
              height: '18vh',
              marginRight: '8rem',
              marginLeft: '3rem',
            }}
            src={PostStudyImage}
            alt="Illustration of education"
          />
          <Pane
            display="flex"
            flexDirection="column"
            aria-label="second-pane description"
          >
            <Heading size={600} alignSelf="flex-end">
              Post Assessment
            </Heading>
            <Heading size={400} marginTop="1rem">
              {`After exploring Vizblocks, take a post-learning test to gauge your improvements with data visualizations!`}
            </Heading>
            <Button
              iconBefore={PredictiveAnalysisIcon}
              appearance="primary"
              intent="danger"
              marginTop="0.5rem"
              width="max-content"
              alignSelf="flex-end"
              onClick={() =>
                history.push(`/ideas/vlat/${VLAT_TEST_TYPE.POST_ASSESSMENT}`)
              }
            >
              Start
            </Button>
          </Pane>
        </Pane>
        <Pane
          display="flex"
          flex={1}
          background={ColorPallete.paneThree}
          alignItems="center"
          justifyItems="center"
        >
          <img
            style={{
              width: 'auto',
              height: '18vh',
              marginRight: '3rem',
              marginLeft: '8rem',
            }}
            src={ResearchImage}
            alt="Illustration of a book"
          />
          <Pane
            display="flex"
            flexDirection="column"
            aria-label="first-pane description"
          >
            <Heading size={600}>What is VLAT</Heading>
            <Heading size={300} marginTop="1rem">
              {`VLAT: Development of a Visualization Literacy Assessment Test`}
              <br />
              {`Authors: Sukwon Lee, Sung-Hee Kim, Bum Chul Kwon`}
              <br />
              {`Publication: IEEE Transactions on Visualization and Computer Graphics | 
                January 2017 | 
                https://doi.org/10.1109/TVCG.2016.2598920`}
            </Heading>
            <Button
              iconBefore={BookIcon}
              appearance="primary"
              intent="danger"
              marginTop="0.5rem"
              width="max-content"
              onClick={() =>
                window.open('https://www.bckwon.com/pdf/vlat.pdf', '_blank')
              }
            >
              PDF
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

VlatLandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vlatLandingPage: makeSelectVlatLandingPage(),
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
)(VlatLandingPage);
