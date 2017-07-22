import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

// NEED TO SET LEVEL TO BE NULL SO THAT WE CAN PULL FROM LOCALSTORAGE IN Propagate.js
export const level = createReducer(null, {
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

const defaultModal = { visible: false, msg: null, color: null, type: null };
export const modal = createReducer(defaultModal, {
    [types.SET_MODAL](state, action) {
        switch (action.modal) {
        case 'fail':
            return { visible: true, msg: 'SORRY. OUT OF MOVES.', color: '#dd7b6e', type: 'fail' };
        case 'levelup':
            return { visible: true, msg: 'LEVEL UP', color: '#7AAF29', type: 'levelup' };
        default:
            break;
        }
        return defaultModal;
    },
});

