import React from 'react';
import { View } from 'react-native';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Board from './Board';
import Menu from './Menu';
import LeaderBoard from './LeaderBoard';
import { ActionCreators } from '../actions';
import HelperUtils from './utils/HelperUtils';

class GameMaster extends React.Component {
    constructor() {
        super();
        this.levelUp = this.levelUp.bind(this);
        this.setCompleteRoute = this.setCompleteRoute.bind(this);
    }

    setCompleteRoute(route, gameState) { // TODO: find way to reduxify this
        const boardState = gameState || this.props.boardStateCache;
        switch (route) {
        case 'game':
            this.props.setFirstLoad(false); break;
        case 'menu':
        case 'leaderboard':
            this.props.setBoardStateCache(boardState); break;
        case 'gameOver':
            this.saveScoreToStorage();
            this.props.setLevel(1);
            this.props.setScore(0);
            this.props.setFirstLoad(true);
            this.props.setBoardStateCache(null);
            break;
        case 'newGame':
            this.props.setLevel(1);
            this.props.setScore(0);
            this.props.setFirstLoad(false);
            this.props.setBoardStateCache(null);
            break;
        default: break;
        }
        this.props.setRoute(route);
    }

    levelUp(movesLeft) {  // TODO: find way to reduxify this
        let newScore = this.props.score + 10;
        if (this.props.triColorMode) {
            newScore += ((movesLeft * 10) + this.props.level) * 3;
        } else {
            newScore += (movesLeft * 10) + this.props.level;
        }
        this.props.incrementLevel(this.props.level);
        this.props.setScore(newScore);
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
            <View style={{ flex: 1 }}>
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
                {this.props.routes.leaderboard ?
                    <LeaderBoard setCompleteRoute={this.setCompleteRoute} /> : null}
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
    setScore: PropTypes.func.isRequired,
    setBoardStateCache: PropTypes.func.isRequired,
    setFirstLoad: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
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
