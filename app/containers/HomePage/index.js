/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import LandingMast from '../../components/LandingMast';
import NavigationBar from '../../components/NavigationBar';
import { makeSelectCurrentUser } from '../App/selectors';

function HomePage({ user }) {
  function isLoggedIn() {
    if (user) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(user));
    }
    // eslint-disable-next-line no-unneeded-ternary
    return user ? true : false;
  }

  return (
    <div>
      <NavigationBar isLoggedIn={isLoggedIn()} />
      <LandingMast />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HomePage);
