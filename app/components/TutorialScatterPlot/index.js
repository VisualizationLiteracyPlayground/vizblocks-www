/**
 *
 * TutorialScatterPlot
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialScatterPlot() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Scatter Plot</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a scatter plot, you need to read the x/y values before plotting the x/y axis.`}
        <br />
        {`The values are shown along the x/y axis.`}
        <br />
        {`You can also read in multiple values programmatically using a loop (refer to the video to see how this is done).`}
      </Paragraph>
      <iframe
        title="Building a Scatter Plot"
        src="https://player.vimeo.com/video/404048108"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialScatterPlot.propTypes = {};

export default memo(TutorialScatterPlot);
