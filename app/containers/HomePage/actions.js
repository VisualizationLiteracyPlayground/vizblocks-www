/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_FEATURED,
  LOAD_FEATURED_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadFeatured(queryPacket) {
  return {
    type: LOAD_FEATURED,
    queryPacket,
  };
}

export function loadFeaturedSuccess(featuredProjects) {
  return {
    type: LOAD_FEATURED_SUCCESS,
    featuredProjects,
  };
}
