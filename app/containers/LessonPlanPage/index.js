/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * LessonPlanPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, BookIcon, Card, Dialog, Heading, Pane } from 'evergreen-ui';
import Tilt from 'react-parallax-tilt';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NavigationBar from 'components/NavigationBar';
import LessonPlanIllustration from 'images/lesson-plan-illustration.png';
import UnderConstructionIllustration from 'images/under-construction-illustration.png';

import makeSelectLessonPlanPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { LESSON_PLANS } from './lessonPlans';
import { makeSelectCurrentUser } from '../App/selectors';
import ColorPallete from '../../colorPallete';

export function LessonPlanPage({ user }) {
  useInjectReducer({ key: 'lessonPlanPage', reducer });
  useInjectSaga({ key: 'lessonPlanPage', saga });

  const [showLessonDialog, setShowLessonDialog] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  // Number of Lesson Plans are very low currently,
  // Show coming soon illustration
  const showComingSoon = true;

  function cleanupDialog() {
    setShowLessonDialog(false);
    setSelectedLesson(null);
  }

  return (
    <Pane
      height="100vh"
      display="flex"
      flexDirection="column"
      overflowY="auto"
      background={ColorPallete.paneTwo}
    >
      <NavigationBar user={user} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lobster"
      />
      <Pane
        aria-label="header"
        display="flex"
        flexDirection="column"
        background={ColorPallete.secondaryColor}
        alignItems="center"
        justifyContent="center"
        paddingY="1rem"
      >
        <img
          style={{
            maxWidth: '15vw',
            height: 'auto',
            maxHeight: '32vh',
          }}
          src={LessonPlanIllustration}
          alt="Illustration of Lesson Plan"
        />
        <Heading size={600} fontFamily="Lobster, display" marginTop="0.5rem">
          Lesson Plan
        </Heading>
      </Pane>
      <Pane aria-label="lesson cards" display="flex" paddingY="1rem">
        <Pane flex={1} />
        <Pane display="flex" flexWrap="wrap" width="80.5vw">
          {LESSON_PLANS.map(lesson => (
            <Tilt>
              <Card
                key={lesson.title}
                display="flex"
                flexDirection="column"
                width="18vw"
                height="30vh"
                marginX="1rem"
                marginY="1rem"
                cursor="pointer"
                onClick={() => {
                  setSelectedLesson(lesson);
                  setShowLessonDialog(true);
                }}
              >
                <img
                  style={{
                    width: '18vw',
                    height: '22vh',
                    objectFit: 'cover',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                  }}
                  src={lesson.thumbnail}
                  alt={`Thumbnail of lesson: ${lesson.title}`}
                />
                <Pane
                  display="flex"
                  height="8vh"
                  background={ColorPallete.backgroundColor}
                  borderBottomLeftRadius="5px"
                  borderBottomRightRadius="5px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size={600} fontFamily="Lobster, display">
                    {lesson.title}
                  </Heading>
                </Pane>
              </Card>
            </Tilt>
          ))}
          {showComingSoon && (
            <Tilt>
              <Card
                display="flex"
                flexDirection="column"
                width="18vw"
                height="30vh"
                marginX="1rem"
                marginY="1rem"
                cursor="not-allowed"
              >
                <img
                  style={{
                    width: '18vw',
                    height: '30vh',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                  src={UnderConstructionIllustration}
                  alt="More Lesson Plans to come in the future"
                />
                <Pane
                  position="absolute"
                  width="18vw"
                  height="30vh"
                  zIndex={10}
                  borderRadius="5px"
                >
                  <Pane
                    display="flex"
                    marginY="13vh"
                    padding="0.2rem"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, 0.9)`,
                    }}
                    justifyContent="center"
                  >
                    <Heading size={600} fontFamily="Lobster, display">
                      More Coming Soon
                    </Heading>
                  </Pane>
                </Pane>
              </Card>
            </Tilt>
          )}
        </Pane>
        <Pane flex={1} />
      </Pane>
      <Dialog
        isShown={showLessonDialog}
        intent="success"
        width="50vw"
        hasFooter={false}
        onCloseComplete={() => cleanupDialog()}
      >
        {selectedLesson && (
          <Pane display="flex" flexDirection="column">
            <Pane
              aria-label="lesson-information"
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginBottom="1rem"
            >
              <img
                style={{
                  width: '18vw',
                  height: '22vh',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  marginRight: '2rem',
                }}
                src={selectedLesson.thumbnail}
                alt={`Thumbnail of lesson: ${selectedLesson.title}`}
              />
              <Pane display="flex" flexDirection="column" justifyItems="center">
                <Heading size={600} fontFamily="Lobster, display">
                  {selectedLesson.title}
                </Heading>
                <Heading size={400} marginTop="1rem">
                  {selectedLesson.description}
                </Heading>
              </Pane>
            </Pane>
            {selectedLesson.lessons.map(sublesson => (
              <Pane key={sublesson.name} display="flex" flexDirection="column">
                <Pane
                  borderColor={ColorPallete.lightGrey}
                  width="100%"
                  borderWidth="0.1rem"
                  borderTopStyle="solid"
                  aria-label="Horizontal divider"
                />
                <Pane
                  display="flex"
                  marginY="0.2rem"
                  aria-label="sublesson details"
                  alignItems="center"
                >
                  <Heading size={400} color="grey">
                    <ul>
                      <li>{sublesson.name}</li>
                    </ul>
                  </Heading>
                  <Pane flex={1} />
                  <Button
                    iconBefore={BookIcon}
                    appearance="primary"
                    intent="danger"
                    width="max-content"
                    onClick={() => window.open(sublesson.pdfLink, '_blank')}
                  >
                    PDF
                  </Button>
                </Pane>
              </Pane>
            ))}
          </Pane>
        )}
      </Dialog>
    </Pane>
  );
}

LessonPlanPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  lessonPlanPage: makeSelectLessonPlanPage(),
  user: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LessonPlanPage);
