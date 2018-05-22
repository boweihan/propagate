import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import styles from '../components/styles/ModeSelectorStyles';

export const mode = createReducer(
  {
    activeMode: 'SQUARE',
    squareStyle: styles.active,
    plusStyle: null,
    crossStyle: null,
  },
  {
    [types.SET_MODE](state, action) {
      const newState = {
        activeMode: null,
        squareStyle: null,
        plusStyle: null,
        crossStyle: null,
      }; // eslint-disable-line
      switch (action.mode) {
        case 'SQUARE':
          newState.squareStyle = styles.active;
          newState.activeMode = action.mode;
          break;
        case 'PLUS':
          newState.plusStyle = styles.active;
          newState.activeMode = action.mode;
          break;
        case 'CROSS':
          newState.crossStyle = styles.active;
          newState.activeMode = action.mode;
          break;
        default:
          newState.squareStyle = styles.active;
          newState.activeMode = 'SQUARE';
          break;
      }
      return newState;
    },
  },
);
