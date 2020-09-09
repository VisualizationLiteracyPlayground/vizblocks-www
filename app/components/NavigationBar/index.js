/**
 *
 * NavigationBar
 *
 */

import React, { memo } from 'react';
import { HandIcon, LogInIcon, Pane, Strong } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ColorPallete from '../../colorPallete';
import LogoWord from '../LogoWord';

function NavigationBar({ isLoggedIn }) {
  return (
    <Pane
      background={ColorPallete.primaryColor}
      height="3.5rem"
      display="flex"
      alignItems="center"
      border="default"
    >
      <Pane flex={1} display="flex" alignItems="center">
        <LogoWord />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="2rem" size={500}>
            <b>Ideas</b>
          </Strong>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="3rem" size={500}>
            <b>About</b>
          </Strong>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="3rem" size={500}>
            <b>Explore</b>
          </Strong>
        </Link>
        {isLoggedIn && (
          <Link to="/" style={{ display: isLoggedIn, textDecoration: 'none' }}>
            <Strong color="white" marginLeft="3rem" size={500}>
              <b>My Stuff</b>
            </Strong>
          </Link>
        )}
      </Pane>
      <Pane>
        <div style={{ display: !isLoggedIn }}>
          <Link to="/register-user" style={{ textDecoration: 'none' }}>
            <HandIcon color="white" marginBottom="0.3rem" />
            <Strong
              color="white"
              marginLeft="0.5rem"
              marginRight="3rem"
              size={500}
            >
              <b>Join Community</b>
            </Strong>
          </Link>
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <LogInIcon color="white" marginBottom="0.3rem" />
            <Strong
              color="white"
              marginLeft="0.5rem"
              marginRight="3rem"
              size={500}
            >
              <b>Sign In</b>
            </Strong>
          </Link>
        </div>
      </Pane>
    </Pane>
  );
}

NavigationBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default memo(NavigationBar);
