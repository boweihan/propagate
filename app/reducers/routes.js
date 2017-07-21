import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

function setRoute(route) {
    let newRoutes = { menu: false, game: false, leaderboard: false, }; // eslint-disable-line
    switch (route) {
    case 'game': newRoutes.game = true; break;
    case 'menu': newRoutes.menu = true; break;
    case 'leaderboard': newRoutes.leaderboard = true; break;
    default: break;
    }
    return newRoutes;
}


export const routes = createReducer(null, {
    [types.SET_ROUTE](state, action) {
        return setRoute(action.route);
    },
});
