/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * ExploreUsers
 *
 */

import React, { memo, useState } from 'react';
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
import UserCard from '../UserCard';

const tagList = ['all', 'friends'];
const SORTING_ENUMS = {
  JOINED_DESC: 'joined-desc',
  JOINED_ASC: 'joined-asc',
  USERNAME_ASC: 'username-asc',
  USERNAME_DSC: 'username-dsc',
};

function getSortingDisplayString(sortingEnum) {
  switch (sortingEnum) {
    case 'joined-desc':
      return 'Joined Recently';
    case 'joined-asc':
      return 'Joined Least Recently';
    case 'username-asc':
      return 'Username Alphabetically';
    case 'username-dsc':
      return 'Username Alphabetically Desc';
    default:
      return 'Default';
  }
}

function ExploreUsers({ users, setQueryPacket, pageLimit, user }) {
  const [queryString, setQueryString] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedSort, setSelectedSort] = useState('');

  function getUserid() {
    return user ? user.data.id : 0;
  }

  function getPageFooter() {
    if (users) {
      return `${users.page} / ${users.totalPages}`;
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
              placeholder="Search users..."
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
              Sort Users by:
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
              disabled={users ? users.page === 1 : true}
              onClick={() => {
                let offsetBase = users.page - 2;
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
              {users &&
                users.docs.map(userDoc => (
                  <Pane
                    key={userDoc._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginLeft="1rem"
                    marginRight="1rem"
                    marginTop="1rem"
                  >
                    <UserCard user={userDoc} />
                  </Pane>
                ))}
            </Pane>
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
                  {`Total Users: ${users ? users.totalDocs : 0}`}
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
              disabled={users ? users.page >= users.totalPages : true}
              onClick={() =>
                setQueryPacket({
                  offset: users.page * pageLimit,
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

ExploreUsers.propTypes = {};

export default memo(ExploreUsers);
