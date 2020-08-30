/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import LandingMast from '../../components/LandingMast';
import NavigationBar from '../../components/NavigationBar';

export default function HomePage() {
  function isLoggedIn() {
    // TO ADD BACKEND CALL
    return false;
  }

  return (
    <div>
      <NavigationBar isLoggedIn={isLoggedIn()} />
      <LandingMast />
    </div>
  );
}
