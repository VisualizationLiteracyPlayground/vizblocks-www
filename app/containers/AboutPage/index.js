/* eslint-disable react/prop-types */
/**
 *
 * AboutPage
 *
 */

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Heading, Pane } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import NavigationBar from 'components/NavigationBar';
import VizBlocksLogo from 'images/landing-mast.svg';
import ResearchIllustration from 'images/research-illustration.png';
import LessonPlanIllustration from 'images/lesson-plan-illustration.png';
import ScratchIllustration from 'images/scratch-illustration.png';
import ContactUsIllustration from 'images/contact-us-illustration.png';

import makeSelectAboutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser } from '../App/selectors';
import ColorPallete from '../../colorPallete';

export function AboutPage({ user }) {
  useInjectReducer({ key: 'aboutPage', reducer });
  useInjectSaga({ key: 'aboutPage', saga });

  const [showResearchHover, setShowResearchHover] = useState(false);
  const [showLessonPlanHover, setShowLessonPlanHover] = useState(false);
  const [showCreditsHover, setShowCreditsHover] = useState(false);
  const [showScratchHover, setShowScratchHover] = useState(false);

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
        aria-label="Header Information"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingTop="1rem"
        paddingBottom="1.5rem"
        background={ColorPallete.secondaryColor}
      >
        <Pane
          aria-label="Header description"
          display="flex"
          flexDirection="column"
          width="40vw"
          marginRight="3rem"
          alignSelf="center"
        >
          <img
            style={{
              width: 'auto',
              height: '8rem',
              alignSelf: 'center',
              marginBottom: '1rem',
            }}
            src={VizBlocksLogo}
            alt="Vizblock logo with illustrations for landing page"
          />
          <Heading size={400} textAlign="justify">
            VizBlocks is an extension of Scratch built with the purpose to allow
            children to learn data visualization literacy skills creatively
            whilst strongly enforcing knowledge on the individual parts that
            make up a data visualization.
          </Heading>
          <br />
          <Heading size={400} textAlign="justify">
            The VizBlocks website serves as a one-stop platform to access
            materials used for teaching and learning of data visualization
            literacy, access the Vizblocks tool as well as contribute to the
            resources. This in turn, builds a community shared learning!
          </Heading>
        </Pane>
        <Pane
          borderStyle="solid"
          borderColor={ColorPallete.grey}
          borderWidth="0.3rem"
          borderRadius="5px"
        >
          <iframe
            width="480"
            height="270"
            src="https://www.youtube.com/embed/Oowtin1JjPQ?autoplay=1&loop=1&mute=1&playlist=Oowtin1JjPQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Pane>
      </Pane>
      <Pane
        aria-label="Bottom Section"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Pane
          aria-label="About Cards"
          display="flex"
          width="85vw"
          marginTop="2.5rem"
        >
          <Pane flex={1} />
          <Card
            aria-label="research"
            display="flex"
            flexDirection="column"
            height="40vh"
            width="18vw"
            background={ColorPallete.pastelOne}
            marginX="1rem"
            alignItems="center"
            justifyContent="center"
            onMouseEnter={() => setShowResearchHover(true)}
            onMouseLeave={() => setShowResearchHover(false)}
            cursor="pointer"
          >
            <Pane
              display="flex"
              height="32vh"
              alignItems="center"
              justifyContent="center"
            >
              <img
                style={{
                  maxWidth: '15vw',
                  height: 'auto',
                  maxHeight: '32vh',
                }}
                src={ResearchIllustration}
                alt="Illustration of Research"
              />
            </Pane>
            <Pane display="flex" height="8vh">
              <Heading
                size={600}
                fontFamily="Lobster, display"
                color={!showResearchHover ? 'black' : ColorPallete.pastelOne}
                marginTop="0.5rem"
                transition="color 0.5s"
              >
                Research
              </Heading>
            </Pane>
            <Pane
              position="absolute"
              height="40vh"
              width="18vw"
              zIndex={10}
              style={{
                backgroundColor: `rgba(255, 255, 255, 0.9)`,
              }}
              opacity={showResearchHover ? 1 : 0}
              textAlign="center"
              borderRadius="5px"
              transition="opacity 0.5s"
            >
              {showResearchHover && (
                <Heading size={600} color="black" marginY="50%">
                  Coming Soon
                </Heading>
              )}
            </Pane>
          </Card>
          <Card
            aria-label="lesson plan"
            display="flex"
            flexDirection="column"
            height="40vh"
            width="18vw"
            background={ColorPallete.pastelTwo}
            marginX="1rem"
            alignItems="center"
            justifyContent="center"
            onMouseEnter={() => setShowLessonPlanHover(true)}
            onMouseLeave={() => setShowLessonPlanHover(false)}
            cursor="pointer"
            onClick={() => history.push('/about/lesson-plan')}
          >
            <Pane
              display="flex"
              height="32vh"
              alignItems="center"
              justifyContent="center"
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
            </Pane>
            <Pane display="flex" height="8vh">
              <Heading
                size={600}
                fontFamily="Lobster, display"
                color={!showLessonPlanHover ? 'black' : ColorPallete.pastelTwo}
                marginTop="0.5rem"
                transition="color 0.5s"
              >
                Lesson Plan
              </Heading>
            </Pane>
            <Pane
              position="absolute"
              height="40vh"
              width="18vw"
              zIndex={10}
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.5)`,
              }}
              opacity={showLessonPlanHover ? 1 : 0}
              textAlign="center"
              borderRadius="5px"
              transition="opacity 0.5s"
            >
              {showLessonPlanHover && (
                <Heading size={600} color="white" marginY="50%">
                  Lesson Plan
                </Heading>
              )}
            </Pane>
          </Card>
          <Card
            aria-label="credits"
            display="flex"
            flexDirection="column"
            height="40vh"
            width="18vw"
            background={ColorPallete.pastelThree}
            marginX="1rem"
            alignItems="center"
            justifyContent="center"
            onMouseEnter={() => setShowCreditsHover(true)}
            onMouseLeave={() => setShowCreditsHover(false)}
            cursor="pointer"
            onClick={() => history.push('/about/credits')}
          >
            <Pane
              display="flex"
              height="32vh"
              alignItems="center"
              justifyContent="center"
            >
              <img
                style={{
                  maxWidth: '15vw',
                  height: 'auto',
                  maxHeight: '32vh',
                }}
                src={ContactUsIllustration}
                alt="Illustration of Contact Us"
              />
            </Pane>
            <Pane display="flex" height="8vh">
              <Heading
                size={600}
                fontFamily="Lobster, display"
                color={!showCreditsHover ? 'black' : ColorPallete.pastelThree}
                marginTop="0.5rem"
                transition="color 0.5s"
              >
                Credits
              </Heading>
            </Pane>
            <Pane
              position="absolute"
              height="40vh"
              width="18vw"
              zIndex={10}
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.5)`,
              }}
              opacity={showCreditsHover ? 1 : 0}
              textAlign="center"
              borderRadius="5px"
              transition="opacity 0.5s"
            >
              {showCreditsHover && (
                <Heading size={600} color="white" marginY="50%">
                  Credits
                </Heading>
              )}
            </Pane>
          </Card>
          <Card
            aria-label="scratch"
            display="flex"
            flexDirection="column"
            height="40vh"
            width="18vw"
            background={ColorPallete.pastelFour}
            marginX="1rem"
            alignItems="center"
            justifyContent="center"
            onMouseEnter={() => setShowScratchHover(true)}
            onMouseLeave={() => setShowScratchHover(false)}
            cursor="pointer"
            onClick={() =>
              window.open('https://scratch.mit.edu/about', '_blank')
            }
          >
            <Pane
              display="flex"
              height="32vh"
              alignItems="center"
              justifyContent="center"
            >
              <img
                style={{
                  maxWidth: '15vw',
                  height: 'auto',
                  maxHeight: '32vh',
                }}
                src={ScratchIllustration}
                alt="Illustration of Scratch"
              />
            </Pane>
            <Pane display="flex" height="8vh">
              <Heading
                size={600}
                fontFamily="Lobster, display"
                color={!showScratchHover ? 'black' : ColorPallete.pastelFour}
                marginTop="0.5rem"
                transition="color 0.5s"
              >
                Scratch by MIT
              </Heading>
            </Pane>
            <Pane
              position="absolute"
              height="40vh"
              width="18vw"
              zIndex={10}
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.5)`,
              }}
              opacity={showScratchHover ? 1 : 0}
              textAlign="center"
              borderRadius="5px"
              transition="opacity 0.5s"
            >
              {showScratchHover && (
                <Heading size={600} color="white" marginY="50%">
                  Scratch by MIT
                </Heading>
              )}
            </Pane>
          </Card>
          <Pane flex={1} />
        </Pane>
      </Pane>
    </Pane>
  );
}

const mapStateToProps = createStructuredSelector({
  aboutPage: makeSelectAboutPage(),
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
)(AboutPage);
