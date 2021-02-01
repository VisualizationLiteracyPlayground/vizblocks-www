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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { VLAT_TEST_TYPE } from 'utils/vlatUtil';

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

  useEffect(() => {
    if (user && !user.data.isAdmin) {
      // User is not admin
      setError({ title: 'Invalid access!', description: 'No admin rights.' });
      history.push(`/`);
    }
  }, [user]);
  useEffect(() => {
    if (!initialAssessmentStats) {
      loadAssessmentStats(VLAT_TEST_TYPE.INITIAL_ASSESSMENT);
    }
    if (!postAssessmentStats) {
      loadAssessmentStats(VLAT_TEST_TYPE.POST_ASSESSMENT);
    }
  }, []);
  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
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
