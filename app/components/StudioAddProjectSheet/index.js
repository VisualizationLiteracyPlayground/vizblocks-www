/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * StudioAddProjectSheet
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Card,
  Pane,
  Heading,
  SideSheet,
  Spinner,
  Table,
  TickCircleIcon,
} from 'evergreen-ui';

import { makeSelectUserProjects } from 'containers/StudioPage/selectors';
import { addProjects, loadUserProjects } from 'containers/StudioPage/actions';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-project-thumbnail.png';

import ColorPallete from '../../colorPallete';

function StudioAddProjectSheet({
  user,
  isShown,
  setShown,
  folder,
  studioid,
  projects,
  addProjects,
  loadUserProjects,
}) {
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState([]);

  function initAndResetSelected() {
    setSelected(selected.fill(false, 0, projects.length));
  }

  function countSelected() {
    return selected.filter(val => val).length;
  }

  function projectIdsPaylod() {
    const projectsToAdd = [];
    projects.forEach((project, index) => {
      if (selected[index]) {
        projectsToAdd.push(project._id);
      }
    });
    return projectsToAdd;
  }

  useEffect(() => {
    if (user && !loaded) {
      loadUserProjects(user.data.id, folder.projects);
    }
  }, []);
  useEffect(() => {
    if (user) {
      loadUserProjects(user.data.id, folder.projects);
    }
  }, [folder]);
  useEffect(() => {
    setLoaded(true);
    initAndResetSelected();
  }, [projects]);

  return (
    <SideSheet
      isShown={isShown}
      onCloseComplete={() => {
        setShown(false);
        initAndResetSelected();
      }}
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane padding={16}>
          <Heading size={600}>Add Your Projects</Heading>
          <Heading size={400} color="gray" marginTop="0.5rem">
            {`Into Folder: ${folder.name}`}
          </Heading>
        </Pane>
      </Pane>
      {!loaded && (
        <Pane
          flex="1"
          background={ColorPallete.backgroundColor}
          padding={16}
          aria-label="Loading view"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Pane>
      )}
      {loaded && projects.length === 0 && (
        <Pane
          flex="1"
          background={ColorPallete.backgroundColor}
          padding={16}
          aria-label="User no project view"
        >
          <Card
            backgroundColor="white"
            elevation={1}
            height="65vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading color="gray">You have not authored any projects.</Heading>
            <Heading color="gray">
              Go to My Stuff page and start creating!
            </Heading>
          </Card>
        </Pane>
      )}
      {loaded && projects.length > 0 && (
        <Pane
          flex="1"
          background={ColorPallete.backgroundColor}
          padding={16}
          aria-label="User projects view"
        >
          <Pane
            marginTop="0.5rem"
            backgroundColor="white"
            elevation={1}
            height="65vh"
            width="100%"
            display="flex"
          >
            <Table display="flex" width="100%">
              <Table.Body>
                {projects
                  .sort((a, b) => {
                    const aCreated = Date.parse(a.history.created);
                    const bCreated = Date.parse(b.history.created);
                    return sortDateDesc(aCreated, bCreated);
                  })
                  .map((project, index) => (
                    <Table.Row
                      key={project._id}
                      height="auto"
                      paddingY={12}
                      isSelectable
                      isSelected={selected[index]}
                      onSelect={() => {
                        const currSelected = [...selected];
                        currSelected[index] = true;
                        setSelected(currSelected);
                      }}
                      onDeselect={() => {
                        const currSelected = [...selected];
                        currSelected[index] = false;
                        setSelected(currSelected);
                      }}
                    >
                      <Table.Cell>
                        <img
                          style={{
                            width: 'auto',
                            height: '8rem',
                            marginRight: '3rem',
                            borderStyle: 'solid',
                            borderWidth: '0.2rem',
                            borderColor: ColorPallete.backgroundColor,
                          }}
                          src={DefaultThumbnail}
                          alt="Vizblock default project thumbnail"
                        />
                        <Pane
                          flex={1}
                          height="8rem"
                          display="flex"
                          flexDirection="column"
                          alignItems="left"
                          padding="0.5rem"
                        >
                          <Pane
                            display="flex"
                            flexDirection="column"
                            flexGrow={1}
                          >
                            <Heading size={600}>
                              {project.title ? project.title : 'Untitled'}
                            </Heading>
                            <Heading
                              size={300}
                              marginTop="0.2rem"
                              color="dark-gray"
                            >
                              Last modified:{' '}
                              {prettyDateFormat(project.history.modified)}
                            </Heading>
                          </Pane>
                        </Pane>
                        {selected[index] && (
                          <TickCircleIcon
                            marginRight="1rem"
                            size={24}
                            color="success"
                          />
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Pane>
        </Pane>
      )}
      {countSelected() > 0 && (
        <Pane
          height="18vh"
          zIndex={1}
          flexShrink={0}
          elevation={0}
          backgroundColor="white"
        >
          <Pane padding={16} diplay="flex" flexDirection="column">
            <Heading size={400}>
              {`Projects selected: ${countSelected()}`}
            </Heading>
            <Button
              appearance="primary"
              intent="success"
              marginTop="1rem"
              onClick={() => {
                const projectsToAdd = projectIdsPaylod();
                addProjects(studioid, folder.id, projectsToAdd);
                setShown(false);
                initAndResetSelected();
              }}
            >
              Confirm add
            </Button>
          </Pane>
        </Pane>
      )}
    </SideSheet>
  );
}

StudioAddProjectSheet.propTypes = {};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectUserProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addProjects: (studioid, folderid, projects) =>
      dispatch(addProjects(studioid, folderid, projects)),
    loadUserProjects: (userid, filterList) =>
      dispatch(loadUserProjects(userid, filterList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioAddProjectSheet);
