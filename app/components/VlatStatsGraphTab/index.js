/* eslint-disable react/prop-types */
/**
 *
 * VlatStatsGraphTab
 *
 */

import React, { memo } from 'react';
import { Pane } from 'evergreen-ui';
import { Bar } from 'react-chartjs-2';

function VlatStatsGraphTab({
  initialAssessmentData,
  postAssessmentData,
  xLabels,
}) {
  // Visualization variables
  const options = {
    title: {
      display: true,
      text: 'VLAT Score Statistics',
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += `: ${tooltipItem.yLabel}`;
            // Display number of users that took the test
            label += ` | ${
              data.datasets[tooltipItem.datasetIndex].count[
                xLabels.findIndex(type => tooltipItem.xLabel === type)
              ]
            } user(s)`;
          }
          return label;
        },
      },
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Avg Score',
          },
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return (
    <Pane display="flex" height="85vh" flexDirection="column">
      <Pane display="flex" flex={1} />
      <Pane
        display="flex"
        flex={1}
        background="white"
        marginX="2rem"
        marginY="1.5rem"
        padding="1rem"
        elevation={1}
      >
        <Bar
          data={{
            labels: xLabels,
            datasets: [initialAssessmentData, postAssessmentData],
          }}
          options={options}
          height="100%"
        />
      </Pane>
      <Pane display="flex" flex={1} />
    </Pane>
  );
}

VlatStatsGraphTab.propTypes = {};

export default memo(VlatStatsGraphTab);
