import * as types from './types';

export function setLevel(level) {
    return {
        type: types.SET_LEVEL,
        level,
    };
}

export function incrementLevel(level) {
    return {
        type: types.INCREMENT_LEVEL,
        level,
    };
}

export function setScore(score) {
    return {
        type: types.SET_SCORE,
        score,
    };
}

export function setFirstLoad(firstLoad) {
    return {
        type: types.SET_FIRST_LOAD,
        firstLoad,
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
