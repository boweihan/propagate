import { combineReducers } from 'redux';
import * as RoutesReducer from './routes';
import * as BoardReducer from './board';
import * as MenuReducer from './menu';
import * as ModeReducer from './mode';

export default combineReducers(Object.assign(
    RoutesReducer,
    BoardReducer,
    MenuReducer,
    ModeReducer,
));
