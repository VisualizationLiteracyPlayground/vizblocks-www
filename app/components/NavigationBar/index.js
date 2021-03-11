/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * NavigationBar
 *
 */

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Avatar,
  Button,
  ChartIcon,
  ChevronDownIcon,
  HandIcon,
  LogInIcon,
  LogOutIcon,
  Pane,
  Popover,
  SettingsIcon,
  Strong,
  UserIcon,
} from 'evergreen-ui';
import { Link } from 'react-router-dom';

import ColorPallete from '../../colorPallete';
import LogoWord from '../LogoWord';
import LogoutConfirmation from '../LogoutConfirmation';
import { userSignedOut } from '../../containers/App/actions';
import history from '../../utils/history';
import { getAvaterImage } from '../../utils/util';

function NavigationBar({ user, userSignedOut }) {
  const [displayLogout, setDisplayLogout] = useState(false);

  function logoutCloseCallback() {
    setDisplayLogout(false);
  }

  function logoutConfirmCallback() {
    setDisplayLogout(false);
    userSignedOut();
    history.push('/');
  }

  function redirectToProfile(userid) {
    history.push(`/user-profile/${userid}`);
  }

  function redirectToAccountSettings() {
    history.push('/account-settings');
  }

  function redirectToVlatStats() {
    history.push('/vlat-stats');
  }

  return (
    <Pane
      background={ColorPallete.primaryColor}
      height="7vh"
      display="flex"
      alignItems="center"
      border="default"
    >
      <Pane flex={1} display="flex" alignItems="center">
        <Link to="/">
          <LogoWord />
        </Link>
        <Link to="/ideas" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="2rem" size={500}>
            <b>Ideas</b>
          </Strong>
        </Link>
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="3rem" size={500}>
            <b>About</b>
          </Strong>
        </Link>
        <Link to="/explore" style={{ textDecoration: 'none' }}>
          <Strong color="white" marginLeft="3rem" size={500}>
            <b>Explore</b>
          </Strong>
        </Link>
        {user && (
          <Link to="/my-stuff" style={{ textDecoration: 'none' }}>
            <Strong color="white" marginLeft="3rem" size={500}>
              <b>My Stuff</b>
            </Strong>
          </Link>
        )}
      </Pane>
      {!user && (
        <Pane>
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
        </Pane>
      )}
      {user && (
        <Pane>
          <Popover
            content={
              <Pane
                display="flex"
                padding="0.5rem"
                alignItems="left"
                justifyContent="center"
                flexDirection="column"
              >
                <Button
                  iconBefore={UserIcon}
                  appearance="minimal"
                  onClick={() => redirectToProfile(user.data.id)}
                >
                  Profile
                </Button>
                <Button
                  iconBefore={SettingsIcon}
                  appearance="minimal"
                  onClick={() => redirectToAccountSettings()}
                >
                  Account Setting
                </Button>
                {user.data.isAdmin && (
                  <Button
                    iconBefore={ChartIcon}
                    appearance="minimal"
                    onClick={() => redirectToVlatStats()}
                  >
                    VLAT Stats
                  </Button>
                )}
                <Button
                  iconBefore={LogOutIcon}
                  appearance="minimal"
                  onClick={() => {
                    setDisplayLogout(true);
                  }}
                >
                  Log out
                </Button>
              </Pane>
            }
          >
            <Pane display="flex" alignItems="center">
              <Avatar
                isSolid
                src={getAvaterImage(user.data)}
                name={user.data.username}
                size={32}
              />
              <Strong
                color="white"
                marginLeft="1rem"
                marginRight="0.5rem"
                size={500}
              >
                <b>{user.data.username}</b>
              </Strong>
              <ChevronDownIcon color="white" marginRight="1.5rem" />
            </Pane>
          </Popover>
          <LogoutConfirmation
            isShown={displayLogout}
            closeCallback={logoutCloseCallback}
            confirmCallback={logoutConfirmCallback}
          />
        </Pane>
      )}
    </Pane>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    userSignedOut: () => dispatch(userSignedOut()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NavigationBar);
