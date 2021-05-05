/**
 *
 * TutorialHeatmap
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialHeatmap() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Heatmap</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a heatmap, you need to read the grid values of a 10x5 grid, 
        then choose the image that you have loaded previously (refer to Loading costumes/images) 
        to draw the grid on.`}
      </Paragraph>
      <iframe
        title="Building a Heatmap"
        src="https://player.vimeo.com/video/404047762"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialHeatmap.propTypes = {};

export default memo(TutorialHeatmap);
