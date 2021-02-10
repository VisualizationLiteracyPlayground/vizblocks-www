/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * StudioCard
 *
 */

import React, { memo } from 'react';
import { Card, Heading, Pane, Text } from 'evergreen-ui';

import DefaultThumbnail from 'images/default-studio-thumbnail.jpg';
import history from 'utils/history';
import { truncateString } from 'utils/stringUtil';

import ColorPallete from '../../colorPallete';

function StudioCard({ studio }) {
  return (
    <Card
      key={studio._id}
      elevation={2}
      height="auto"
      maxWidth="10rem"
      display="flex"
      flexDirection="column"
      background="white"
      onClick={() => {
        history.push({
          pathname: `/studio`,
          state: {
            studioid: studio._id,
          },
        });
      }}
    >
      <img
        style={{
          width: '10rem',
          height: '8rem',
          borderBottomStyle: 'solid',
          borderWidth: '0.2rem',
          borderColor: ColorPallete.backgroundColor,
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
        src={DefaultThumbnail}
        alt="Vizblock default studio thumbnail"
      />
      <Pane display="flex" alignItems="center" padding="0.2rem">
        <Pane
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          marginLeft="0.5rem"
        >
          <Heading size={400} color={ColorPallete.grey} overflow="hidden">
            {truncateString(studio.title, 16)}
          </Heading>
          <Text size={300} color={ColorPallete.grey} overflow="hidden">
            {`Curators: ${studio.curators.length}`}
          </Text>
        </Pane>
      </Pane>
    </Card>
  );
}

StudioCard.propTypes = {};

export default memo(StudioCard);
