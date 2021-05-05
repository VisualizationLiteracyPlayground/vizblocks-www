/**
 *
 * Asynchronously loads the component for ExplorePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
