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
  return (
    <div>
      <NavigationBar />
      <LandingMast />
    </div>
  );
}
