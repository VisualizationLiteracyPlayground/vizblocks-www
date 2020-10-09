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
import { Heading, Pane, Paragraph, Table, Text } from 'evergreen-ui';

import { makeSelectStudios } from 'containers/MyStuff/selectors';
import history from 'utils/history';
import { sortDateDesc, prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-studio-thumbnail.jpg';

import ColorPallete from '../../colorPallete';

function StudioListView({ studios }) {
  return (
    <Pane>
      {studios.length === 0 && <Paragraph>Start joining studios!</Paragraph>}
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
                      width: 'auto',
                      height: '8rem',
                      marginRight: '3rem',
                      borderStyle: 'solid',
                      borderWidth: '0.2rem',
                      borderColor: ColorPallete.backgroundColor,
                    }}
                    src={DefaultThumbnail}
                    alt="Vizblock default studio thumbnail"
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
                      <Text size={400}>
                        Last modified:{' '}
                        {prettyDateFormat(studio.history.modified)}
                      </Text>
                    </Pane>
                    <Pane display="flex">
                      <Heading size={300} marginTop="0.5rem" color="gray">
                        {`Curators: ${studio.curators.length}`}
                      </Heading>
                    </Pane>
                  </Pane>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
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
