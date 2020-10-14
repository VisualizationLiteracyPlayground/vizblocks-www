/* eslint-disable react/prop-types */
/**
 *
 * StudioNewFolderDialog
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
  originalTitle,
}) {
  // Turn this flag off if uniqueness for folder names is not required
  const ensureFolderNameUnique = true;
  const [folderName, setFolderName] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  function resetState() {
    setFolderName('');
  }

  useEffect(() => {
    if (originalTitle) {
      setIsUpdateMode(true);
    } else {
      setIsUpdateMode(false);
    }
  }, [originalTitle]);

  function ensureUniqueness(title) {
    let msg = null;
    if (ensureFolderNameUnique) {
      // Remove original title from list if update mode
      let folders = folderList;
      if (isUpdateMode) {
        folders = folderList.filter(folder => folder.name !== originalTitle);
      }
      // Check if new title is not unque
      if (folders.find(folder => folder.name === title)) {
        msg = 'Folder name should be unique';
      }
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
      title={isUpdateMode ? 'Update folder name' : 'Create new folder'}
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
