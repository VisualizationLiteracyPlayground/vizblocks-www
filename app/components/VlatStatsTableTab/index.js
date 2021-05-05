/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * VlatStatsTableTab
 *
 */

import React, { memo, useEffect, useState } from 'react';
import {
  CaretDownIcon,
  Menu,
  Pane,
  Popover,
  Position,
  Table,
  Text,
  TextDropdownButton,
} from 'evergreen-ui';

import {
  VISUALIZATION_TYPE,
  getVisualizationTypeTitle,
  checkVisualizationTypeEnum,
  VLAT_TEST_TYPE,
  getTestTypeTitle,
} from 'utils/vlatUtil';

function VlatStatsTableTab({ data }) {
  const [usernameSearchValue, setUsernameSearchValue] = useState('');
  const [emailSearchValue, setEmailSearchValue] = useState('');
  const [displayVisualizationType, setVisualizationType] = useState(
    VISUALIZATION_TYPE.PIE_CHART,
  );
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    setDisplayData(prepareDisplayData(data));
  }, [data]);

  function prepareDisplayData(data) {
    // Sort data by username
    return data.sort((scoreA, scoreB) =>
      scoreA.user.username.localeCompare(scoreB.user.username),
    );
  }

  function renderCategoryHeader() {
    return (
      <Table.TextHeaderCell width="max-content">
        <Popover
          position={Position.BOTTOM_LEFT}
          content={({ close }) => (
            <Menu>
              <Menu.OptionsGroup
                title="Show"
                options={Object.values(VISUALIZATION_TYPE)
                  .map(type => ({
                    label: getVisualizationTypeTitle(type),
                    value: type,
                  }))
                  .concat({
                    label: 'All types',
                    value: 'all',
                  })}
                selected={displayVisualizationType}
                onChange={value => {
                  setVisualizationType(value);
                  // Close the popover when you select a value.
                  close();
                }}
              />
            </Menu>
          )}
        >
          <TextDropdownButton icon={CaretDownIcon}>
            Visualization Type
          </TextDropdownButton>
        </Popover>
      </Table.TextHeaderCell>
    );
  }

  function getInitialAssessmentScore(score) {
    if (checkVisualizationTypeEnum(displayVisualizationType) === '') {
      // Get total score
      let scoreNumber = 0;
      let questionNumber = 0;
      score.initialAssessmentScore.forEach(element => {
        scoreNumber += element.score;
        questionNumber += element.questions;
      });
      return `${scoreNumber}/${questionNumber}`;
    }
    // Get individual visualization score
    const scoreObj = score.initialAssessmentScore.find(
      indvScore => indvScore.category === displayVisualizationType,
    );
    if (scoreObj) {
      return `${scoreObj.score}/${scoreObj.questions}`;
    }
    return '0';
  }

  function getPostAssessmentScore(score) {
    if (checkVisualizationTypeEnum(displayVisualizationType) === '') {
      // Get total score
      let scoreNumber = 0;
      let questionNumber = 0;
      score.postAssessmentScore.forEach(element => {
        scoreNumber += element.score;
        questionNumber += element.questions;
      });
      return `${scoreNumber}/${questionNumber}`;
    }
    // Get individual visualization score
    const scoreObj = score.postAssessmentScore.find(
      indvScore => indvScore.category === displayVisualizationType,
    );
    if (scoreObj) {
      return `${scoreObj.score}/${scoreObj.questions}`;
    }
    return '0';
  }

  return (
    <Pane display="flex" height="85vh" flexDirection="column">
      <Pane
        display="flex"
        flex={1}
        background="white"
        marginX="2rem"
        marginY="1.5rem"
        padding="1rem"
        elevation={1}
      >
        <Table width="100%">
          <Table.Head>
            <Table.SearchHeaderCell
              onChange={value => setUsernameSearchValue(value)}
              flex={1}
              placeholder="Search username"
            />
            <Table.SearchHeaderCell
              onChange={value => setEmailSearchValue(value)}
              flex={1}
              placeholder="Search email"
            />
            {renderCategoryHeader()}
            <Table.TextHeaderCell width="max-content">
              <Text size={300}>
                <b>{getTestTypeTitle(VLAT_TEST_TYPE.INITIAL_ASSESSMENT)}</b>
              </Text>
            </Table.TextHeaderCell>
            <Table.TextHeaderCell width="max-content">
              <Text size={300}>
                <b>{getTestTypeTitle(VLAT_TEST_TYPE.POST_ASSESSMENT)}</b>
              </Text>
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height="70vh">
            {displayData
              .filter(
                score =>
                  score.user.username
                    .toLowerCase()
                    .includes(usernameSearchValue.toLowerCase()) &&
                  score.user.email
                    .toLowerCase()
                    .includes(emailSearchValue.toLowerCase()),
              )
              .map(score => (
                <Table.Row key={score._id} height={40}>
                  <Table.Cell>
                    <Text size={300}>{score.user.username}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={300}>{score.user.email}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={300}>{displayVisualizationType}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={300}>{getInitialAssessmentScore(score)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={300}>{getPostAssessmentScore(score)}</Text>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Pane>
    </Pane>
  );
}

VlatStatsTableTab.propTypes = {};

export default memo(VlatStatsTableTab);
