/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * NotFoundPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Heading, Pane, Strong } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectNotFoundPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import NotFoundIllustration from '../../images/404-error-illustration.png';

export function NotFoundPage({ user }) {
  useInjectReducer({ key: 'notFoundPage', reducer });
  useInjectSaga({ key: 'notFoundPage', saga });

  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      background={ColorPallete.secondaryColor}
    >
      <NavigationBar user={user} />
      <Pane flex={1} />
      <Pane
        display="flex"
        width="90%"
        height="75%"
        alignSelf="center"
        justifySelf="center"
        background={ColorPallete.backgroundColor}
      >
        <Pane
          display="flex"
          flex={1}
          flexDirection="column"
          aria-label="404 Word Descriptions"
        >
          <Pane flex={1} />
          <Pane display="flex" flexDirection="column" alignItems="flex-end">
            <Heading size={900}>Oops!</Heading>
            <Strong size={600} marginTop="0.5rem">
              {"We can't seem to find the page you're looking for."}
            </Strong>
            <Strong size={400} color="grey">
              Error code: 404
            </Strong>
          </Pane>
          <Pane flex={1} />
        </Pane>
        <img
          style={{
            maxWidth: 'auto',
            maxHeight: '70vh',
            alignSelf: 'flex-end',
            justifySelf: 'flex-end',
          }}
          src={NotFoundIllustration}
          alt="Vizblock logo with illustrations for landing page"
        />
      </Pane>
      <Pane flex={1} />
    </Pane>
  );
}

NotFoundPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notFoundPage: makeSelectNotFoundPage(),
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
)(NotFoundPage);
