/**
 *
 * RegistrationConfirmation
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Strong, Text } from 'evergreen-ui';

function RegistrationConfirmation({
  isShown,
  information,
  closeCallback,
  confirmCallback,
}) {
  return (
    <Dialog
      isShown={isShown}
      title="Confirm account details"
      intent="success"
      onCloseComplete={() => closeCallback()}
      onConfirm={() => confirmCallback()}
      confirmLabel="Confirm"
    >
      <div style={{ padding: '1rem' }}>
        <Strong size={400}>
          <b>Username</b>
        </Strong>
        <br />
        <Text size={400}>{information.username}</Text>
        <br />
        <br />
        <Strong size={400}>
          <b>Email</b>
        </Strong>
        <br />
        <Text size={400}>{information.email}</Text>
      </div>
    </Dialog>
  );
}

RegistrationConfirmation.propTypes = {
  isShown: PropTypes.bool,
  information: PropTypes.object,
  closeCallback: PropTypes.func,
  confirmCallback: PropTypes.func,
};

export default memo(RegistrationConfirmation);
