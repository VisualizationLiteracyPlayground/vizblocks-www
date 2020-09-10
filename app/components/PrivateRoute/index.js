/* eslint-disable react/prop-types */
/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
