import * as types from './types';
// import Api from '../lib/api'

export function setLeaderboard(leaderboard) {
  return {
    type: types.SET_LEADERBOARD,
    leaderboard, // object short notation
  };
}
