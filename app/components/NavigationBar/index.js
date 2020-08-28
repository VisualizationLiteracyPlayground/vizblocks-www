/**
 *
 * NavigationBar
 *
 */

import React, { memo } from 'react';
import { Pane, Strong } from 'evergreen-ui';
import { Link } from 'react-router-dom';

import ColorPallete from '../../colorPallete';
import LogoWord from '../LogoWord';

function NavigationBar() {
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
      </Pane>
      <Pane>{/* Right side */}</Pane>
    </Pane>
  );
}

NavigationBar.propTypes = {};

export default memo(NavigationBar);
