/**
 *
 * LandingMast
 *
 */

import { Button, Pane, Strong } from 'evergreen-ui';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import LandingMastLogo from 'images/landing-mast.svg';

import ColorPallete from '../../colorPallete';

function LandingMast() {
  return (
    <Pane
      background={ColorPallete.secondaryColor}
      height="40vh"
      display="flex"
      border="default"
    >
      <Pane
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
        marginLeft="10vw"
      >
        <div>
          <Strong size={600}>
            <b>Learn, create and vizualise data with Vizblocks.</b>
          </Strong>
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <Strong size={600}>
            <b>Share with others around the world!</b>
          </Strong>
        </div>
        <Link
          to="/project-gui"
          style={{ marginTop: '1rem', textDecoration: 'none' }}
        >
          <Button>Start Creating</Button>
        </Link>
      </Pane>
      <Pane display="flex" alignItems="flex-end">
        <img
          style={{
            width: '40vw',
            maxWidth: '50vw',
            height: 'auto',
            marginRight: '3rem',
          }}
          src={LandingMastLogo}
          alt="Vizblock logo with illustrations for landing page"
        />
      </Pane>
    </Pane>
  );
}

LandingMast.propTypes = {};

export default memo(LandingMast);
