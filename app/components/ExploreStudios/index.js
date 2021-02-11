/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * ExploreStudios
 *
 */

import React, { memo, useState, useEffect } from 'react';
import {
  Badge,
  Button,
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  Heading,
  IconButton,
  Menu,
  Pane,
  Popover,
  Position,
  SearchInput,
  Strong,
  SortIcon,
} from 'evergreen-ui';

import ColorPallete from '../../colorPallete';
import StudioCard from '../StudioCard';
import EmptyDataPlaceholder from '../EmptyDataPlaceholder';

const tagList = ['all', 'friends'];
const SORTING_ENUMS = {
  MODIFIED_DESC: 'modified-desc',
  MODIFIED_ASC: 'modified-asc',
  TITLE_ASC: 'title-asc',
  TITLE_DSC: 'title-dsc',
};

function getSortingDisplayString(sortingEnum) {
  switch (sortingEnum) {
    case 'modified-desc':
      return 'Updated Recently';
    case 'modified-asc':
      return 'Least Recently Updated';
    case 'title-asc':
      return 'Titles Alphabetically';
    case 'title-dsc':
      return 'Titles Alphabetically Desc';
    default:
      return 'Default';
  }
}

function ExploreStudios({ studios, setQueryPacket, pageLimit, user }) {
  const [queryString, setQueryString] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedSort, setSelectedSort] = useState('');

  function getUserid() {
    return user ? user.data.id : 0;
  }

  function getPageFooter() {
    if (studios) {
      return `${studios.page} / ${studios.totalPages}`;
    }
    return '1 / 1';
  }

  function isBadgeInteractive(tag) {
    if (tag === 'friends') {
      return !!user;
    }
    return true;
  }

  function submitQueryWithCurrentState() {
    setQueryPacket({
      offset: 0,
      limit: pageLimit,
      tag: selectedTag,
      sort: selectedSort,
      queryString,
      userid: getUserid(),
    });
  }

  useEffect(() => {
    // Need to reload documents after transitioning
    submitQueryWithCurrentState();
  }, []);

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
              placeholder="Search studios..."
              value={queryString}
              onChange={e => setQueryString(e.target.value)}
              flex={1}
              width="100%"
              marginRight="1rem"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  submitQueryWithCurrentState();
                }
              }}
              onBlur={() => submitQueryWithCurrentState()}
            />
            <Popover
              position={Position.LEFT}
              content={
                <Menu>
                  <Menu.Group>
                    {Object.values(SORTING_ENUMS).map(sortingStrategy => (
                      <Menu.Item
                        key={sortingStrategy}
                        onSelect={() => {
                          setQueryPacket({
                            offset: 0,
                            limit: pageLimit,
                            tag: selectedTag,
                            sort: sortingStrategy,
                            queryString,
                            userid: getUserid(),
                          });
                          setSelectedSort(sortingStrategy);
                        }}
                      >
                        {getSortingDisplayString(sortingStrategy)}
                      </Menu.Item>
                    ))}
                  </Menu.Group>
                  <Menu.Divider />
                  <Menu.Group>
                    <Menu.Item
                      key="default"
                      onSelect={() => {
                        setQueryPacket({
                          offset: 0,
                          limit: pageLimit,
                          tag: selectedTag,
                          sort: '',
                          queryString,
                          userid: getUserid(),
                        });
                        setSelectedSort('');
                      }}
                    >
                      {getSortingDisplayString('')}
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <Button
                iconBefore={SortIcon}
                intent="success"
                appearance="primary"
              >
                Sort
              </Button>
            </Popover>
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
                isInteractive={isBadgeInteractive(tag)}
                isSolid={tag === selectedTag}
                marginRight="0.5rem"
                onClick={() => {
                  if (isBadgeInteractive(tag)) {
                    setQueryPacket({
                      offset: 0,
                      limit: pageLimit,
                      tag,
                      sort: selectedSort,
                      queryString,
                      userid: getUserid(),
                    });
                    setSelectedTag(tag);
                  }
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
            <Strong
              size={300}
              color="grey"
              marginRight="1rem"
              alignSelf="center"
            >
              Sort Studios by:
            </Strong>
            <Badge key={selectedSort} color="green" isSolid marginRight="1rem">
              {getSortingDisplayString(selectedSort)}
            </Badge>
          </Pane>
        </Pane>
        <Pane
          aria-label="Bottom section"
          display="flex"
          height="100%"
          background={ColorPallete.backgroundColor}
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
              disabled={studios ? studios.page === 1 : true}
              onClick={() => {
                let offsetBase = studios.page - 2;
                if (offsetBase < 0) {
                  offsetBase = 0;
                }
                setQueryPacket({
                  offset: offsetBase * pageLimit,
                  limit: pageLimit,
                  tag: selectedTag,
                  sort: selectedSort,
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
            <Pane display="flex" flexWrap="wrap" width="84rem">
              {studios &&
                studios.docs.map(studio => (
                  <Pane
                    key={studio._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginLeft="1rem"
                    marginRight="1rem"
                    marginTop="1rem"
                  >
                    <StudioCard studio={studio} />
                  </Pane>
                ))}
            </Pane>
            {studios && studios.docs.length === 0 && (
              <Pane display="flex" alignSelf="center">
                <EmptyDataPlaceholder title="No studios found" />
              </Pane>
            )}
            <Pane
              aria-label="Page footer"
              display="flex"
              flexDirection="column"
              marginTop="1.5rem"
            >
              <Pane aria-label="page-number" display="flex">
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
              <Pane aria-label="total-docs" display="flex" marginTop="0.2rem">
                <Pane display="flex" flexGrow={1} />
                <Heading
                  size={300}
                  color="gray"
                  alignSelf="center"
                  justifySelf="center"
                  borderTopStyle="solid"
                  borderTopWidth="0.1rem"
                  borderColor={ColorPallete.lightGrey}
                >
                  {`Total Studios: ${studios ? studios.totalDocs : 0}`}
                </Heading>
                <Pane display="flex" flexGrow={1} />
              </Pane>
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
              disabled={studios ? studios.page >= studios.totalPages : true}
              onClick={() =>
                setQueryPacket({
                  offset: studios.page * pageLimit,
                  limit: pageLimit,
                  tag: selectedTag,
                  sort: selectedSort,
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

ExploreStudios.propTypes = {};

export default memo(ExploreStudios);
