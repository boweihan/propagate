import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const routes = createReducer({ menu: true, game: false, picker: false, instructions: false, settings: false }, {
    [types.SET_ROUTE](state, action) {
        let newRoutes = { menu: false, game: false, picker: false, instructions: false, settings: false }; // eslint-disable-line
        switch (action.route) {
        case 'game': newRoutes.game = true; break;
        case 'picker': newRoutes.picker = true; break;
        case 'menu': newRoutes.menu = true; break;
        case 'instructions': newRoutes.instructions = true; break;
        case 'settings': newRoutes.settings = true; break;
        default: break;
        }
        return newRoutes;
    },
});
