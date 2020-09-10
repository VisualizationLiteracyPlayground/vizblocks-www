/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/**
 *
 * MyStuff
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectMyStuff from './selectors';
import reducer from './reducer';
import saga from './saga';
import NavigationBar from '../../components/NavigationBar';
import MyStuffMast from '../../components/MyStuffMast';
import { makeSelectCurrentUser } from '../App/selectors';

export function MyStuff({ user }) {
  useInjectReducer({ key: 'myStuff', reducer });
  useInjectSaga({ key: 'myStuff', saga });

  return (
    <div>
      <NavigationBar user={user} />
      <MyStuffMast />
    </div>
  );
}

MyStuff.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myStuff: makeSelectMyStuff(),
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
)(MyStuff);
