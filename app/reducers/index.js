import { combineReducers } from 'redux';
import * as LeaderboardReducer from './leaderboard';
import * as RoutesReducer from './routes';
import * as BoardReducer from './board';

export default combineReducers(Object.assign(
    LeaderboardReducer,
    RoutesReducer,
    BoardReducer,
));
