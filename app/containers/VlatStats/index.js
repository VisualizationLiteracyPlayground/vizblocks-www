/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/**
 *
 * VlatStats
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, Strong, Tooltip } from 'evergreen-ui';
import { Bar } from 'react-chartjs-2';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import {
  VLAT_TEST_TYPE,
  getTestTypeTitle,
  VISUALIZATION_TYPE,
} from 'utils/vlatUtil';

import {
  makeSelectVlatStats,
  makeSelectInitialAssessmentStats,
  makeSelectPostAssessmentStats,
} from './selectors';
import { loadAssessmentStats } from './actions';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import { setError } from '../App/actions';
import NavigationBar from '../../components/NavigationBar';

export function VlatStats({
  user,
  initialAssessmentStats,
  postAssessmentStats,
  setError,
  loadAssessmentStats,
}) {
  useInjectReducer({ key: 'vlatStats', reducer });
  useInjectSaga({ key: 'vlatStats', saga });

  const [tab, setTab] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [initialAssessmentData, setInitialAssessmentData] = useState({});
  const [postAssessmentData, setPostAssessmentData] = useState({});

  // Visualization variables
  const xLabels = Object.values(VISUALIZATION_TYPE);
  const options = {
    title: {
      display: true,
      text: 'VLAT Score Statistics',
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += `: ${tooltipItem.yLabel}`;
            // Display number of users that took the test
            label += ` | ${
              data.datasets[tooltipItem.datasetIndex].count[
                xLabels.findIndex(type => tooltipItem.xLabel === type)
              ]
            } user(s)`;
          }
          return label;
        },
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Avg Score',
          },
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  function fillInInitialAssessmentData() {
    if (initialAssessmentStats) {
      const dataPoints = new Array(xLabels).fill(0);
      const countPoints = new Array(xLabels).fill(0);
      initialAssessmentStats.forEach(data => {
        const idx = xLabels.findIndex(type => data._id === type);
        dataPoints[idx] = data.avgScore;
        countPoints[idx] = data.count;
      });
      setInitialAssessmentData({
        label: getTestTypeTitle(VLAT_TEST_TYPE.INITIAL_ASSESSMENT),
        type: 'bar',
        data: dataPoints,
        count: countPoints,
        backgroundColor: 'rgb(255, 99, 132)',
      });
    }
  }

  function fillInPostAssessmentData() {
    if (postAssessmentStats) {
      const dataPoints = new Array(xLabels).fill(0);
      const countPoints = new Array(xLabels).fill(0);
      postAssessmentStats.forEach(data => {
        const idx = xLabels.findIndex(type => data._id === type);
        dataPoints[idx] = data.avgScore;
        countPoints[idx] = data.count;
      });
      setPostAssessmentData({
        label: getTestTypeTitle(VLAT_TEST_TYPE.POST_ASSESSMENT),
        type: 'line',
        fill: false,
        data: dataPoints,
        count: countPoints,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
      });
    }
  }

  useEffect(() => {
    if (user && !user.data.isAdmin) {
      // User is not admin
      setError({ title: 'Invalid access!', description: 'No admin rights.' });
      history.push(`/`);
    }
  }, [user]);
  useEffect(() => {
    fillInInitialAssessmentData();
  }, [initialAssessmentStats]);
  useEffect(() => {
    fillInPostAssessmentData();
  }, [postAssessmentStats]);
  useEffect(() => {
    if (!loaded || !initialAssessmentStats) {
      loadAssessmentStats(VLAT_TEST_TYPE.INITIAL_ASSESSMENT);
    }
    if (!loaded || !postAssessmentStats) {
      loadAssessmentStats(VLAT_TEST_TYPE.POST_ASSESSMENT);
    }
    if (Object.keys(initialAssessmentData).length === 0) {
      fillInInitialAssessmentData();
    }
    if (Object.keys(postAssessmentData).length === 0) {
      fillInPostAssessmentData();
    }
    setLoaded(true);
  }, []);
  return (
    <Pane height="100vh" background={ColorPallete.secondaryColor}>
      <NavigationBar user={user} />
      <Pane display="flex" aria-label="header" background="white">
        <Pane display="flex" flexGrow={1} />
        <Pane
          display="flex"
          aria-label="tutorial type"
          flexDirection="row"
          marginTop="0.5rem"
        >
          <Pane
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
            onClick={() => setTab(0)}
          >
            <Strong size={500} color={tab === 0 ? 'black' : 'grey'}>
              Graph
            </Strong>
            <Pane
              width="10vw"
              borderColor={tab === 0 ? ColorPallete.accentColor : 'white'}
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
            onClick={() => {} /* setTab(1) */}
          >
            <Tooltip content="Coming soon">
              <Strong size={500} color={tab === 1 ? 'black' : 'grey'}>
                Table
              </Strong>
            </Tooltip>
            <Pane
              width="10vw"
              borderColor={tab === 1 ? ColorPallete.accentColor : 'white'}
              borderWidth="0.3rem"
              borderTopStyle="solid"
              marginTop="0.3rem"
              aria-label="Horizontal divider"
            />
          </Pane>
        </Pane>
        <Pane display="flex" flexGrow={1} />
      </Pane>
      {tab === 0 && (
        <Pane display="flex" height="85vh" flexDirection="column">
          <Pane display="flex" flex={1} />
          <Pane
            display="flex"
            flex={1}
            background="white"
            marginX="2rem"
            marginY="1.5rem"
            padding="1rem"
            elevation={1}
          >
            <Bar
              data={{
                labels: xLabels,
                datasets: [initialAssessmentData, postAssessmentData],
              }}
              options={options}
              height="100%"
            />
          </Pane>
          <Pane display="flex" flex={1} />
        </Pane>
      )}
    </Pane>
  );
}

VlatStats.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  vlatStats: makeSelectVlatStats(),
  user: makeSelectCurrentUser(),
  initialAssessmentStats: makeSelectInitialAssessmentStats(),
  postAssessmentStats: makeSelectPostAssessmentStats(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(setError(error)),
    loadAssessmentStats: testType => dispatch(loadAssessmentStats(testType)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(VlatStats);
