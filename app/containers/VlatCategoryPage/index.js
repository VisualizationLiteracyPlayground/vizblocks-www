/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VlatCategoryPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Heading,
  HomeIcon,
  IconButton,
  Pane,
  Tooltip,
} from 'evergreen-ui';
import { useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  VLAT_TEST_TYPE,
  checkTestTypeEnum,
  getBackgroundColorForTestType,
  VISUALIZATION_TYPE,
  getVisualizationTypeIllustration,
  getVisualizationTypeTitle,
} from 'utils/vlatUtil';
import PreStudyImage from 'images/prestudy.png';
import PostStudyImage from 'images/poststudy.png';

import { loadUserVlatScore } from './actions';
import { makeSelectVlatCategoryPage, makeSelectVlatScore } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import history from '../../utils/history';

function getVisualizationTypeScore(testType, visualizationType, vlatScore) {
  let scoreValue = 0;
  let scoreObject;

  if (vlatScore && testType === VLAT_TEST_TYPE.INITIAL_ASSESSMENT) {
    scoreObject = vlatScore.initialAssessmentScore.find(
      score => score.category === visualizationType,
    );
  }
  if (vlatScore && testType === VLAT_TEST_TYPE.POST_ASSESSMENT) {
    scoreObject = vlatScore.postAssessmentScore.find(
      score => score.category === visualizationType,
    );
    if (scoreObject) scoreValue = scoreObject.score;
  }

  if (scoreObject) scoreValue = scoreObject.score;
  return scoreValue;
}

export function VlatCategoryPage({ user, vlatScore, loadUserVlatScore }) {
  useInjectReducer({ key: 'vlatCategoryPage', reducer });
  useInjectSaga({ key: 'vlatCategoryPage', saga });

  let { testType } = useParams();
  testType = checkTestTypeEnum(testType);

  useEffect(() => {
    if (testType === '') {
      // URL supplied is incorrect
      history.push(`/not-found-page`);
    } else if (user) {
      loadUserVlatScore(user.data.id);
    } else {
      loadUserVlatScore(0);
    }
  }, []);
  return (
    <Pane height="100vh" background={getBackgroundColorForTestType(testType)}>
      <NavigationBar user={user} />
      <Pane
        display="flex"
        flexDirection="column"
        height="93vh"
        alignContent="center"
        justifyContent="center"
      >
        <Pane
          aria-label="header"
          display="flex"
          width="100vw"
          alignItems="center"
          justifyItems="center"
        >
          <Pane display="flex" flex={1} />
          <Pane
            aria-label="header details"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
          >
            <Tooltip content="Assessment Homepage">
              <IconButton
                icon={HomeIcon}
                appearance="minimal"
                height={40}
                onClick={() => history.push(`/ideas/vlat`)}
              />
            </Tooltip>
            <Pane display="flex" alignItems="center" justifyItems="center">
              <Pane
                visibility={
                  testType === VLAT_TEST_TYPE.INITIAL_ASSESSMENT
                    ? 'hidden'
                    : 'visible'
                }
              >
                <Tooltip content="Pre-Assessment">
                  <IconButton
                    icon={ArrowLeftIcon}
                    appearance="minimal"
                    marginRight="1rem"
                    height={40}
                    onClick={() =>
                      history.push(
                        `/ideas/vlat/${VLAT_TEST_TYPE.INITIAL_ASSESSMENT}`,
                      )
                    }
                  />
                </Tooltip>
              </Pane>
              <Pane
                aria-label="header description"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyItems="center"
              >
                <img
                  style={{
                    width: 'auto',
                    height: '18vh',
                    marginTop: '1rem',
                  }}
                  src={
                    testType === VLAT_TEST_TYPE.INITIAL_ASSESSMENT
                      ? PreStudyImage
                      : PostStudyImage
                  }
                  alt="Illustration of test"
                />
                <Heading size={500}>
                  {testType === VLAT_TEST_TYPE.INITIAL_ASSESSMENT
                    ? 'Pre-Assessment'
                    : 'Post-Assessment'}
                </Heading>
              </Pane>
              <Pane
                visibility={
                  testType === VLAT_TEST_TYPE.POST_ASSESSMENT
                    ? 'hidden'
                    : 'visible'
                }
              >
                <Tooltip content="Post-Assessment">
                  <IconButton
                    icon={ArrowRightIcon}
                    appearance="minimal"
                    marginLeft="1rem"
                    height={40}
                    onClick={() =>
                      history.push(
                        `/ideas/vlat/${VLAT_TEST_TYPE.POST_ASSESSMENT}`,
                      )
                    }
                  />
                </Tooltip>
              </Pane>
            </Pane>
          </Pane>
          <Pane display="flex" flex={1} />
        </Pane>
        <Pane
          borderColor={ColorPallete.grey}
          width="30%"
          borderWidth="0.1rem"
          borderTopStyle="solid"
          marginTop="2rem"
          justifySelf="center"
          alignSelf="center"
          aria-label="Horizontal divider"
        />
        <Pane
          aria-label="categories"
          display="flex"
          width="100vw"
          marginTop="2rem"
          alignItems="center"
          justifyItems="center"
        >
          <Pane
            aria-label="pie-chart"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            cursor="pointer"
            onClick={() =>
              history.push(
                `/vlat-quiz/${testType}/${VISUALIZATION_TYPE.PIE_CHART}`,
              )
            }
          >
            <img
              style={{
                width: 'auto',
                height: '18vh',
              }}
              src={getVisualizationTypeIllustration(
                VISUALIZATION_TYPE.PIE_CHART,
              )}
              alt="Illustration of pie-chart"
            />
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.PIE_CHART)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.PIE_CHART,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="bar-chart"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            cursor="pointer"
            onClick={() =>
              history.push(
                `/vlat-quiz/${testType}/${VISUALIZATION_TYPE.BAR_CHART}`,
              )
            }
          >
            <img
              style={{
                width: 'auto',
                height: '18vh',
              }}
              src={getVisualizationTypeIllustration(
                VISUALIZATION_TYPE.BAR_CHART,
              )}
              alt="Illustration of bar-chart"
            />
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.BAR_CHART)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.BAR_CHART,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="histogram"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.HISTOGRAM,
                )}
                alt="Illustration of histogram"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.HISTOGRAM)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.HISTOGRAM,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="pictograph"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.PICTOGRAPH,
                )}
                alt="Illustration of pictograph"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.PICTOGRAPH)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.PICTOGRAPH,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="dotplot"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.DOT_PLOT,
                )}
                alt="Illustration of dot plot"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.DOT_PLOT)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.DOT_PLOT,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="line-chart"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.LINE_CHART,
                )}
                alt="Illustration of line chart"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.LINE_CHART)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.LINE_CHART,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="scatter-plot"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.SCATTER_PLOT,
                )}
                alt="Illustration of scatter plot"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.SCATTER_PLOT)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.SCATTER_PLOT,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
          <Pane
            aria-label="heatmap"
            display="flex"
            flex={1}
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            opacity="0.5"
            cursor="pointer"
          >
            <Tooltip content="Coming soon">
              <img
                style={{
                  width: 'auto',
                  height: '18vh',
                }}
                src={getVisualizationTypeIllustration(
                  VISUALIZATION_TYPE.HEATMAP,
                )}
                alt="Illustration of heat map"
              />
            </Tooltip>
            <Heading size={400}>
              {getVisualizationTypeTitle(VISUALIZATION_TYPE.HEATMAP)}
            </Heading>
            <Heading size={200} color="grey">
              {`Your top score: ${getVisualizationTypeScore(
                testType,
                VISUALIZATION_TYPE.HEATMAP,
                vlatScore,
              )}`}
            </Heading>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

VlatCategoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vlatCategoryPage: makeSelectVlatCategoryPage(),
  user: makeSelectCurrentUser(),
  vlatScore: makeSelectVlatScore(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadUserVlatScore: userid => dispatch(loadUserVlatScore(userid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VlatCategoryPage);
