/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * StudioDeleteFoldersDialog
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

import { deleteSubfolders } from 'containers/StudioPage/actions';

function StudioDeleteFoldersDialog({
  isShown,
  resetCallback,
  constructPayload,
  studioid,
  deleteSubfolders,
}) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    if (isShown) {
      setFolders(constructPayload());
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
        // eslint-disable-next-line no-underscore-dangle
        deleteSubfolders(studioid, folders.map(folder => folder._id));
        resetCallback();
      }}
      confirmLabel="Confirm"
    >
      <Pane>
        <Heading size={600}>
          <b>Confirm delete?</b>
        </Heading>
        <Heading size={500} marginTop="0.5rem">
          Beware that this action cannot be undone!
        </Heading>
        <Heading size={400} marginTop="1rem">
          Note:
        </Heading>
        <Paragraph>
          {"Projects within folders will still exist in author's MyStuff page."}
        </Paragraph>
        <Heading size={400} marginTop="1rem">
          Folders to be deleted:
        </Heading>
        <UnorderedList>
          {folders.map(folder => (
            <ListItem>
              {`${folder.name} | Projects: ${folder.projects.length}`}
            </ListItem>
          ))}
        </UnorderedList>
      </Pane>
    </Dialog>
  );
}

StudioDeleteFoldersDialog.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteSubfolders: (studioid, folderids) =>
      dispatch(deleteSubfolders(studioid, folderids)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioDeleteFoldersDialog);
