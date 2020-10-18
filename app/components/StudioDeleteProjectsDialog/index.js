/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * StudioDeleteProjectsDialog
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Dialog,
  Heading,
  ListItem,
  Paragraph,
  Pane,
  UnorderedList,
} from 'evergreen-ui';

import { deleteProjects } from 'containers/StudioPage/actions';

function StudioDeleteProjectsDialog({
  isShown,
  resetCallback,
  constructPayload,
  studioid,
  folderid,
  deleteProjects,
}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (isShown) {
      setProjects(constructPayload());
    }
  }, [isShown]);

  return (
    <Dialog
      isShown={isShown}
      hasHeader={false}
      intent="danger"
      width="25vw"
      onCloseComplete={() => resetCallback()}
      onConfirm={() => {
        deleteProjects(
          studioid,
          folderid,
          projects.map(project => project._id),
        );
        resetCallback();
      }}
      confirmLabel="Confirm"
    >
      <Pane>
        <Heading size={600}>
          <b>Confirm remove?</b>
        </Heading>
        <Heading size={500} marginTop="1rem">
          Note:
        </Heading>
        <Paragraph>
          {`
            This action only removes the projects from the studio. 
            The projects are not actually deleted. 
            You can still find them under MyStuff page.
          `}
        </Paragraph>
        <Heading size={400} marginTop="1rem">
          Projects to be removed:
        </Heading>
        <UnorderedList>
          {projects.map(project => (
            <ListItem>{project.title}</ListItem>
          ))}
        </UnorderedList>
      </Pane>
    </Dialog>
  );
}

StudioDeleteProjectsDialog.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteProjects: (studioid, folderid, projectids) =>
      dispatch(deleteProjects(studioid, folderid, projectids)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioDeleteProjectsDialog);
