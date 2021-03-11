/*
 *
 * CreditsPage constants
 * Details of each developer
 * following the format:
 * - Name (required)
 * - Thumbnail (required)
 * - DevRole (required)
 * - Title (required)
 * = Email
 * - Website
 * - Social Media
 */
import TravisProfile from 'images/credits/travis.jpg';
import BimleshProfile from 'images/credits/bimlesh.jpg';
import HengYeowProfile from 'images/credits/heng-yeow.jpg';

const BIMLESH = {
  name: 'Bimlesh Wadhwa',
  thumbnail: BimleshProfile,
  devRole: 'Project Supervisor',
  title: 'NUS Senior Lecturer | Assistant Dean, Student Life',
  email: 'bimlesh@comp.nus.edu.sg',
  website: 'https://www.comp.nus.edu.sg/cs/bio/bimlesh/',
};

const TRAVIS = {
  name: 'Travis Ching Jia Yea',
  thumbnail: TravisProfile,
  devRole: 'VizBlocks Website & Server Developer',
  title: 'NUS Computer Science Undergraduate Final Year Project',
  email: 'travisching007@gmail.com',
  website: 'https://gilgameshtc.github.io/',
  socialMedia: [
    'https://www.facebook.com/travis.yea/',
    'https://www.instagram.com/travis.cjy/',
    'https://www.linkedin.com/in/travis-ching-97370317a/',
    'https://github.com/GilgameshTC',
  ],
};

const HENG_YEOW = {
  name: 'Heng Yeow Tan',
  thumbnail: HengYeowProfile,
  devRole: 'VizBlocks Extension Developer',
  title: 'NUS Computer Science Undergraduate Final Year Project',
  email: 'tanhengyeow@gmail.com',
  socialMedia: ['https://github.com/tanhengyeow'],
};

export const DEV_CREDITS = [TRAVIS, HENG_YEOW, BIMLESH];
