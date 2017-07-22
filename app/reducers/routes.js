import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const routes = createReducer({ menu: true, game: false, leaderboard: false }, {
    [types.SET_ROUTE](state, action) {
        let newRoutes = { menu: false, game: false, leaderboard: false }; // eslint-disable-line
        switch (action.route) {
        case 'game':
        case 'newGame': newRoutes.game = true; break;
        case 'gameOver':
        case 'menu': newRoutes.menu = true; break;
        case 'leaderboard': newRoutes.leaderboard = true; break;
        default: break;
        }
        return newRoutes;
    },
});
