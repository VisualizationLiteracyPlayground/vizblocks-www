/**
 *
 * TutorialBarChart
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialBarChart() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Bar Chart</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a bar chart, you need to read the key (e.g category) and its 
        corresponding value before plotting the x/y axis.`}
        <br />
        {`The values are shown along the x/y axis.`}
      </Paragraph>
      <iframe
        title="Building a Bar Chart"
        src="https://player.vimeo.com/video/404047652"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialBarChart.propTypes = {};

export default memo(TutorialBarChart);
