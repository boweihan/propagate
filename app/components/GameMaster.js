import React from 'react';
import { View } from 'react-native';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Board from './Board';
import Menu from './Menu';
import Settings from './Settings';
import Instructions from './Instructions';
import { ActionCreators } from '../actions';
import HelperUtils from './utils/HelperUtils';

class GameMaster extends React.Component {
    constructor() {
        super();
        this.levelUp = this.levelUp.bind(this);
        this.setCompleteRoute = this.setCompleteRoute.bind(this);
    }

    setCompleteRoute(route, gameState) {
        const boardState = gameState || this.props.boardStateCache;
        switch (route) {
        case 'menu':
        case 'leaderboard':
            this.props.setBoardStateCache(boardState); break;
        case 'gameOver':
            this.props.setBoardStateCache(null); break;
        default: break;
        }
        this.props.setRoute(route);
    }

    levelUp() {
        this.props.incrementLevel(this.props.level);
        this.props.setBoardStateCache(null);
    }

    saveScoreToStorage() {
        const date = new Date();
        const newScore = {
            date: date.toLocaleString(),
            score: this.props.score,
            triColor: this.props.triColorMode ? 'ON' : 'OFF',
        };
        const leaderboard = this.props.leaderboard;
        leaderboard.push(newScore);
        const sortedLeaderboard = leaderboard.sort(HelperUtils.compare).slice(0, 20);
        this.props.setLeaderboard(sortedLeaderboard);
        Store.save('leaderboard', sortedLeaderboard);
    }

    render() {
        const levelSpec = HelperUtils.getLevelSpecs(this.props.level);
        return (
            <View style={{ flex: 1, backgroundColor: '#CECDCD' }}>
                {this.props.routes.menu ?
                    <Menu
                      setCompleteRoute={this.setCompleteRoute}
                    /> : null}
                {this.props.routes.game ?
                    <Board
                      size={levelSpec.size}
                      moves={levelSpec.moves}
                      key={this.props.level}
                      levelUp={this.levelUp}
                      setCompleteRoute={this.setCompleteRoute}
                    /> : null}
                {this.props.routes.instructions ?
                    <Instructions setCompleteRoute={this.setCompleteRoute} /> : null}
                {this.props.routes.settings ?
                    <Settings setCompleteRoute={this.setCompleteRoute} /> : null}
            </View>
        );
    }
}

GameMaster.propTypes = {
    leaderboard: PropTypes.array.isRequired,
    setLeaderboard: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    triColorMode: PropTypes.bool.isRequired,
    boardStateCache: PropTypes.object,
    incrementLevel: PropTypes.func.isRequired,
    setBoardStateCache: PropTypes.func.isRequired,
    setRoute: PropTypes.func.isRequired,
};

GameMaster.defaultProps = {
    boardStateCache: null, // makes it easy to write exist() logic
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
        routes: state.routes,
        level: state.level,
        score: state.score,
        firstLoad: state.firstLoad,
        triColorMode: state.triColorMode,
        boardStateCache: state.boardStateCache,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster);
