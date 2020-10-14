/* eslint-disable react/prop-types */
/**
 *
 * StudioInformationDialog
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Dialog, TextInputField } from 'evergreen-ui';

function StudioInformationDialog({
  isShown,
  studio,
  updateCallback,
  validationErrorCallback,
  setShown,
}) {
  const [informationFields, setInformationFields] = useState({
    title: studio.title,
    description: studio.description,
  });

  function validateStudioTitle(title) {
    let msg = null;
    if (title === '') {
      msg = 'Title is required';
    } else if (title.length > 50) {
      msg = `${title.length}/50 characters`;
    }
    return msg;
  }

  function validateStudioDescription(description) {
    let msg = null;
    if (description.length > 255) {
      msg = `${description.length}/255 characters`;
    }
    return msg;
  }

  function resetInformation() {
    setInformationFields({
      title: studio.title,
      description: studio.description,
    });
  }

  function submitInformationChange() {
    const checkTitle = validateStudioTitle(informationFields.title);
    const checkDescription = validateStudioDescription(
      informationFields.description,
    );

    if (!checkTitle && !checkDescription) {
      // eslint-disable-next-line no-underscore-dangle
      updateCallback(studio._id, informationFields);
      setShown(false);
    } else {
      validationErrorCallback(
        checkTitle || checkDescription || 'There are fields with error',
      );
    }
  }

  useEffect(() => {
    resetInformation();
  }, [studio]);

  return (
    <Dialog
      isShown={isShown}
      title="Studio Information"
      intent="success"
      onCloseComplete={() => {
        resetInformation();
        setShown(false);
      }}
      onConfirm={() => {
        submitInformationChange();
      }}
      confirmLabel="Save"
    >
      <TextInputField
        width="100%"
        label="Title"
        placeholder="Title"
        validationMessage={validateStudioTitle(informationFields.title)}
        value={informationFields.title}
        onChange={e => {
          const newInformationFields = Object.assign({}, informationFields);
          newInformationFields.title = e.target.value;
          setInformationFields(newInformationFields);
        }}
      />
      <TextInputField
        width="100%"
        height="auto"
        marginTop="2rem"
        label="Description"
        placeholder="Description"
        validationMessage={validateStudioDescription(
          informationFields.description,
        )}
        value={informationFields.description}
        onChange={e => {
          const newInformationFields = Object.assign({}, informationFields);
          newInformationFields.description = e.target.value;
          setInformationFields(newInformationFields);
        }}
      />
    </Dialog>
  );
}

StudioInformationDialog.propTypes = {};

export default memo(StudioInformationDialog);
