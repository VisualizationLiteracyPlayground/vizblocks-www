/**
 *
 * LogoutConfirmation
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Strong } from 'evergreen-ui';

function LogoutConfirmation({ isShown, closeCallback, confirmCallback }) {
  return (
    <Dialog
      isShown={isShown}
      hasHeader={false}
      intent="warning"
      width="25vw"
      onCloseComplete={() => closeCallback()}
      onConfirm={() => confirmCallback()}
      confirmLabel="Confirm"
    >
      <Strong>Confirm log out?</Strong>
    </Dialog>
  );
}

LogoutConfirmation.propTypes = {
  isShown: PropTypes.bool,
  closeCallback: PropTypes.func,
  confirmCallback: PropTypes.func,
};

export default memo(LogoutConfirmation);
