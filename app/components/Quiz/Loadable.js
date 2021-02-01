/**
 *
 * Asynchronously loads the component for Quiz
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
