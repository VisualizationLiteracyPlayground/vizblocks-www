/* eslint-disable react/prop-types */
/**
 *
 * DeleteProjectConfirmation
 *
 */

import React, { memo } from 'react';
import { Dialog, Paragraph } from 'evergreen-ui';

function DeleteProjectConfirmation({
  currentProject,
  isShown,
  closeCallback,
  confirmCallback,
}) {
  return (
    <Dialog
      isShown={isShown}
      title={`Confirm move '${currentProject.title || 'project'}' to trash?`}
      intent="danger"
      width="25vw"
      onCloseComplete={() => closeCallback()}
      onConfirm={() => confirmCallback(currentProject.id)}
      confirmLabel="Confirm"
    >
      <Paragraph size={400}>
        <b>Removed projects will not appear in studios they were added in.</b>
      </Paragraph>
    </Dialog>
  );
}

DeleteProjectConfirmation.propTypes = {};

export default memo(DeleteProjectConfirmation);
