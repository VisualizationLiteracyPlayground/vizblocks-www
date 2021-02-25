/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * CuratorListView
 *
 */

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Avatar,
  CaretDownIcon,
  CaretUpIcon,
  EditIcon,
  IconButton,
  Pane,
  Table,
  Text,
} from 'evergreen-ui';

import { USER_ROLE } from 'containers/StudioPage/constants';
import { updateCuratorRole } from 'containers/StudioPage/actions';

import StudioCuratorRoleDialog from '../StudioCuratorRoleDialog';
import history from '../../utils/history';
import { getAvaterImage } from '../../utils/util';

function CuratorListView({
  userRole,
  user,
  curators,
  studioid,
  updateCuratorRole,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [sortManagerFirst, setSortManagerFirst] = useState(true);
  const [currentCurator, setCurrentCurator] = useState(null);
  const [showCuratorRoleDialog, setShowCuratorRoleDialog] = useState(false);

  return (
    <Pane>
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
                onSelect={() =>
                  history.push(`/user-profile/${curator.user._id}`)
                }
              >
                <Table.Cell flexGrow={2}>
                  <Avatar
                    isSolid
                    src={getAvaterImage(curator.user)}
                    name={curator.user.username}
                    size={24}
                  />
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
                      setCurrentCurator(curator);
                      setShowCuratorRoleDialog(true);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {currentCurator && (
        <StudioCuratorRoleDialog
          isShown={showCuratorRoleDialog}
          user={user}
          curator={currentCurator}
          curatorList={curators}
          updateCallback={curatorRole =>
            updateCuratorRole(studioid, currentCurator.user._id, curatorRole)
          }
          setShown={setShowCuratorRoleDialog}
        />
      )}
    </Pane>
  );
}

CuratorListView.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateCuratorRole: (studioid, curatorid, curatorRole) =>
      dispatch(updateCuratorRole(studioid, curatorid, curatorRole)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CuratorListView);
