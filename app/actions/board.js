import * as types from './types';

export function setLeaderboard(leaderboard) {
    return {
        type: types.SET_LEADERBOARD,
        leaderboard, // object short notation
    };
}