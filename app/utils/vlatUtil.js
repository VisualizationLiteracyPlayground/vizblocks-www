import PieChart from 'images/visualization-types/pie-chart.png';
import BarChart from 'images/visualization-types/bar-chart.png';
import LineChart from 'images/visualization-types/line-chart.png';
import DotPlot from 'images/visualization-types/dot-plot.png';
import ScatterPlot from 'images/visualization-types/scatter-plot.png';
import Heatmap from 'images/visualization-types/heatmap.png';
import Pictograph from 'images/visualization-types/pictograph.png';
import Histogram from 'images/visualization-types/histogram.png';

import ColorPallete from '../colorPallete';

// VLAT constants
export const VLAT_TEST_TYPE = {
  INITIAL_ASSESSMENT: 'initial-assessment',
  POST_ASSESSMENT: 'post-assessment',
};

// Takes in url param and convert to corresponding VLAT_TEST_TYPE enum
export function checkTestTypeEnum(testType) {
  switch (testType) {
    case 'initial-assessment':
      return VLAT_TEST_TYPE.INITIAL_ASSESSMENT;
    case 'post-assessment':
      return VLAT_TEST_TYPE.POST_ASSESSMENT;
    default:
      return '';
  }
}

// Takes in VLAT_TEST_TYPE enum and returns corresponding title
export function getTestTypeTitle(testTypeEnum) {
  switch (testTypeEnum) {
    case VLAT_TEST_TYPE.INITIAL_ASSESSMENT:
      return 'Pre-Assessment';
    case VLAT_TEST_TYPE.POST_ASSESSMENT:
      return 'Post-Assessment';
    default:
      return 'Assessment';
  }
}

// Takes in VLAT_TEST_TYPE enum and returns background color
export function getBackgroundColorForTestType(testTypeEnum) {
  switch (testTypeEnum) {
    case VLAT_TEST_TYPE.INITIAL_ASSESSMENT:
      return ColorPallete.secondaryColor;
    case VLAT_TEST_TYPE.POST_ASSESSMENT:
      return ColorPallete.paneTwo;
    default:
      return ColorPallete.backgroundColor;
  }
}

// Visualization Types
export const VISUALIZATION_TYPE = {
  PIE_CHART: 'pie-chart',
  BAR_CHART: 'bar-chart',
  HISTOGRAM: 'histogram',
  PICTOGRAPH: 'pictograph',
  DOT_PLOT: 'dot-plot',
  LINE_CHART: 'line-chart',
  SCATTER_PLOT: 'scatter-plot',
  HEATMAP: 'heatmap',
};

// Takes in url param and convert to corresponding VISUALIZATION_TYPE enum
export function checkVisualizationTypeEnum(visualizationType) {
  switch (visualizationType) {
    case 'bar-chart':
      return VISUALIZATION_TYPE.BAR_CHART;
    case 'line-chart':
      return VISUALIZATION_TYPE.LINE_CHART;
    case 'pie-chart':
      return VISUALIZATION_TYPE.PIE_CHART;
    case 'histogram':
      return VISUALIZATION_TYPE.HISTOGRAM;
    case 'pictograph':
      return VISUALIZATION_TYPE.PICTOGRAPH;
    case 'dot-plot':
      return VISUALIZATION_TYPE.DOT_PLOT;
    case 'scatter-plot':
      return VISUALIZATION_TYPE.SCATTER_PLOT;
    case 'heatmap':
      return VISUALIZATION_TYPE.HEATMAP;
    default:
      return '';
  }
}

export function getVisualizationTypeIllustration(visualizationTypeEnum) {
  switch (visualizationTypeEnum) {
    case VISUALIZATION_TYPE.BAR_CHART:
      return BarChart;
    case VISUALIZATION_TYPE.LINE_CHART:
      return LineChart;
    case VISUALIZATION_TYPE.PIE_CHART:
      return PieChart;
    case VISUALIZATION_TYPE.HISTOGRAM:
      return Histogram;
    case VISUALIZATION_TYPE.PICTOGRAPH:
      return Pictograph;
    case VISUALIZATION_TYPE.DOT_PLOT:
      return DotPlot;
    case VISUALIZATION_TYPE.SCATTER_PLOT:
      return ScatterPlot;
    case VISUALIZATION_TYPE.HEATMAP:
      return Heatmap;
    default:
      return '';
  }
}

export function getVisualizationTypeTitle(visualizationTypeEnum) {
  switch (visualizationTypeEnum) {
    case VISUALIZATION_TYPE.BAR_CHART:
      return 'Bar Chart';
    case VISUALIZATION_TYPE.LINE_CHART:
      return 'Line Chart';
    case VISUALIZATION_TYPE.PIE_CHART:
      return 'Pie Chart';
    case VISUALIZATION_TYPE.HISTOGRAM:
      return 'Histogram';
    case VISUALIZATION_TYPE.PICTOGRAPH:
      return 'Pictograph';
    case VISUALIZATION_TYPE.DOT_PLOT:
      return 'Dot Plot';
    case VISUALIZATION_TYPE.SCATTER_PLOT:
      return 'Scatter Plot';
    case VISUALIZATION_TYPE.HEATMAP:
      return 'Heatmap';
    default:
      return '';
  }
}
