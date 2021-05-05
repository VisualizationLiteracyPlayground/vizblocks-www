/**
 *
 * TutorialPictograph
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

function TutorialPictograph() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Building a Pictograph</Heading>
      <Paragraph marginTop="0.5rem">
        {`In a pictograph, you need to read the image(s) that you have loaded (refer to Loading costumes/images), 
        the category name and its count value before drawing the pictures.`}
      </Paragraph>
      <iframe
        title="Building a Pictograph"
        src="https://player.vimeo.com/video/404048014"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialPictograph.propTypes = {};

export default memo(TutorialPictograph);
