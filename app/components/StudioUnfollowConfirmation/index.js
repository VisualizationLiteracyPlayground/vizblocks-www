/* eslint-disable react/prop-types */
/**
 *
 * StudioUnfollowConfirmation
 *
 */

import React, { memo } from 'react';
import { Dialog, Heading, Paragraph, Pane } from 'evergreen-ui';

import { USER_ROLE } from 'containers/StudioPage/constants';

function StudioUnfollowConfirmation({
  isShown,
  userRole,
  curators,
  closeCallback,
  confirmCallback,
}) {
  const willTriggerDelete = curators.length === 1;
  const isLastManager =
    userRole === USER_ROLE.MANAGER &&
    curators.filter(curator => curator.role === USER_ROLE.MANAGER).length < 2;

  return (
    <Dialog
      isShown={isShown}
      hasHeader={false}
      intent={willTriggerDelete ? 'danger' : 'warning'}
      width="25vw"
      onCloseComplete={() => closeCallback()}
      onConfirm={() => confirmCallback()}
      confirmLabel="Confirm"
      hasFooter={!(isLastManager && !willTriggerDelete)}
    >
      {/*
        Case where user is the last curator of the studio
        unfollowing will delete the studio for good.
      */}
      {willTriggerDelete && (
        <Pane>
          <Heading size={600}>
            <b>Beware!</b>
          </Heading>
          <Paragraph marginTop="1rem">
            You are the last curator of this studio.
          </Paragraph>
          <Paragraph>
            Unfollowing will permanently <b>delete</b> the studio!
          </Paragraph>
          <Heading size={400} marginTop="0.5rem">
            Proceed with caution.
          </Heading>
        </Pane>
      )}
      {/*
        Case where user is the last manager
        but not the last curator of the studio.
        User can only unfollow after assigning at least 1 member to be manager.
      */}
      {isLastManager && !willTriggerDelete && (
        <Pane>
          <Heading size={600}>
            <b>Action needed!</b>
          </Heading>
          <Paragraph marginTop="1rem">
            You are the only manager of this studio.
          </Paragraph>
          <Paragraph>
            To unfollow, you need to assign at least 1 member to be manager.
          </Paragraph>
        </Pane>
      )}
      {/*
        Case where user is member
        can safely unfollow
      */}
      {!isLastManager && !willTriggerDelete && (
        <Pane>
          <Heading size={600}>
            <b>Confirm unfollow?</b>
          </Heading>
          <Heading size={400} marginTop="1rem">
            Note:
          </Heading>
          <Paragraph>
            Any projects authored by you will remain in this studio.
          </Paragraph>
        </Pane>
      )}
    </Dialog>
  );
}

StudioUnfollowConfirmation.propTypes = {};

export default memo(StudioUnfollowConfirmation);
