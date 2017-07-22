import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import styles from '../components/styles/ModeSelectorStyles';

export const mode = createReducer({ activeMode: 'SQUARE', squareStyle: styles.active, plusStyle: null, crossStyle: null }, {
    [types.SET_MODE](state, action) {
        let newState = { activeMode: null, squareStyle: null, plusStyle: null, crossStyle: null }; // eslint-disable-line
        switch (action.mode) {
        case 'square':
            newState.squareStyle = styles.active;
            newState.activeMode = 'SQUARE';
            break;
        case 'plus':
            newState.plusStyle = styles.active;
            newState.activeMode = 'PLUS';
            break;
        case 'cross':
            newState.crossStyle = styles.active;
            newState.activeMode = 'CROSS';
            break;
        default:
            newState.squareStyle = styles.active;
            newState.activeMode = 'SQUARE';
            break;
        }
        return newState;
    },
});
