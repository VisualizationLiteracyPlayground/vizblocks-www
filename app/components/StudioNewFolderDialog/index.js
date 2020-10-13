/* eslint-disable react/prop-types */
/**
 *
 * StudioNewFolderDialog
 *
 */

import React, { memo, useState } from 'react';
import { Dialog, TextInputField } from 'evergreen-ui';

function validateFolderName(title) {
  let msg = null;
  if (title === '') {
    msg = 'Name is required';
  } else if (title.length > 50) {
    msg = `${title.length}/50 characters`;
  }
  return msg;
}

function StudioNewFolderDialog({
  folderList,
  isShown,
  setShown,
  updateCallback,
  validationErrorCallback,
}) {
  // Turn this flag off if uniqueness for folder names is not required
  const ensureFolderNameUnique = true;
  const [folderName, setFolderName] = useState('');

  function resetState() {
    setFolderName('');
  }

  function ensureUniqueness(title) {
    let msg = null;
    if (
      ensureFolderNameUnique &&
      folderList.find(folder => folder.name === title)
    ) {
      msg = 'Folder name should be unique';
    }
    return msg;
  }

  function submitUpdateCallback() {
    const validateInput = validateFolderName(folderName);
    const validateUnique = ensureUniqueness(folderName);
    if (!validateInput && !validateUnique) {
      updateCallback(folderName);
      setShown(false);
    } else {
      validationErrorCallback(
        validateInput ||
          validateUnique ||
          'Folder name does not meet requirements',
      );
    }
  }

  return (
    <Dialog
      isShown={isShown}
      title="Create new folder"
      intent="success"
      onCloseComplete={() => {
        resetState();
        setShown(false);
      }}
      onConfirm={() => submitUpdateCallback()}
      confirmLabel="Save"
    >
      <TextInputField
        width="100%"
        label="Folder name"
        placeholder="Name"
        validationMessage={validateFolderName(folderName)}
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
      />
    </Dialog>
  );
}

StudioNewFolderDialog.propTypes = {};

export default memo(StudioNewFolderDialog);
