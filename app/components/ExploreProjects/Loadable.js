/**
 *
 * Asynchronously loads the component for ExploreProjects
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
