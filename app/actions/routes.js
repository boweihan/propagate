import * as types from './types';

export function setRoute(route) {
  return {
    type: types.SET_ROUTE,
    route,
  };
}

export function setCompleteRoute(route, gameState) {
  return dispatch => {
    let newRoute = route;
    if (newRoute === 'won') {
      newRoute = 'menu';
      dispatch({
        type: types.SET_MODE,
        mode: 'SQUARE',
      });
      dispatch({
        type: types.SET_MODAL,
        modal: 'default',
      });
      dispatch({
        type: types.SET_BOARD_STATE_CACHE,
        boardState: null,
      });
      dispatch({
        type: types.SET_LEVEL,
        level: null,
      });
    } else if (newRoute === 'gameOver') {
      newRoute = 'menu';
      dispatch({
        type: types.SET_MODE,
        mode: 'SQUARE',
      });
      dispatch({
        type: types.SET_MODAL,
        modal: 'default',
      });
      dispatch({
        type: types.SET_BOARD_STATE_CACHE,
        boardState: null,
      });
    } else if (newRoute === 'menu' || newRoute === 'picker') {
      dispatch({
        type: types.SET_BOARD_STATE_CACHE,
        boardState: gameState,
      });
    }
    dispatch(setRoute(newRoute));
  };
}
