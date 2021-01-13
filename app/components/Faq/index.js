/**
 *
 * Faq
 *
 */

import React, { memo } from 'react';
import { Heading, Pane, Paragraph, Strong } from 'evergreen-ui';

function Faq() {
  return (
    <Pane display="flex" flexDirection="column" overflowY="auto" height="70vh">
      <Heading size={800}>FAQ</Heading>
      <Pane aria-label="question one" marginTop="1.5rem">
        <Strong size={500}>
          1. My visualization is in a mess, how do I deal with it?
        </Strong>
        <Paragraph marginTop="0.5rem">
          {
            'Use the “clear” block to clear the current screen of any leftover ink.'
          }
        </Paragraph>
      </Pane>
      <Pane aria-label="question two" marginTop="1rem">
        <Strong size={500}>
          {
            '2. The visualization appears to be different from what I’ve expected, how do I fix it?'
          }
        </Strong>
        <Paragraph marginTop="0.5rem">
          {`You might be using a combination of blocks that are not suitable for each other. 
            Watch the videos of the respective visualization you are interested in creating for inspiration.`}
        </Paragraph>
      </Pane>
    </Pane>
  );
}

Faq.propTypes = {};

export default memo(Faq);
