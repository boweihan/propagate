import * as types from './types';

export function setMode(mode) {
    return {
        type: types.SET_MODE,
        mode,
    };
}
