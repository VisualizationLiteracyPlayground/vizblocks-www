/* eslint-disable react/prop-types */
/**
 *
 * UndeleteProjectConfirmation
 *
 */

import React, { memo } from 'react';
import { Dialog, Paragraph } from 'evergreen-ui';

function UndeleteProjectConfirmation({
  currentProject,
  isShown,
  closeCallback,
  confirmCallback,
}) {
  return (
    <Dialog
      isShown={isShown}
      title={`Confirm restore '${currentProject.title || 'project'}'?`}
      intent="danger"
      width="25vw"
      onCloseComplete={() => closeCallback()}
      onConfirm={() => confirmCallback(currentProject.id)}
      confirmLabel="Confirm"
    >
      <Paragraph size={400}>
        <b>
          Restored projects will appear again in studios they were added in
          previously.
        </b>
      </Paragraph>
      <Paragraph marginTop="1rem" size={300} color="gray">
        <b>Note:</b>
      </Paragraph>
      <Paragraph size={300} color="gray">
        Removal of project from studio must be done manually on the studio page.
      </Paragraph>
    </Dialog>
  );
}

UndeleteProjectConfirmation.propTypes = {};

export default memo(UndeleteProjectConfirmation);
