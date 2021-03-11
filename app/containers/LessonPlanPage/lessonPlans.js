/*
 *
 * Details of each lesson plan
 * following the format:
 * - Title
 * - Description
 * - Thumbnail
 * - Lessons ([] of { lesson name, pdf link })
 */
import pieAndBarChartLessonThumbnail from 'images/lesson-thumbnails/getting-started.jpg';

const PIE_AND_BAR_CHART_LESSON = {
  title: 'Pie Chart & Bar Chart',
  description: `A comprehensive first lesson in VizBlocks which provides a step by step guide on creating an account,
    taking the Pre-assessment VLAT test, guided activities on creating Pie Chart and Bar Chart
    and lastly taking the Post-assessment VLAT test.`,
  thumbnail: pieAndBarChartLessonThumbnail,
  lessons: [
    {
      name: 'Getting Started',
      pdfLink:
        'https://drive.google.com/file/d/12lHQm1Ko7Gzw38Tsc46HySU2_eJD_DOv/view?usp=sharing',
    },
    {
      name: 'Pie Chart',
      pdfLink:
        'https://drive.google.com/file/d/1PtC9eYVCCj8gW9MrFqXr5lXzpKJvAXnn/view?usp=sharing',
    },
    {
      name: 'Bar Chart',
      pdfLink:
        'https://drive.google.com/file/d/1M22dqYyEFDsXaxEO6fOJTzvxagjY338s/view?usp=sharing',
    },
    {
      name: 'Concluding',
      pdfLink:
        'https://drive.google.com/file/d/1FYdZ_jclM1cPdt6CjcnDbxcqdY_4MhD7/view?usp=sharing',
    },
  ],
};

export const LESSON_PLANS = [PIE_AND_BAR_CHART_LESSON];
