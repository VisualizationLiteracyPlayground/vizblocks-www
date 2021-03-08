/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Heading, Pane } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectHomePage, makeSelectFeaturedProjects } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadFeatured } from './actions';
import LandingMast from '../../components/LandingMast';
import NavigationBar from '../../components/NavigationBar';
import ProjectCard from '../../components/ProjectCard';
import { makeSelectCurrentUser } from '../App/selectors';
import ColorPallete from '../../colorPallete';

const FEATURED_PAGE_LIMIT = 7;

export function HomePage({ user, featuredProjects, loadFeatured }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    loadFeatured({
      offset: 0,
      limit: FEATURED_PAGE_LIMIT,
    });
  }, []);

  return (
    <Pane height="100vh" background={ColorPallete.secondaryColor}>
      <NavigationBar user={user} />
      <LandingMast />
      <Pane
        aria-label="links"
        display="flex"
        background={ColorPallete.paneTwo}
        justifyContent="center"
        padding="0.5rem"
      >
        <Button
          appearance="primary"
          intent="success"
          borderRadius="50px"
          marginX="2rem"
        >
          About
        </Button>
        <Button
          appearance="primary"
          intent="success"
          borderRadius="50px"
          marginX="2rem"
        >
          For Educators
        </Button>
      </Pane>
      <Pane
        aria-label="bottom section"
        height="46%"
        display="flex"
        flexDirection="column"
        background={ColorPallete.secondaryColor}
        paddingY="1rem"
        paddingX="1.5rem"
      >
        <Pane flex={1} />
        <Pane display="flex">
          <Pane flex={1} />
          <Pane
            aria-label="featured-projects"
            display="flex"
            flexDirection="column"
            flex={1}
            background={ColorPallete.backgroundColor}
            elevation={1}
          >
            <Pane aria-label="featured-header" display="flex" marginTop="1rem">
              <Heading size={500} marginLeft="1rem">
                Featured Projects
              </Heading>
              <Heading size={400} marginLeft="0.5rem" color="gray">
                |
              </Heading>
            </Pane>
            <Pane
              width="100%"
              borderColor={ColorPallete.lightGrey}
              borderWidth="0.1rem"
              borderTopStyle="solid"
              marginTop="1rem"
              aria-label="Horizontal divider"
            />
            <Pane
              aria-label="project-cards"
              display="flex"
              paddingY="1.5rem"
              paddingX="2.5rem"
            >
              {featuredProjects &&
                featuredProjects.docs.map(project => (
                  <Pane
                    // eslint-disable-next-line no-underscore-dangle
                    key={project._id}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    marginLeft="1rem"
                    marginRight="1rem"
                  >
                    <ProjectCard project={project} />
                  </Pane>
                ))}
            </Pane>
          </Pane>
          <Pane flex={1} />
        </Pane>
        <Pane flex={1} />
      </Pane>
    </Pane>
  );
}
const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  user: makeSelectCurrentUser(),
  featuredProjects: makeSelectFeaturedProjects(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadFeatured: queryPacket => dispatch(loadFeatured(queryPacket)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
