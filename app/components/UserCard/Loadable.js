/**
 *
 * Asynchronously loads the component for UserCard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
