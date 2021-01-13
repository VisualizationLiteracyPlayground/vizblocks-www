/**
 *
 * TutorialPieChart
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialPieChart() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Pie Chart</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a pie chart, you need to read the key (e.g category) and its corresponding value.`}
        <br />
        {`The values are shown in a pie with different colors.`}
      </Paragraph>
      <iframe
        title="Building a Pie Chart"
        src="https://player.vimeo.com/video/404048065"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialPieChart.propTypes = {};

export default memo(TutorialPieChart);
