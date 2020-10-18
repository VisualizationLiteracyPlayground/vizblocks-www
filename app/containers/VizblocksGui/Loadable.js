/**
 *
 * Asynchronously loads the component for VizblocksGui
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
