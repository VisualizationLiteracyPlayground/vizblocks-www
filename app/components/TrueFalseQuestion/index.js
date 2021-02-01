/* eslint-disable react/prop-types */
/**
 *
 * TrueFalseQuestion
 *
 */

import React, { memo, useState } from 'react';
import { Heading, RadioGroup, Pane } from 'evergreen-ui';

function TrueFalseQuestion({
  questionNumber,
  subQuestionNumber,
  question,
  selectCallback,
}) {
  const options = [
    { label: 'True', value: '0' },
    { label: 'False', value: '1' },
  ];

  const [valueSelected, setValueSelected] = useState('2');

  function convertValueSelectedToBoolean(value) {
    return value === '2' ? null : value === '0';
  }

  function valueToReturn(newValue) {
    if (
      convertValueSelectedToBoolean(valueSelected) === question.correctAnswer
    ) {
      // Previously selected correct answer
      return -1;
    }
    if (convertValueSelectedToBoolean(newValue) === question.correctAnswer) {
      // Selecting correct answer
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
            selectCallback(valueToReturn(event.target.value));
            setValueSelected(event.target.value);
          }}
        />
      </Pane>
    </Pane>
  );
}

TrueFalseQuestion.propTypes = {};

export default memo(TrueFalseQuestion);
