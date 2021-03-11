/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * CreditsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { EnvelopeIcon, GlobeNetworkIcon, Heading, Pane } from 'evergreen-ui';
import SocialMediaButtons from 'react-social-media-buttons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NavigationBar from 'components/NavigationBar';
import ContactUsIllustration from 'images/contact-us-illustration.png';
import nusSocLogo from 'images/credits/nus.png';
import scratchLogo from 'images/credits/scratch.png';
import freepikLogo from 'images/credits/freepik.png';
import kindpngLogo from 'images/credits/kindpng.png';

import makeSelectCreditsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { DEV_CREDITS } from './developerCredits';
import { makeSelectCurrentUser } from '../App/selectors';
import ColorPallete from '../../colorPallete';

export function CreditsPage({ user }) {
  useInjectReducer({ key: 'creditsPage', reducer });
  useInjectSaga({ key: 'creditsPage', saga });

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
          src={ContactUsIllustration}
          alt="Illustration of Contact Us"
        />
        <Heading size={600} fontFamily="Lobster, display" marginTop="0.5rem">
          {'VizBlocks Credits & Contributions'}
        </Heading>
      </Pane>
      <Pane
        aria-label="developers"
        display="flex"
        width="60vw"
        flexDirection="column"
        justifyContent="center"
        alignSelf="center"
        paddingX="3rem"
        paddingY="1rem"
      >
        <Heading size={600} alignSelf="center" marginBottom="1rem">
          VizBlocks Team
        </Heading>
        {DEV_CREDITS.map((dev, idx) => (
          <Pane
            key={dev.name}
            display="flex"
            flexDirection={idx % 2 === 0 ? 'row' : 'row-reverse'}
            marginY="0.5rem"
            alignItems="center"
          >
            <img
              style={{
                width: '6vw',
                height: '6vw',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              src={dev.thumbnail}
              alt={`Developer ${dev.name}'s profile`}
            />
            <Pane
              borderColor={ColorPallete.grey}
              borderWidth="0.15rem"
              borderLeftStyle="solid"
              height="100%"
              marginX="1.5rem"
              aria-label="Vertical divider"
            />
            <Pane
              display="flex"
              flexDirection="column"
              alignItems={idx % 2 === 0 ? 'flex-start' : 'flex-end'}
              aria-label="dev-details"
            >
              <Heading size={500}>{dev.name}</Heading>
              <Heading size={300} marginTop="0.5rem">
                <b>{dev.devRole}</b>
              </Heading>
              <Heading size={300} marginTop="0.5rem">
                {dev.title}
              </Heading>
              <Pane
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginTop="0.4rem"
                marginX="-10px"
              >
                {dev.website && (
                  <Pane
                    display="flex"
                    cursor="pointer"
                    width="28px"
                    height="28px"
                    borderRadius="8px"
                    marginX="10px"
                    background={ColorPallete.backgroundColor}
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => window.open(dev.website, '_blank')}
                    aria-label="dev-website"
                  >
                    <GlobeNetworkIcon size={14} />
                  </Pane>
                )}
                {dev.email && (
                  <Pane
                    display="flex"
                    cursor="pointer"
                    width="28px"
                    height="28px"
                    borderRadius="8px"
                    marginX="10px"
                    background={ColorPallete.backgroundColor}
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => window.open(`mailto:${dev.email}`)}
                    aria-label="dev-website"
                  >
                    <EnvelopeIcon size={14} />
                  </Pane>
                )}
                {dev.socialMedia && (
                  <SocialMediaButtons
                    links={dev.socialMedia}
                    buttonStyle={{
                      width: '28px',
                      height: '28px',
                      margin: '0px 10px',
                      backgroundColor: ColorPallete.backgroundColor,
                      borderRadius: '30%',
                    }}
                    iconStyle={{ color: 'black' }}
                    openNewTab
                  />
                )}
              </Pane>
            </Pane>
          </Pane>
        ))}
      </Pane>
      <Pane
        aria-label="acknowledgement-illustrations"
        display="flex"
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingX="3rem"
        paddingTop="1rem"
        paddingBottom="2rem"
        background={ColorPallete.pastelFour}
      >
        <Heading size={600} alignSelf="center" marginBottom="1rem">
          Acknowledgement
        </Heading>
        <Pane
          aria-label="parties-involved"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Pane
            cursor="pointer"
            onClick={() =>
              window.open('https://www.comp.nus.edu.sg/', '_blank')
            }
          >
            <img
              style={{
                maxWidth: '15vw',
                height: 'auto',
                margin: '0 2rem',
              }}
              src={nusSocLogo}
              alt="NUS SoC Logo"
            />
          </Pane>
          <Pane
            cursor="pointer"
            onClick={() =>
              window.open('https://scratch.mit.edu/credits', '_blank')
            }
          >
            <img
              style={{
                maxWidth: '7vw',
                height: 'auto',
                margin: '0 2rem',
              }}
              src={scratchLogo}
              alt="Scratch Logo"
            />
          </Pane>
        </Pane>
        <Pane
          width="20vw"
          borderColor={ColorPallete.grey}
          borderWidth="0.1rem"
          borderTopStyle="solid"
          marginY="1.5rem"
          aria-label="Horizontal divider"
        />
        <Heading size={600} alignSelf="center" marginBottom="1rem">
          Illustrations
        </Heading>
        <Pane
          aria-label="image-websites"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Pane
            cursor="pointer"
            onClick={() =>
              window.open('https://www.freepik.com/vectors/business', '_blank')
            }
          >
            <img
              style={{
                maxWidth: '6vw',
                height: 'auto',
                margin: '0 2rem',
              }}
              src={freepikLogo}
              alt="Freepik Logo"
            />
          </Pane>
          <Pane
            cursor="pointer"
            onClick={() => window.open('https://www.kindpng.com/', '_blank')}
          >
            <img
              style={{
                maxWidth: '6vw',
                height: 'auto',
                margin: '0 2rem',
              }}
              src={kindpngLogo}
              alt="KindPng Logo"
            />
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

CreditsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  creditsPage: makeSelectCreditsPage(),
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
)(CreditsPage);
