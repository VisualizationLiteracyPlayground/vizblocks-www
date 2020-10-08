/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * StudioPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  CogIcon,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  SidebarTab,
  Spinner,
  Tablist,
  toaster,
} from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { prettyDateFormat } from 'utils/dateUtil';
import DefaultThumbnail from 'images/default-studio-thumbnail.jpg';

import { createStudio, loadStudio, loadStudioFailure } from './actions';
import {
  makeSelectError,
  makeSelectStudio,
  makeSelectStudioPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import NavigationBar from '../../components/NavigationBar';
import { makeSelectCurrentUser } from '../App/selectors';

function getStudioHeaderInfo(studio) {
  return studio
    ? `Updated: ${prettyDateFormat(studio.history.modified)} | Curators: ${studio.curators.length}`
    : '';
}

export function StudioPage({
  user,
  studio,
  createStudio,
  loadStudio,
  error,
  setError,
}) {
  useInjectReducer({ key: 'studioPage', reducer });
  useInjectSaga({ key: 'studioPage', saga });

  // Load state from react-router
  const location = useLocation();
  const isStateful = !!location.state;

  const [tabIndex, setTabIndex] = useState(0);
  const [studioid, setStudioid] = useState(
    isStateful ? location.state.studioid : 0,
  );
  const [loaded, setLoaded] = useState(false);

  const tabsList = ['Projects', 'Comments', 'Curators'];

  useEffect(() => {
    if (!loaded && isStateful) {
      if (studioid === 0) {
        // Create a new studio
        createStudio();
      } else {
        // load studio
        loadStudio(studioid);
      }
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (studio) {
      setStudioid(studio._id);
    }
  }, [studio]);
  useEffect(() => {
    // Catch and alert error messages
    if (error) {
      toaster.danger(error.title, {
        description: error.description,
      });
      setError(false);
    }
  }, [error]);

  return isStateful ? (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      {!studio && (
        <Pane
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Pane>
      )}
      {studio && (
        <Pane padding="1.5rem">
          <Pane
            display="flex"
            height="22vh"
            background="white"
            padding="1rem"
            elevation={1}
            alignItems="center"
            justifyItems="center"
          >
            <img
              style={{
                width: 'auto',
                height: '8rem',
                marginLeft: '1rem',
                marginRight: '3rem',
                borderStyle: 'solid',
                borderWidth: '0.2rem',
                borderColor: ColorPallete.backgroundColor,
              }}
              src={DefaultThumbnail}
              alt="Vizblock default project thumbnail"
            />
            <Pane
              flex={1}
              height="8rem"
              display="flex"
              flexDirection="column"
              flexGrow={1}
              alignItems="left"
              justifyItems="center"
              padding="0.5rem"
            >
              <Heading size={600}>{studio.title}</Heading>
              <Heading size={300} marginTop="0.5rem" color="gray">
                {getStudioHeaderInfo(studio)}
              </Heading>
              <Paragraph marginTop="0.5rem">{studio.description}</Paragraph>
            </Pane>
            <Pane
              height="8rem"
              display="flex"
              flexDirection="column"
              padding="0.5rem"
              marginRight="1rem"
              marginLeft="5rem"
              alignItems="flex-end"
            >
              <Pane display="flex" flexGrow={1}>
                <IconButton
                  icon={CogIcon}
                  appearance="minimal"
                  onClick={() => {
                    console.log('Clicked on settings');
                  }}
                />
              </Pane>
              <Pane display="flex">
                <Button
                  disabled={false}
                  appearance="primary"
                  intent="success"
                  onClick={() => {
                    console.log('Clicked on follow');
                  }}
                >
                  Follow
                </Button>
              </Pane>
            </Pane>
          </Pane>
          <Pane
            display="flex"
            height="62vh"
            background="white"
            padding="1rem"
            marginTop="1rem"
            elevation={1}
          >
            <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
              {tabsList.map((tab, index) => (
                <SidebarTab
                  key={tab}
                  id={tab}
                  onSelect={() => setTabIndex(index)}
                  isSelected={index === tabIndex}
                  aria-controls={`panel-${tab}`}
                >
                  {tab}
                </SidebarTab>
              ))}
            </Tablist>
            <Pane
              padding={16}
              borderLeftStyle="solid"
              borderWidth="0.15rem"
              borderColor={ColorPallete.backgroundColor}
              flex="1"
            >
              {tabsList.map((tab, index) => (
                <Pane
                  key={tab}
                  height="100%"
                  width="100%"
                  id={`panel-${tab}`}
                  role="tabpanel"
                  aria-labelledby={tab}
                  aria-hidden={index !== tabIndex}
                  display={index === tabIndex ? 'block' : 'none'}
                >
                  {tab}
                </Pane>
              ))}
            </Pane>
          </Pane>
        </Pane>
      )}
    </Pane>
  ) : (
    <Redirect to="/" />
  );
}

StudioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studioPage: makeSelectStudioPage(),
  user: makeSelectCurrentUser(),
  studio: makeSelectStudio(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createStudio: () => dispatch(createStudio()),
    loadStudio: studioid => dispatch(loadStudio(studioid)),
    setError: error => dispatch(loadStudioFailure(error)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioPage);
