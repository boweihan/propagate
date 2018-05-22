import { Animated } from 'react-native';
import createReducer from '../lib/createReducer';
// import * as types from '../actions/types';

export const pulseRed = createReducer(new Animated.Value(0), {
  // TODO: add actions if needed
});

export const pulseBlack = createReducer(new Animated.Value(0), {
  // TODO: add actions if needed
});
