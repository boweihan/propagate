import * as types from './types';

export function setRoute(route) {
  return {
    type: types.SET_ROUTE,
    route,
  };
}
