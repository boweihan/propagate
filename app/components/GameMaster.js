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

class GameMaster extends React.Component {
    // temporary compare function for sorting leaderboard on push, better to use a tree
    static compare(a, b) {
        if (a.score < b.score) { return 1; }
        if (a.score > b.score) { return -1; }
        return 0;
    }

    static getLevelSpecs(level) { // TODO: better way to do levels
        const specs = {};
        if (level < 9) {
            specs.size = 3; specs.moves = 15;
        } else if (level >= 9 && level < 17) {
            specs.size = 4; specs.moves = 20;
        } else if (level >= 17 && level < 25) {
            specs.size = 5; specs.moves = 25;
        } else if (level >= 25 && level < 33) {
            specs.size = 6; specs.moves = 30;
        } else if (level >= 33 && level < 41) {
            specs.size = 7; specs.moves = 40;
        } else {
            specs.size = 8; specs.moves = 50;
        }
        return specs;
    }

    constructor(props) {
        super();
        props.setRoute('menu');
        this.levelUp = this.levelUp.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.toggleTriColorMode = this.toggleTriColorMode.bind(this);
    }

    /**
    * Poor man's router
    * @param {String} route - route name
    * @param {Object} boardState - boardState if cached (OPTIONAL)
    */
    setRoute(route, gameState) {
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
            this.props.setScore(1);
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

    /**
    * Level-up handler
    * @param {Int} movesLeft - number of moves left, used to calculate score
    */
    levelUp(movesLeft) {
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

    /**
    * Method to toggle triColor mode true and false
    * @param {Boolean} status - boolean indicating status of triColor mode
    */
    toggleTriColorMode() { // TODO kill
        const triColor = !this.props.triColorMode;
        this.props.setTriColorMode(triColor);
    }

    /**
    * TODO: this should be more efficient, ie balanced search trees
    * Save the new score into AsyncStorage and state, after sorting and truncating the leaderboard
    */
    saveScoreToStorage() {
        const date = new Date();
        const newScore = {
            date: date.toLocaleString(),
            score: this.props.score,
            triColor: this.props.triColorMode ? 'ON' : 'OFF',
        };
        const leaderboard = this.props.leaderboard;
        leaderboard.push(newScore);
        const sortedLeaderboard = leaderboard.sort(this.compare).slice(0, 20);
        this.props.setLeaderboard(sortedLeaderboard);
        Store.save('leaderboard', sortedLeaderboard);
    }

    render() {
        const levelSpec = GameMaster.getLevelSpecs(this.props.level);
        if (!this.props.routes) {
            return null;
        }
        return (
            <View style={{ flex: 1 }}>
                {this.props.routes.menu ?
                    <Menu
                      setRoute={this.setRoute}
                      firstLoad={this.props.firstLoad}
                      triColor={this.props.triColorMode}
                      toggleTriColorMode={this.toggleTriColorMode}
                    /> : null}
                {this.props.routes.game ?
                    <Board
                      size={levelSpec.size}
                      moves={levelSpec.moves}
                      key={this.props.level}
                      level={this.props.level}
                      levelUp={this.levelUp}
                      score={this.props.score}
                      setRoute={this.setRoute}
                      boardStateCache={this.props.boardStateCache}
                      triColor={this.props.triColorMode}
                    /> : null}
                {this.props.routes.leaderboard ?
                    <LeaderBoard setRoute={this.setRoute} /> : null}
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
    firstLoad: PropTypes.bool.isRequired,
    triColorMode: PropTypes.bool.isRequired,
    boardStateCache: PropTypes.object,
    incrementLevel: PropTypes.func.isRequired,
    setScore: PropTypes.func.isRequired,
    setBoardStateCache: PropTypes.func.isRequired,
    setTriColorMode: PropTypes.func.isRequired,
    setFirstLoad: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
    setRoute: PropTypes.func.isRequired,
};

GameMaster.defaultProps = {
    boardStateCache: null,
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
