/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * Quiz
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Button, Dialog, Heading, Pane } from 'evergreen-ui';

import McqQuestion from 'components/McqQuestion';
import TrueFalseQuestion from 'components/TrueFalseQuestion';

import ColorPallete from '../../colorPallete';

function Quiz({ user, quiz, submitQuizCallback, setSubmittedCallback }) {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  function selectOptionCallback(value) {
    setCorrectQuestions(correctQuestions + value);
  }

  useEffect(() => {
    console.log(`${correctQuestions}/${totalQuestions}`);
  }, [correctQuestions]);
  useEffect(() => {
    if (quiz) {
      let questions = 0;
      quiz.questions.forEach(question => {
        questions += question.mcqSubquestions.length;
        questions += question.trueFalseSubquestions.length;
      });
      setTotalQuestions(questions);
    }
  }, [quiz]);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      height="80vh"
      width="100vw"
      alignSelf="center"
      overflowY="auto"
    >
      {quiz &&
        quiz.questions.map((question, index) => (
          <Pane
            display="flex"
            flexDirection="column"
            width="60vw"
            marginTop="1rem"
            alignSelf="center"
            key={question._id}
          >
            <Pane
              display="flex"
              flexDirection="column"
              background="white"
              borderRadius={50}
              alignItems="center"
              paddingY="1rem"
              paddingX="1.5rem"
            >
              <Pane
                display="flex"
                alignSelf="flex-start"
                aria-label="question-title"
              >
                <Heading size={400} marginRight="1rem" width="max-content">
                  <b>{`${index + 1}`}</b>
                </Heading>
                <Heading size={400}>{question.title}</Heading>
              </Pane>
              <img
                style={{
                  width: 'auto',
                  maxWidth: '50vw',
                  height: 'max-content',
                  maxHeight: '40vh',
                  marginTop: '1rem',
                }}
                src={`data:${question.img.contentType};base64,${
                  question.img.data
                }`}
                alt="question visualization"
              />
            </Pane>
            {question.mcqSubquestions.map((subquestion, subindex) => (
              <McqQuestion
                questionNumber={index + 1}
                subQuestionNumber={subindex + 1}
                question={subquestion}
                selectCallback={selectOptionCallback}
                key={subquestion._id}
              />
            ))}
            {question.trueFalseSubquestions.map((subquestion, subindex) => (
              <TrueFalseQuestion
                questionNumber={index + 1}
                subQuestionNumber={
                  question.mcqSubquestions.length + subindex + 1
                }
                question={subquestion}
                selectCallback={selectOptionCallback}
                key={subquestion._id}
              />
            ))}
            <Pane
              borderColor={ColorPallete.lightGrey}
              width="100%"
              borderWidth="0.1rem"
              borderTopStyle="solid"
              marginTop="1rem"
              aria-label="Horizontal divider"
            />
          </Pane>
        ))}
      {quiz && (
        <Button
          width="max-content"
          intent="success"
          appearance="primary"
          marginTop="1rem"
          marginBottom="1rem"
          alignSelf="center"
          onClick={() => setShowSubmitConfirmation(true)}
        >
          Submit
        </Button>
      )}
      {!quiz && (
        <Pane
          display="flex"
          flexDirection="column"
          flex={1}
          width="60vw"
          alignSelf="center"
        >
          <Pane display="flex" flex={1} />
          <Pane
            display="flex"
            background="white"
            borderRadius={50}
            height="30vh"
            width="100%"
          >
            <Pane display="flex" flex={1} />
            <Heading size={600} alignSelf="center">
              {'Coming Soon!'}
            </Heading>
            <Pane display="flex" flex={1} />
          </Pane>
          <Pane display="flex" flex={2} />
        </Pane>
      )}
      <Dialog
        isShown={showSubmitConfirmation}
        hasHeader={false}
        intent="success"
        width="25vw"
        onCloseComplete={() => setShowSubmitConfirmation(false)}
        onConfirm={() => {
          submitQuizCallback(user ? user.data.id : 0, quiz.testType, {
            score: correctQuestions,
            questions: totalQuestions,
            category: quiz.category,
          });
          setSubmittedCallback({
            totalQuestions,
            correctQuestions,
          });
          setShowSubmitConfirmation(false);
        }}
        confirmLabel="Confirm"
      >
        <Heading size={600}>Confirm submit?</Heading>
      </Dialog>
    </Pane>
  );
}

Quiz.propTypes = {};

export default memo(Quiz);
