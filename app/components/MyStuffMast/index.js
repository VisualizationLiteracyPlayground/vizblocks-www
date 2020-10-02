/**
 *
 * MyStuffMast
 *
 */

import React, { memo } from 'react';
import { Button, Pane, PlusIcon, Strong } from 'evergreen-ui';
import { Link } from 'react-router-dom';

import VizblocksLogo from 'images/vizblocks-logo.png';

import ColorPallete from '../../colorPallete';

function MyStuffMast() {
  return (
    <Pane
      background={ColorPallete.secondaryColor}
      height="15vh"
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
        <Strong size={600}>
          <b>My Stuff</b>
        </Strong>
        <div style={{ marginTop: '1rem' }}>
          <Link
            to="/project-gui"
            style={{ marginTop: '1rem', textDecoration: 'none' }}
          >
            <Button width="8rem" iconBefore={PlusIcon}>
              New Project
            </Button>
          </Link>
          <Link
            to="/TODO"
            style={{
              marginTop: '1rem',
              marginLeft: '2rem',
              textDecoration: 'none',
            }}
          >
            <Button width="8rem" iconBefore={PlusIcon}>
              New Studio
            </Button>
          </Link>
        </div>
      </Pane>
      <Pane display="flex" alignItems="flex-end">
        <img
          style={{
            width: '20vw',
            maxWidth: '50vw',
            height: 'auto',
            marginRight: '3rem',
          }}
          src={VizblocksLogo}
          alt="Vizblock logo with illustrations for landing page"
        />
      </Pane>
    </Pane>
  );
}

MyStuffMast.propTypes = {};

export default memo(MyStuffMast);
