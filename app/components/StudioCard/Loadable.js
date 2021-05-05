/**
 *
 * Asynchronously loads the component for StudioCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
