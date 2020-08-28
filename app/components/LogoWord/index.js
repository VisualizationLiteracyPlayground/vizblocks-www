/**
 *
 * LogoWord
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import LogoText from 'images/vizblocks-wordlogo.png';

function LogoWord({ maxWidth }) {
  return (
    <img
      style={{ width: '40vw', maxWidth, height: 'auto', margin: '1.5rem' }}
      src={LogoText}
      alt="Vizblock word-logo"
    />
  );
}

LogoWord.propTypes = {
  maxWidth: PropTypes.string,
};

LogoWord.defaultProps = {
  maxWidth: '150px',
};

export default memo(LogoWord);
