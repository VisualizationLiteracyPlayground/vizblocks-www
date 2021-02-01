/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VlatQuizPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  IconButton,
  Heading,
  HomeIcon,
  Pane,
  Tooltip,
  toaster,
} from 'evergreen-ui';
import { useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  checkTestTypeEnum,
  getBackgroundColorForTestType,
  getTestTypeTitle,
  checkVisualizationTypeEnum,
  getVisualizationTypeIllustration,
  getVisualizationTypeTitle,
} from 'utils/vlatUtil';
import history from 'utils/history';

import { loadQuiz, loadQuizFailure, submitQuiz, setSuccess } from './actions';
import {
  makeSelectVlatQuizPage,
  makeSelectError,
  makeSelectSuccess,
  makeSelectQuiz,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import Quiz from '../../components/Quiz';
import QuizScore from '../../components/QuizScore';
import ColorPallete from '../../colorPallete';

export function VlatQuizPage({
  user,
  quiz,
  error,
  success,
  loadQuiz,
  submitQuiz,
  setError,
  setSuccess,
}) {
  useInjectReducer({ key: 'vlatQuizPage', reducer });
  useInjectSaga({ key: 'vlatQuizPage', saga });

  let { testType, visualizationType } = useParams();
  testType = checkTestTypeEnum(testType);
  visualizationType = checkVisualizationTypeEnum(visualizationType);

  const [clickedSubmit, setClickedSubmit] = useState(false);

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
    // Catch and alert success messages
    if (success) {
      toaster.success(success);
      setSuccess(false);
    }
  }, [success]);
  useEffect(() => {
    if (testType === '' || visualizationType === '') {
      // URL supplied is incorrect
      history.push(`/not-found-page`);
    } else {
      loadQuiz(testType, visualizationType);
    }
  }, []);

  return (
    <Pane height="100vh" background={getBackgroundColorForTestType(testType)}>
      <NavigationBar user={user} />
      <Pane
        display="flex"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
      >
        <Pane
          aria-label="header"
          display="flex"
          width="100vw"
          marginTop="1rem"
          alignItems="center"
          justifyItems="center"
        >
          <Tooltip content={`${getTestTypeTitle(testType)} Categories`}>
            <IconButton
              icon={HomeIcon}
              appearance="minimal"
              height={40}
              marginLeft="2rem"
              onClick={() => history.push(`/ideas/vlat/${testType}`)}
            />
          </Tooltip>
          <Pane display="flex" flexDirection="column">
            <Pane display="flex" alignItems="center">
              <img
                style={{
                  width: 'auto',
                  height: '8vh',
                  marginLeft: '2rem',
                }}
                src={getVisualizationTypeIllustration(visualizationType)}
                alt={`Illustration of ${visualizationType}`}
              />
              <Heading size={600} marginLeft="1rem">
                {`${getTestTypeTitle(testType)}: ${getVisualizationTypeTitle(
                  visualizationType,
                )}`}
              </Heading>
            </Pane>
            <Pane
              borderColor={ColorPallete.lightGrey}
              width="100%"
              borderWidth="0.1rem"
              borderTopStyle="solid"
              marginTop="0.5rem"
              marginLeft="2rem"
              aria-label="Horizontal divider"
            />
          </Pane>
        </Pane>
        {!clickedSubmit && (
          <Quiz
            user={user}
            quiz={quiz}
            submitQuizCallback={submitQuiz}
            setSubmittedCallback={setClickedSubmit}
          />
        )}
        {clickedSubmit && <QuizScore clickedSubmit={clickedSubmit} />}
      </Pane>
    </Pane>
  );
}

VlatQuizPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vlatQuizPage: makeSelectVlatQuizPage(),
  user: makeSelectCurrentUser(),
  quiz: makeSelectQuiz(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadQuiz: (testType, category) => dispatch(loadQuiz(testType, category)),
    submitQuiz: (userid, testType, testScore) =>
      dispatch(submitQuiz(userid, testType, testScore)),
    setError: error => dispatch(loadQuizFailure(error)),
    setSuccess: success => dispatch(setSuccess(success)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VlatQuizPage);
