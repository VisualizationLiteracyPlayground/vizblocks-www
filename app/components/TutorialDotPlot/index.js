/**
 *
 * TutorialDotPlot
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialDotPlot() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Dot Plot</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a dot plot, you need to read the key and the value (corresponds to the number of dots to display) 
        before plotting the x-axis.`}
        <br />
        {`The values are shown along the x-axis.`}
      </Paragraph>
      <iframe
        title="Building a Dot Plot"
        src="https://player.vimeo.com/video/404047707"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialDotPlot.propTypes = {};

export default memo(TutorialDotPlot);
