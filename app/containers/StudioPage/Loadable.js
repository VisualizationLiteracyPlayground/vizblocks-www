/**
 *
 * Asynchronously loads the component for StudioPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
