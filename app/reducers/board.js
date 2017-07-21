import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const level = createReducer(1, {
    [types.SET_LEVEL](state, action) {
        return action.level;
    },
    [types.INCREMENT_LEVEL](state, action) {
        return action.level + 1;
    },
});

export const score = createReducer(0, {
    [types.SET_SCORE](state, action) {
        return action.score;
    },
});

export const firstLoad = createReducer(true, {
    [types.SET_FIRST_LOAD](state, action) {
        return action.firstLoad;
    },
});

export const triColorMode = createReducer(false, {
    [types.SET_TRICOLOR_MODE](state, action) {
        return action.triColorMode;
    },
});

export const boardStateCache = createReducer(null, {
    [types.SET_BOARD_STATE_CACHE](state, action) {
        return action.boardState;
    },
});
