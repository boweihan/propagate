import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const level = createReducer(null, {
    [types.SET_LEVEL](state, action) {
        return action.level;
    },
    [types.INCREMENT_LEVEL](state, action) {
        return action.level + 1;
    },
});

export const score = createReducer(null, {
    [types.SET_SCORE](state, action) {
        return action.score;
    },
});

export const firstLoad = createReducer(null, {
    [types.SET_FIRST_LOAD](state, action) {
        return action.firstLoad;
    },
});

export const triColorMode = createReducer(null, {
    [types.SET_TRICOLOR_MODE](state, action) {
        return action.triColorMode;
    },
});

export const boardStateCache = createReducer(null, {
    [types.SET_BOARD_STATE_CACHE](state, action) {
        return action.boardStateCache;
    },
});
