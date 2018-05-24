import Store from 'react-native-simple-store';
import * as types from './types';
import LevelUtils from '../utils/LevelUtils';

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

export function updateLevelRatings(dispatch, movesLeft, levelRatings, level) {
  const stars = LevelUtils.getLevelSpecs(level).stars;
  let newRating;
  if (movesLeft >= stars[2]) {
    newRating = 3; // 3 stars
  } else if (movesLeft >= stars[1] && movesLeft < stars[2]) {
    newRating = 2; // 2 stars
  } else if (movesLeft >= stars[0] && movesLeft < stars[1]) {
    newRating = 1; // 1 star
  }

  const ratings = levelRatings;
  if (!ratings[level] || ratings[level] < newRating) {
    ratings[level] = newRating;
  }
  Store.save('levelRatings', ratings);
  dispatch(setLevelRatings(ratings));
}

export function levelUp(movesLeft, ratings, level, highestLevel) {
  return dispatch => {
    updateLevelRatings(dispatch, movesLeft, ratings, level);
    if (level < LevelUtils.getMaxLevel()) {
      const nextLevel = level + 1;
      if (highestLevel < nextLevel) {
        Store.save('highestLevel', nextLevel);
        dispatch(setHighestLevel(nextLevel));
      }
      dispatch(setLevel(nextLevel));
      dispatch(setModal('default'));
      dispatch(setBoardStateCache(null));
    }
  };
}
