/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/**
 *
 * ExploreProjects
 *
 */

import React, { memo, useState } from 'react';
import {
  Badge,
  Button,
  Checkbox,
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  Heading,
  IconButton,
  Pane,
  Popover,
  Position,
  SearchInput,
  Strong,
  TagIcon,
} from 'evergreen-ui';

import {
  VISUALIZATION_TYPE,
  getVisualizationTypeTitle,
} from '../../utils/vlatUtil';
import ColorPallete from '../../colorPallete';
import ProjectCard from '../ProjectCard';

const tagList = ['all', 'friends'];
const visualizationTagList = Object.values(VISUALIZATION_TYPE);
const IMPLEMENTED_PROJECT_TAGGING = false;

function ExploreProjects({ projects, setQueryPacket, pageLimit, user }) {
  const [queryString, setQueryString] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedVisualizationTags, setSelectedVisualizationTags] = useState(
    [],
  );

  function getUserid() {
    return user ? user.data.id : 0;
  }

  function getPageFooter() {
    if (projects) {
      return `${projects.page} / ${projects.totalPages}`;
    }
    return '1 / 1';
  }

  return (
    <Pane display="flex" height="88vh" flexDirection="column">
      <Pane
        display="flex"
        flexDirection="column"
        flex={1}
        marginX="2rem"
        marginY="1.5rem"
        elevation={1}
      >
        <Pane
          aria-label="Top section"
          display="flex"
          flexDirection="column"
          background={ColorPallete.backgroundColor}
        >
          <Pane
            aria-label="Search Header"
            display="flex"
            width="100%"
            alignItems="center"
            paddingX="1rem"
            marginTop="1rem"
          >
            <SearchInput
              placeholder="Search projects..."
              value={queryString}
              onChange={e => setQueryString(e.target.value)}
              flex={1}
              width="100%"
              marginRight="1rem"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  setQueryPacket({
                    offset: 0,
                    limit: pageLimit,
                    selectedTag,
                    visualizationTag: selectedVisualizationTags,
                    queryString,
                    userid: getUserid(),
                  });
                }
              }}
              onBlur={() =>
                setQueryPacket({
                  offset: 0,
                  limit: pageLimit,
                  selectedTag,
                  visualizationTag: selectedVisualizationTags,
                  queryString,
                  userid: getUserid(),
                })
              }
            />
            {IMPLEMENTED_PROJECT_TAGGING && (
              <Popover
                position={Position.LEFT}
                content={
                  <Pane
                    display="flex"
                    flexDirection="column"
                    paddingLeft="1.5rem"
                  >
                    {visualizationTagList.map(tag => (
                      <Checkbox
                        key={tag}
                        label={getVisualizationTypeTitle(tag)}
                        checked={selectedVisualizationTags.find(
                          selectedTag => selectedTag === tag,
                        )}
                        onChange={e => {
                          if (e.target.checked) {
                            const updatedTagList = Array.from(
                              selectedVisualizationTags,
                            );
                            updatedTagList.push(tag);
                            setSelectedVisualizationTags(updatedTagList);
                          } else {
                            let updatedTagList = Array.from(
                              selectedVisualizationTags,
                            );
                            updatedTagList = updatedTagList.filter(
                              selectedTag => selectedTag !== tag,
                            );
                            setSelectedVisualizationTags(updatedTagList);
                          }
                        }}
                      />
                    ))}
                  </Pane>
                }
                onCloseComplete={() =>
                  setQueryPacket({
                    offset: 0,
                    limit: pageLimit,
                    selectedTag,
                    visualizationTag: selectedVisualizationTags,
                    queryString,
                    userid: getUserid(),
                  })
                }
              >
                <Button
                  iconBefore={TagIcon}
                  intent="success"
                  appearance="primary"
                >
                  Tags
                </Button>
              </Popover>
            )}
          </Pane>
          <Pane
            aria-label="Badges"
            display="flex"
            width="100%"
            alignItems="center"
            alignContent="center"
            marginY="0.5rem"
            marginX="1rem"
          >
            {tagList.map(tag => (
              <Badge
                key={tag}
                color={tag === selectedTag ? 'green' : 'neutral'}
                isInteractive={tag === 'friends' ? user : true}
                isSolid={tag === selectedTag}
                marginRight="0.5rem"
                onClick={() => {
                  setQueryPacket({
                    offset: 0,
                    limit: pageLimit,
                    tag,
                    visualizationTag: selectedVisualizationTags,
                    queryString,
                    userid: getUserid(),
                  });
                  setSelectedTag(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
            <Pane
              height="100%"
              borderWidth="0.15rem"
              borderLeftStyle="solid"
              borderColor={ColorPallete.lightGrey}
              marginRight="0.5rem"
              aria-label="Divider between tags and visualization tags"
            />
            {IMPLEMENTED_PROJECT_TAGGING && (
              <Pane display="flex">
                <Strong
                  size={300}
                  color="grey"
                  marginRight="1rem"
                  alignSelf="center"
                >
                  Visualization Types:
                </Strong>
                {selectedVisualizationTags.map(tag => (
                  <Badge key={tag} color="green" isSolid marginRight="1rem">
                    {tag}
                  </Badge>
                ))}
              </Pane>
            )}
          </Pane>
        </Pane>
        <Pane
          aria-label="Bottom section"
          display="flex"
          height="100%"
          background="white"
        >
          <Pane
            display="flex"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              icon={CircleArrowLeftIcon}
              appearance="minimal"
              intent="success"
              height={40}
              disabled={projects ? projects.page === 1 : true}
              onClick={() => {
                let offsetBase = projects.page - 2;
                if (offsetBase < 0) {
                  offsetBase = 0;
                }
                setQueryPacket({
                  offset: offsetBase * pageLimit,
                  limit: pageLimit,
                  tag: selectedTag,
                  visualizationTag: selectedVisualizationTags,
                  queryString,
                  userid: getUserid(),
                });
              }}
            />
          </Pane>
          <Pane
            display="flex"
            flexDirection="column"
            aria-label="List of projects"
          >
            <Pane flex={1} />
            <Pane display="flex" flexWrap="wrap" width="90vw">
              {projects &&
                projects.docs.map(project => (
                  <Pane
                    key={project._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginLeft="1rem"
                    marginRight="1rem"
                    marginTop="1rem"
                  >
                    <ProjectCard project={project} />
                  </Pane>
                ))}
            </Pane>
            <Pane aria-label="Page footer" display="flex" marginTop="1.5rem">
              <Pane display="flex" flexGrow={1} />
              <Heading
                size={400}
                color="gray"
                alignSelf="center"
                justifySelf="center"
              >
                {getPageFooter()}
              </Heading>
              <Pane display="flex" flexGrow={1} />
            </Pane>
            <Pane flex={1} />
          </Pane>
          <Pane
            display="flex"
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              icon={CircleArrowRightIcon}
              alignSelf="center"
              appearance="minimal"
              intent="success"
              height={40}
              disabled={projects ? projects.page >= projects.totalPages : true}
              onClick={() =>
                setQueryPacket({
                  offset: projects.page * pageLimit,
                  limit: pageLimit,
                  tag: selectedTag,
                  visualizationTag: selectedVisualizationTags,
                  queryString,
                  userid: getUserid(),
                })
              }
            />
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

ExploreProjects.propTypes = {};

export default memo(ExploreProjects);
