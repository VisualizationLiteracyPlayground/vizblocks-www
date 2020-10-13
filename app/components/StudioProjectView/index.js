/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * StudioProjectView
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Card,
  CaretRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentIcon,
  DocumentOpenIcon,
  FolderCloseIcon,
  FolderOpenIcon,
  Strong,
  Pane,
  PlusIcon,
} from 'evergreen-ui';

import { USER_ROLE } from 'containers/StudioPage/constants';
import { makeSelectSubfolderProjects } from 'containers/StudioPage/selectors';
import {
  createSubfolder,
  loadSubfolderProjects,
} from 'containers/StudioPage/actions';
import ProjectCard from 'components/ProjectCard';
import StudioNewFolderDialog from 'components/StudioNewFolderDialog';
import StudioAddProjectSheet from 'components/StudioAddProjectSheet/Loadable';

import ColorPallete from '../../colorPallete';

function StudioProjectView({
  userRole,
  user,
  studioid,
  studio,
  setError,
  createSubfolder,
  subFolderProjects,
  loadSubfolderProjects,
}) {
  const permissions = studio.settings;
  const { rootFolder, subFolders } = studio;
  const baseFolderString = 'Main folder';

  const [isAtRoot, setIsAtRoot] = useState(true);
  const [currentFolder, setCurrentFolder] = useState({
    name: baseFolderString,
    id: 0,
    projects: [],
  });
  const [projectList, setProjectList] = useState(rootFolder);
  const [folderList, setFolderList] = useState(subFolders);
  const [expandedFolderList, setExpandedFolderList] = useState(true);
  const [expandedProjectList, setExpandedProjectList] = useState(true);
  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAddProjectSheet, setShowAddProjectSheet] = useState(false);

  function switchFolder(folder) {
    setIsAtRoot(false);
    setCurrentFolder({
      name: folder.name,
      id: folder._id,
      projects: folder.projects,
    });
    loadSubfolderProjects(folder.projects);
  }

  function switchToMain() {
    setIsAtRoot(true);
    setCurrentFolder({
      name: baseFolderString,
      id: 0,
      projects: rootFolder.map(project => project._id),
    });
    setProjectList(rootFolder);
  }

  useEffect(() => {
    setFolderList(subFolders);
    if (isAtRoot) {
      setProjectList(rootFolder);
    } else {
      const updatedFolder = subFolders.find(
        folder => folder._id === currentFolder.id,
      );
      if (updatedFolder) {
        switchFolder(updatedFolder);
      }
    }
  }, [studio]);
  useEffect(() => {
    if (!isAtRoot) {
      setProjectList(subFolderProjects);
    }
  }, [subFolderProjects]);
  return (
    <Pane height="53vh" overflowY="auto">
      <Pane display="flex" aria-label="Folder hierarchy">
        <Button appearance="minimal" height={40} onClick={() => switchToMain()}>
          {baseFolderString}
        </Button>
        {!isAtRoot && (
          <Button appearance="minimal" height={40} iconBefore={CaretRightIcon}>
            {currentFolder.name}
          </Button>
        )}
        <Pane flexGrow={2} />
        {isAtRoot && (
          <Button
            marginY={8}
            marginRight="0.5rem"
            iconBefore={PlusIcon}
            disabled={
              !(
                userRole === USER_ROLE.MANAGER ||
                (userRole === USER_ROLE.MEMBER && permissions.member.addFolder)
              )
            }
            onClick={() => setShowCreateDialog(true)}
          >
            New Folder
          </Button>
        )}
        <Button
          marginY={8}
          marginRight="0.5rem"
          iconBefore={PlusIcon}
          disabled={
            !(
              userRole === USER_ROLE.MANAGER ||
              (userRole === USER_ROLE.MEMBER && permissions.member.addProject)
            )
          }
          onClick={() => setShowAddProjectSheet(true)}
        >
          Add Projects
        </Button>
      </Pane>
      <Pane
        width="25%"
        borderColor={ColorPallete.backgroundColor}
        borderWidth="0.2rem"
        borderTopStyle="solid"
        aria-label="Horizontal divider"
      />
      {isAtRoot && (
        <Pane aria-label="Folder view">
          <Button
            iconBefore={expandedFolderList ? FolderOpenIcon : FolderCloseIcon}
            appearance="minimal"
            marginTop="1rem"
            marginLeft="1rem"
            iconAfter={expandedFolderList ? ChevronUpIcon : ChevronDownIcon}
            onClick={() => setExpandedFolderList(!expandedFolderList)}
          >
            {`Folders (${folderList.length})`}
          </Button>
          {expandedFolderList && (
            <Pane
              display="flex"
              flexWrap="wrap"
              marginLeft="2.5rem"
              aria-label="List of folders"
            >
              {folderList.map(folder => (
                <Card
                  key={folder._id}
                  paddingX="1rem"
                  paddingY="0.5rem"
                  display="flex"
                  elevation={1}
                  marginRight="2rem"
                  marginTop="1rem"
                  onClick={() => switchFolder(folder)}
                >
                  <FolderCloseIcon
                    color={ColorPallete.grey}
                    size={12}
                    marginTop="0.1rem"
                  />
                  <Strong
                    size={300}
                    color={ColorPallete.grey}
                    marginLeft="0.5rem"
                  >
                    {folder.name}
                  </Strong>
                </Card>
              ))}
            </Pane>
          )}
        </Pane>
      )}
      <Pane aria-label="Project view">
        <Button
          iconBefore={expandedProjectList ? DocumentOpenIcon : DocumentIcon}
          appearance="minimal"
          marginTop="1rem"
          marginLeft="1rem"
          iconAfter={expandedProjectList ? ChevronUpIcon : ChevronDownIcon}
          onClick={() => setExpandedProjectList(!expandedProjectList)}
        >
          {`Projects (${projectList.length})`}
        </Button>
        {expandedProjectList && (
          <Pane
            display="flex"
            flexWrap="wrap"
            marginLeft="2.5rem"
            aria-label="List of projects"
          >
            {projectList.map(project => (
              <ProjectCard project={project} key={project._id} />
            ))}
          </Pane>
        )}
      </Pane>
      <StudioNewFolderDialog
        folderList={folderList}
        isShown={showCreateDialog}
        setShown={setShowCreateDialog}
        updateCallback={folderName => createSubfolder(studioid, folderName)}
        validationErrorCallback={error => setError(error)}
      />
      <StudioAddProjectSheet
        user={user}
        isShown={showAddProjectSheet}
        setShown={setShowAddProjectSheet}
        folder={currentFolder}
        studioid={studioid}
      />
    </Pane>
  );
}

StudioProjectView.propTypes = {};

const mapStateToProps = createStructuredSelector({
  subFolderProjects: makeSelectSubfolderProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createSubfolder: (studioid, folderName) =>
      dispatch(createSubfolder(studioid, folderName)),
    loadSubfolderProjects: projectids =>
      dispatch(loadSubfolderProjects(projectids)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioProjectView);
