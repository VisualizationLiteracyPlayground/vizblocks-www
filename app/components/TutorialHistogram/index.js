/**
 *
 * TutorialHistogram
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialHistogram() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Histogram</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a histogram, you need to read the key (e.g numerical value) and 
        its corresponding value before plotting the x/y axis.`}
        <br />
        {`The values are shown along the x/y axis.`}
      </Paragraph>
      <iframe
        title="Building a Histogram"
        src="https://player.vimeo.com/video/404047829"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialHistogram.propTypes = {};

export default memo(TutorialHistogram);
