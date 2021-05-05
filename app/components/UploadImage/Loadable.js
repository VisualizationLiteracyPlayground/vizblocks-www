/**
 *
 * Asynchronously loads the component for UploadImage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
