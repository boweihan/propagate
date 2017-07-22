import { combineReducers } from 'redux';
import * as LeaderboardReducer from './leaderboard';
import * as RoutesReducer from './routes';
import * as BoardReducer from './board';
import * as MenuReducer from './menu';

export default combineReducers(Object.assign(
    LeaderboardReducer,
    RoutesReducer,
    BoardReducer,
    MenuReducer,
));
