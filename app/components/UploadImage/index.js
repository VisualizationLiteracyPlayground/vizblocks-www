/* eslint-disable react/prop-types */
/**
 *
 * UploadImage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import {
  Dialog,
  FilePicker,
  Pane,
  CloudUploadIcon,
  toaster,
} from 'evergreen-ui';

import ColorPallete from '../../colorPallete';

function UploadImage({ title, isShown, setShownCallback, submitCallback }) {
  const [imageData, setImageData] = useState('');
  const [imageType, setImageType] = useState('');
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger('Encountered error:', {
        description: error,
      });
      setError(false);
    }
  }, [error]);

  function uploadCleanup() {
    setImageData('');
    setImageType('');
    setImageName('');
  }

  function uploadErrorCleanup(errorMsg) {
    uploadCleanup();
    setError(errorMsg);
  }

  return (
    <Dialog
      isShown={isShown}
      title={title}
      intent="success"
      onCloseComplete={() => {
        uploadCleanup();
        setShownCallback(false);
      }}
      onConfirm={() => {
        submitCallback(imageName, imageData, imageType);
        uploadCleanup();
        setShownCallback(false);
      }}
      confirmLabel="Upload"
      isConfirmDisabled={!imageData}
    >
      <Pane display="flex" flexDirection="column" alignItems="center">
        <Pane
          display="flex"
          width={250}
          height="8rem"
          background={
            imageData ? ColorPallete.backgroundColor : ColorPallete.lightGrey
          }
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
          marginBottom="0.5rem"
          aria-label="Image preview"
        >
          {imageData && imageType && (
            <img
              style={{
                width: '10rem',
                height: '8rem',
                objectFit: 'cover',
              }}
              src={`data:${imageType};base64,${imageData}`}
              alt="Upload preview"
            />
          )}
          {(!imageData || !imageType) && (
            <CloudUploadIcon size={36} color="white" />
          )}
        </Pane>
        <FilePicker
          accept="image/png, image/jpeg, image/svg+xml"
          width={250}
          onChange={files => {
            const file = files[0];
            setImageType(file.type);
            setImageName(file.name);
            if (file.type.substring(0, 5) !== 'image') {
              // user uploaded non-image file
              uploadErrorCleanup('Uploaded non-image file');
            } else {
              const reader = new FileReader();
              reader.onloadend = () => {
                const data = reader.result.split(',');
                if (data.length >= 2) {
                  setImageData(data[1]);
                } else {
                  uploadErrorCleanup('Image file unreadable');
                }
              };
              reader.readAsDataURL(file);
            }
          }}
          placeholder="Select a picture to upload!"
        />
      </Pane>
    </Dialog>
  );
}

UploadImage.propTypes = {};

export default memo(UploadImage);
