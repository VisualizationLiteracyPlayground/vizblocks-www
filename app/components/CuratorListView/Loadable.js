/**
 *
 * Asynchronously loads the component for CuratorListView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
