/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * StudioListView
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Heading, Pane, Table, Strong } from 'evergreen-ui';

import { makeSelectStudios } from 'containers/MyStuff/selectors';
import EmptyDataPlaceholder from 'components/EmptyDataPlaceholder';
import history from 'utils/history';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-studio-thumbnail.jpg';

import ColorPallete from '../../colorPallete';

function getStudioThumbnail(studio) {
  return studio.image
    ? `data:${studio.image.contentType};base64,${studio.image.data}`
    : DefaultThumbnail;
}

function StudioListView({ studios }) {
  return (
    <Pane height="100%">
      {studios.length === 0 && (
        <Pane
          aria-label="empty-placeholder-illustration"
          display="flex"
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <EmptyDataPlaceholder
            title="No studios found"
            subtitle="Create or join a studio!"
          />
        </Pane>
      )}
      {studios.length > 0 && (
        <Table display="flex" height="62vh">
          <Table.Body>
            {studios
              .sort((a, b) => {
                const aModified = Date.parse(a.history.modified);
                const bModified = Date.parse(b.history.modified);
                return sortDateDesc(aModified, bModified);
              })
              .map(studio => (
                <Table.Row
                  key={studio._id}
                  height="auto"
                  paddingY={12}
                  isSelectable
                  onSelect={() =>
                    history.push({
                      pathname: `/studio`,
                      state: {
                        studioid: studio._id,
                      },
                    })
                  }
                >
                  <Table.Cell>
                    <img
                      style={{
                        width: '10rem',
                        height: '8rem',
                        marginRight: '3rem',
                        borderStyle: 'solid',
                        borderWidth: '0.2rem',
                        borderColor: ColorPallete.backgroundColor,
                        objectFit: 'cover',
                      }}
                      src={getStudioThumbnail(studio)}
                      alt={
                        studio.image
                          ? studio.image.filename
                          : 'Vizblock default studio thumbnail'
                      }
                    />
                    <Pane
                      flex={1}
                      height="8rem"
                      display="flex"
                      flexDirection="column"
                      alignItems="left"
                      padding="0.5rem"
                    >
                      <Pane display="flex" flexDirection="column">
                        <Heading size={600}>{studio.title}</Heading>
                        <Heading
                          size={300}
                          marginTop="0.2rem"
                          color="dark-gray"
                        >
                          Last modified:{' '}
                          {prettyDateFormat(studio.history.modified)}
                        </Heading>
                        <Strong size={300} marginTop="0.5rem" color="gray">
                          {`Curators: ${studio.curatorsCount}`}
                        </Strong>
                      </Pane>
                    </Pane>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )}
    </Pane>
  );
}

StudioListView.propTypes = {};

const mapStateToProps = createStructuredSelector({
  studios: makeSelectStudios(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(StudioListView);
