/* eslint-disable react/prop-types */
/**
 *
 * StudioPermissionsDialog
 *
 */

import React, { memo, useState } from 'react';
import { Dialog, Heading, Pane, Switch } from 'evergreen-ui';

function StudioPermissionsDialog({
  isShown,
  studio,
  updateCallback,
  setShown,
}) {
  const [permissionFields, setPermissionFields] = useState({
    member: {
      addFolder: studio.settings.member.addFolder,
      addProject: studio.settings.member.addProject,
      commenting: studio.settings.member.commenting,
    },
  });

  function resetPermissionFields() {
    setPermissionFields({
      member: {
        addFolder: studio.settings.member.addFolder,
        addProject: studio.settings.member.addProject,
        commenting: studio.settings.member.commenting,
      },
    });
  }

  return (
    <Dialog
      isShown={isShown}
      title="Permissions Settings"
      intent="success"
      onCloseComplete={() => {
        resetPermissionFields();
        setShown(false);
      }}
      onConfirm={() => {
        // eslint-disable-next-line no-underscore-dangle
        updateCallback(studio._id, permissionFields);
        setShown(false);
      }}
      confirmLabel="Save"
    >
      <Heading size={300} marginTop="0.5rem" color="gray">
        <b>Member</b>
      </Heading>
      <Pane>
        <Heading size={300} marginTop="0.5rem" color="gray">
          Add/Delete folder
        </Heading>
        <Switch
          checked={permissionFields.member.addFolder}
          onChange={e => {
            const newPermissions = Object.assign({}, permissionFields);
            newPermissions.member.addFolder = e.target.checked;
            setPermissionFields(newPermissions);
          }}
        />
        <Heading size={300} marginTop="0.5rem" color="gray">
          Add new project
        </Heading>
        <Switch
          checked={permissionFields.member.addProject}
          onChange={e => {
            const newPermissions = Object.assign({}, permissionFields);
            newPermissions.member.addProject = e.target.checked;
            setPermissionFields(newPermissions);
          }}
        />
        <Heading size={300} marginTop="0.5rem" color="gray">
          Comment
        </Heading>
        <Switch
          checked={permissionFields.member.commenting}
          onChange={e => {
            const newPermissions = Object.assign({}, permissionFields);
            newPermissions.member.commenting = e.target.checked;
            setPermissionFields(newPermissions);
          }}
        />
      </Pane>
    </Dialog>
  );
}

StudioPermissionsDialog.propTypes = {};

export default memo(StudioPermissionsDialog);
