import * as types from './types';

export function setLevel(level) {
  return {
    type: types.SET_LEVEL,
    level,
  };
}

export function setHighestLevel(level) {
  return {
    type: types.SET_HIGHEST_LEVEL,
    level,
  };
}

export function setLevelRatings(ratings) {
  return {
    type: types.SET_LEVEL_RATINGS,
    ratings,
  };
}

export function setScore(score) {
  return {
    type: types.SET_SCORE,
    score,
  };
}

export function setTriColorMode(triColorMode) {
  return {
    type: types.SET_TRICOLOR_MODE,
    triColorMode,
  };
}

export function setBoardStateCache(boardState) {
  return {
    type: types.SET_BOARD_STATE_CACHE,
    boardState,
  };
}

export function setModal(modal) {
  return {
    type: types.SET_MODAL,
    modal,
  };
}
