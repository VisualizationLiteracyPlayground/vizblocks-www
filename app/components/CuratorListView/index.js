/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * CuratorListView
 *
 */

import React, { memo, useState } from 'react';
import {
  Avatar,
  CaretDownIcon,
  CaretUpIcon,
  EditIcon,
  IconButton,
  Table,
  Text,
} from 'evergreen-ui';

import { USER_ROLE } from 'containers/StudioPage/constants';

function CuratorListView({ userRole, curators }) {
  const [searchValue, setSearchValue] = useState('');
  const [sortManagerFirst, setSortManagerFirst] = useState(true);

  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell
          flexGrow={2}
          onChange={value => setSearchValue(value)}
          placeholder="Search username"
        />
        <Table.HeaderCell>
          <Text size={300}>
            <b>Role</b>
          </Text>
          <IconButton
            icon={sortManagerFirst ? CaretDownIcon : CaretUpIcon}
            appearance="minimal"
            onClick={() => setSortManagerFirst(!sortManagerFirst)}
          />
        </Table.HeaderCell>
      </Table.Head>
      <Table.Body height="50vh">
        {curators
          .filter(curator => curator.user.username.includes(searchValue))
          .sort((curatorA, curatorB) => {
            const roleCompare = sortManagerFirst
              ? curatorA.role.localeCompare(curatorB.role)
              : curatorB.role.localeCompare(curatorA.role);
            return roleCompare === 0
              ? curatorA.user.username.localeCompare(curatorB.user.username)
              : roleCompare;
          })
          .map(curator => (
            <Table.Row
              key={curator.user._id}
              height="auto"
              paddingY={12}
              isSelectable
              onSelect={() => console.log(curator.user.username)}
            >
              <Table.Cell flexGrow={2}>
                <Avatar isSolid name={curator.user.username} size={24} />
                <Text size={300} marginLeft="1rem">
                  {curator.user.username}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size={300}>{curator.role}</Text>
                <IconButton
                  icon={EditIcon}
                  display={userRole === USER_ROLE.MANAGER ? 'block' : 'none'}
                  appearance="minimal"
                  onClickCapture={event => {
                    event.stopPropagation();
                    console.log('clicked edit icon in table');
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

CuratorListView.propTypes = {};

export default memo(CuratorListView);
