/* eslint-disable react/prop-types */
/**
 *
 * EmptyDataPlaceholder
 *
 */

import React, { memo } from 'react';
import { Pane, Strong } from 'evergreen-ui';

import EmptyStateIllustration from 'images/empty-state.png';

function EmptyDataPlaceholder({ title, subtitle }) {
  return (
    <Pane display="flex" flexDirection="column">
      <img
        style={{
          width: 'auto',
          height: '25vh',
        }}
        src={EmptyStateIllustration}
        alt="no data found illustration"
      />
      {title && (
        <Strong size={500} color="grey" marginTop="0.5rem" alignSelf="center">
          {title}
        </Strong>
      )}
      {subtitle && (
        <Strong size={300} color="grey" marginTop="0.2rem" alignSelf="center">
          {subtitle}
        </Strong>
      )}
    </Pane>
  );
}

EmptyDataPlaceholder.propTypes = {};

export default memo(EmptyDataPlaceholder);
