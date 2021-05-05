/**
 *
 * TutorialBasics
 *
 */

import React, { memo } from 'react';
import { Heading, Paragraph, Pane } from 'evergreen-ui';

import ColorPallete from '../../colorPallete';

function TutorialBasics() {
  return (
    <Pane overflowY="auto" height="70vh">
      <Heading size={600}>Using the VizBlocks Extension</Heading>
      <iframe
        title="Using the VizBlocks Extension"
        src="https://player.vimeo.com/video/404047982"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
      <Pane
        width="30vw"
        borderColor={ColorPallete.backgroundColor}
        borderWidth="0.2rem"
        borderTopStyle="solid"
        marginY="0.5rem"
        aria-label="Horizontal divider"
      />
      <Heading size={600}>Loading Costumes/Images</Heading>
      <Paragraph marginTop="0.5rem">
        {`Before using VizBlocks, you should load costumes/images beforehand so that 
          VizBlocks recognize that you want to use these assets in your visualizations.`}
      </Paragraph>
      <iframe
        title="Loading Costumes/Images"
        src="https://player.vimeo.com/video/404047926"
        width="800"
        height="400"
        frameBorder="0"
        allow="autoplay; fullscreen"
      />
    </Pane>
  );
}

TutorialBasics.propTypes = {};

export default memo(TutorialBasics);
