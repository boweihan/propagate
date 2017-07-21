import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const leaderboard = createReducer(null, {
    [types.SET_LEADERBOARD](state, action) {
        return action.leaderboard;
    },
});
