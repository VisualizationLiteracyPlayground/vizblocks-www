/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * StudioCuratorRoleDialog
 *
 */

import React, { memo, useEffect, useState } from 'react';
import {
  BanCircleIcon,
  Dialog,
  Heading,
  RadioGroup,
  Paragraph,
  Pane,
} from 'evergreen-ui';

import { USER_ROLE } from 'containers/StudioPage/constants';

import ColorPallete from '../../colorPallete';

function StudioCuratorRoleDialog({
  isShown,
  user,
  curator,
  curatorList,
  updateCallback,
  setShown,
}) {
  const [role, setRole] = useState(curator.role);

  const radioOptions = [
    { label: USER_ROLE.MANAGER, value: USER_ROLE.MANAGER },
    { label: USER_ROLE.MEMBER, value: USER_ROLE.MEMBER },
  ];

  // Only managers can trigger this dialog.
  // If there is only 1 manager and the manager is editing himself
  // Then it is true that the user is editing the last manager
  const isEditingLastManager =
    curator.user._id === user.data.id &&
    curatorList.filter(curator => curator.role === USER_ROLE.MANAGER).length <
      2;

  function resetRole() {
    setRole(curator.role);
  }

  useEffect(() => resetRole(), [curator]);

  return (
    <Dialog
      isShown={isShown}
      title="Modify Curator Role"
      intent="warning"
      onCloseComplete={() => {
        resetRole();
        setShown(false);
      }}
      onConfirm={() => {
        updateCallback(role);
        setShown(false);
      }}
      confirmLabel="Save"
      hasFooter={!(isEditingLastManager && role === USER_ROLE.MEMBER)}
    >
      <RadioGroup
        label={`${curator.user.username} role:`}
        value={role}
        options={radioOptions}
        onChange={event => setRole(event.target.value)}
      />
      {isEditingLastManager && role === USER_ROLE.MEMBER && (
        <Pane
          display="flex"
          flexDirection="column"
          justifyItems="center"
          alignItems="center"
        >
          <Pane
            width="100%"
            borderColor={ColorPallete.backgroundColor}
            borderWidth="0.15rem"
            borderTopStyle="solid"
          />
          <Pane display="flex" marginTop="1rem">
            <BanCircleIcon color="danger" />
            <Heading size={400} marginLeft="0.5rem" marginRight="0.5rem">
              Action not allowed
            </Heading>
            <BanCircleIcon color="danger" />
          </Pane>
          <Paragraph size={300}>
            There must be at least 1 manager in a studio
          </Paragraph>
        </Pane>
      )}
    </Dialog>
  );
}

StudioCuratorRoleDialog.propTypes = {};

export default memo(StudioCuratorRoleDialog);
