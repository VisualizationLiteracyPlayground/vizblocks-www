/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * InteractiveTutorialPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, Strong } from 'evergreen-ui';
import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectInteractiveTutorialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';

export function InteractiveTutorialPage({ user }) {
  useInjectReducer({ key: 'interactiveTutorialPage', reducer });
  useInjectSaga({ key: 'interactiveTutorialPage', saga });

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
          >
            <Link
              to="/ideas/video-tutorials"
              style={{ textDecoration: 'none' }}
            >
              <Strong size={500}>Video</Strong>
            </Link>
            <Pane
              width="10vw"
              borderColor="white"
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
          >
            <Strong size={500}>Interactive</Strong>
            <Pane
              width="10vw"
              borderColor={ColorPallete.accentColor}
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

InteractiveTutorialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  interactiveTutorialPage: makeSelectInteractiveTutorialPage(),
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
)(InteractiveTutorialPage);
