/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
/**
 *
 * MyStuff
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Pane, Paragraph, SidebarTab, Tablist } from 'evergreen-ui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectMyStuff from './selectors';
import reducer from './reducer';
import saga from './saga';
import ColorPallete from '../../colorPallete';
import NavigationBar from '../../components/NavigationBar';
import MyStuffMast from '../../components/MyStuffMast';
import { makeSelectCurrentUser } from '../App/selectors';

export function MyStuff({ user }) {
  useInjectReducer({ key: 'myStuff', reducer });
  useInjectSaga({ key: 'myStuff', saga });

  const [tabIndex, setTabIndex] = useState(0);

  const tabsList = ['My Projects', 'My Studio', 'Bookmark Projects', 'Trash'];

  return (
    <Pane height="100vh" background={ColorPallete.backgroundColor}>
      <NavigationBar user={user} />
      <MyStuffMast />
      <Pane padding="1.5rem">
        <Pane
          display="flex"
          height="70vh"
          background="white"
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
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={tab}
                aria-hidden={index !== tabIndex}
                display={index === tabIndex ? 'block' : 'none'}
              >
                <Paragraph>Panel {tab}</Paragraph>
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

MyStuff.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myStuff: makeSelectMyStuff(),
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
)(MyStuff);
