/**
 *
 * TutorialLineChart
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialLineChart() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Line Chart</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a line chart, you need to read the x/y values before plotting the x/y axis.`}
        <br />
        {`The values are shown along the x/y axis.`}
      </Paragraph>
      <iframe
        title="Building a Line Chart"
        src="https://player.vimeo.com/video/404047886"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialLineChart.propTypes = {};

export default memo(TutorialLineChart);
