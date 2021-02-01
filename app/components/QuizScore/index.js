/* eslint-disable react/prop-types */
/**
 *
 * QuizScore
 *
 */

import React, { memo } from 'react';
import { Heading, Pane } from 'evergreen-ui';

import CompletedIllustrations from 'images/completed-illustration.png';

function QuizScore({ clickedSubmit }) {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      height="80vh"
      width="60vw"
      alignSelf="center"
    >
      <Pane display="flex" flex={1} />
      <Pane
        display="flex"
        background="white"
        borderRadius={50}
        height="50vh"
        width="100%"
      >
        <Pane display="flex" flex={1} />
        <Pane
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignContent="center"
          justifyItems="center"
          justifyContent="center"
        >
          <img
            style={{
              width: 'auto',
              height: '40vh',
            }}
            src={CompletedIllustrations}
            alt="Illustration of completed quiz"
          />
          <Heading size={500} marginTop="0.5rem">
            {`Score: ${clickedSubmit.correctQuestions}/${
              clickedSubmit.totalQuestions
            }`}
          </Heading>
        </Pane>
        <Pane display="flex" flex={1} />
      </Pane>
      <Pane display="flex" flex={2} />
    </Pane>
  );
}

QuizScore.propTypes = {};

export default memo(QuizScore);
