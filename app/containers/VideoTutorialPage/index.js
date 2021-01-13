/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/**
 *
 * VideoTutorialPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, SidebarTab, Strong, Tablist, Tooltip } from 'evergreen-ui';
// import { Link } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectVideoTutorialPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import { makeSelectCurrentUser } from '../App/selectors';
import NavigationBar from '../../components/NavigationBar';
import TutorialBasics from '../../components/TutorialBasics';
import TutorialBarChart from '../../components/TutorialBarChart';
import TutorialHistogram from '../../components/TutorialHistogram';
import TutorialPieChart from '../../components/TutorialPieChart';
import TutorialLineChart from '../../components/TutorialLineChart';
import TutorialDotPlot from '../../components/TutorialDotPlot';
import TutorialScatterPlot from '../../components/TutorialScatterPlot';
import TutorialPictograph from '../../components/TutorialPictograph';
import TutorialHeatmap from '../../components/TutorialHeatmap';
import Faq from '../../components/Faq';

const tabsList = [
  'Basics',
  'Bar Chart',
  'Histogram',
  'Pie Chart',
  'Line Chart',
  'Dot Plot',
  'Scatter Plot',
  'Pictograph',
  'Heatmap',
  'FAQ',
];

export function VideoTutorialPage({ user }) {
  useInjectReducer({ key: 'videoTutorialPage', reducer });
  useInjectSaga({ key: 'videoTutorialPage', saga });

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <Pane display="flex" aria-label="header" background="white">
        <Pane display="flex" flexGrow={1} />
        <Pane
          display="flex"
          aria-label="tutorial type"
          flexDirection="row"
          marginTop="0.5rem"
        >
          <Pane
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
          >
            <Strong size={500}>Video</Strong>
            <Pane
              width="10vw"
              borderColor={ColorPallete.accentColor}
              borderWidth="0.3rem"
              borderTopStyle="solid"
              marginTop="0.3rem"
              aria-label="Horizontal divider"
            />
          </Pane>
          <Pane
            display="flex"
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
          >
            {/* <Link
              to="/ideas/interactive-tutorials"
              style={{ textDecoration: 'none' }}
            > */}
            <Tooltip content="Coming soon">
              <Strong size={500} color="grey">
                Interactive
              </Strong>
            </Tooltip>
            {/* </Link> */}
            <Pane
              width="10vw"
              borderColor="white"
              borderWidth="0.3rem"
              borderTopStyle="solid"
              marginTop="0.3rem"
              aria-label="Horizontal divider"
            />
          </Pane>
        </Pane>
        <Pane display="flex" flexGrow={1} />
      </Pane>
      <Pane
        display="flex"
        height="80vh"
        background="white"
        marginX="2rem"
        marginY="1.5rem"
        padding="1rem"
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
              {index === 0 && <TutorialBasics />}
              {index === 1 && <TutorialBarChart />}
              {index === 2 && <TutorialHistogram />}
              {index === 3 && <TutorialPieChart />}
              {index === 4 && <TutorialLineChart />}
              {index === 5 && <TutorialDotPlot />}
              {index === 6 && <TutorialScatterPlot />}
              {index === 7 && <TutorialPictograph />}
              {index === 8 && <TutorialHeatmap />}
              {index === 9 && <Faq />}
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

VideoTutorialPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videoTutorialPage: makeSelectVideoTutorialPage(),
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
)(VideoTutorialPage);
