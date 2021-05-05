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
import { Pane, Strong } from 'evergreen-ui';

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
  makeSelectAllUserStats,
} from './selectors';
import { loadAssessmentStats, loadTableStats } from './actions';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import { setError } from '../App/actions';
import NavigationBar from '../../components/NavigationBar';
import VlatStatsGraphTab from '../../components/VlatStatsGraphTab';
import VlatStatsTableTab from '../../components/VlatStatsTableTab';

const xLabels = Object.values(VISUALIZATION_TYPE);

export function VlatStats({
  user,
  initialAssessmentStats,
  postAssessmentStats,
  allUserStats,
  setError,
  loadAssessmentStats,
  loadTableStats,
}) {
  useInjectReducer({ key: 'vlatStats', reducer });
  useInjectSaga({ key: 'vlatStats', saga });

  const [tab, setTab] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [initialAssessmentData, setInitialAssessmentData] = useState({});
  const [postAssessmentData, setPostAssessmentData] = useState({});

  function fillInInitialAssessmentData() {
    if (initialAssessmentStats) {
      const dataPoints = new Array(xLabels.length).fill(0);
      const countPoints = new Array(xLabels.length).fill(0);
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
      const dataPoints = new Array(xLabels.length).fill(0);
      const countPoints = new Array(xLabels.length).fill(0);
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
    if (!loaded || !allUserStats) {
      loadTableStats();
    }
    // Loaded is required because selectors state won't reset on refresh page
    setLoaded(true);
  }, []);
  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      background={ColorPallete.secondaryColor}
    >
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
            onClick={() => setTab(1)}
          >
            <Strong size={500} color={tab === 1 ? 'black' : 'grey'}>
              Table
            </Strong>
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
        <VlatStatsGraphTab
          initialAssessmentData={initialAssessmentData}
          postAssessmentData={postAssessmentData}
          xLabels={xLabels}
        />
      )}
      {tab === 1 && <VlatStatsTableTab data={allUserStats} />}
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
  allUserStats: makeSelectAllUserStats(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setError: error => dispatch(setError(error)),
    loadAssessmentStats: testType => dispatch(loadAssessmentStats(testType)),
    loadTableStats: () => dispatch(loadTableStats()),
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
