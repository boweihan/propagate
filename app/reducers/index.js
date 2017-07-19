import { combineReducers } from 'redux';
import * as LeaderboardReducer from './leaderboard';

export default combineReducers(Object.assign(
    LeaderboardReducer
));