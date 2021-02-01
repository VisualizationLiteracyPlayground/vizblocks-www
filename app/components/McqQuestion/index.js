/* eslint-disable react/prop-types */
/**
 *
 * McqQuestion
 *
 */

import React, { memo, useState } from 'react';
import { Heading, RadioGroup, Pane } from 'evergreen-ui';

function McqQuestion({
  questionNumber,
  subQuestionNumber,
  question,
  selectCallback,
}) {
  const options = question.options.map((option, index) => ({
    label: option,
    value: `${index}`,
  }));

  const [valueSelected, setValueSelected] = useState(
    `${question.options.length}`,
  );

  function valueToReturn(newValue) {
    if (parseInt(valueSelected, 10) === question.correctAnswer) {
      return -1;
    }
    if (newValue === question.correctAnswer) {
      return 1;
    }
    return 0;
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      background="white"
      borderRadius={50}
      paddingY="1rem"
      paddingX="1.5rem"
      marginTop="1rem"
    >
      <Pane display="flex" flexDirection="column" aria-label="question-title">
        <Pane display="flex">
          <Heading size={400} marginRight="1rem" width="max-content">
            <b>{`${questionNumber}.${subQuestionNumber}`}</b>
          </Heading>
          <Heading size={400}>{question.title}</Heading>
        </Pane>
        <RadioGroup
          marginLeft="2rem"
          size={16}
          value={valueSelected}
          options={options}
          onChange={event => {
            selectCallback(valueToReturn(parseInt(event.target.value, 10)));
            setValueSelected(event.target.value);
          }}
        />
      </Pane>
    </Pane>
  );
}

McqQuestion.propTypes = {};

export default memo(McqQuestion);
