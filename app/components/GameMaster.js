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

    constructor() {
        super();
        this.state = {
            route: {
                menu: true,
                game: false,
                leaderboard: false,
            },
            level: 1,
            score: 0,
            firstLoad: true,
            boardStateCache: null,
            triColor: false,
        };
        this.levelUp = this.levelUp.bind(this);
        this.setRoute = this.setRoute.bind(this);
        this.toggleTriColorMode = this.toggleTriColorMode.bind(this);
    }

    getStateForLevel() { // TODO: better way to do levels
        const state = {};
        if (this.state.level < 9) {
            state.size = 3; state.moves = 15;
        } else if (this.state.level >= 9 && this.state.level < 17) {
            state.size = 4; state.moves = 20;
        } else if (this.state.level >= 17 && this.state.level < 25) {
            state.size = 5; state.moves = 25;
        } else if (this.state.level >= 25 && this.state.level < 33) {
            state.size = 6; state.moves = 30;
        } else if (this.state.level >= 33 && this.state.level < 41) {
            state.size = 7; state.moves = 40;
        } else {
            state.size = 8; state.moves = 50;
        }
        return state;
    }

    /**
    * Poor man's router
    * @param {String} route - route name
    * @param {Object} boardState - boardState if cached (OPTIONAL)
    */
    setRoute(route, gameState) {
        const boardState = gameState || this.state.boardStateCache;
        switch (route) {
        case 'game':
            this.setState({
                route: { menu: false, game: true, leaderboard: false },
                firstLoad: false,
            }); break;
        case 'menu':
            this.setState({
                route: { menu: true, game: false, leaderboard: false },
                boardStateCache: boardState,
            }); break;
        case 'leaderboard':
            this.setState({
                route: { menu: false, game: false, leaderboard: true },
                boardStateCache: boardState,
            }); break;
        case 'gameOver':
            this.saveScoreToStorage();
            this.setState({
                route: { menu: true, game: false, leaderboard: false },
                level: 1,
                score: 0,
                firstLoad: true,
                boardStateCache: null,
            }); break;
        case 'newGame':
            this.setState({
                route: { menu: false, game: true, leaderboard: false },
                level: 1,
                score: 0,
                firstLoad: false,
                boardStateCache: null,
            }); break;
        default: break;
        }
    }

    /**
    * Level-up handler
    * @param {Int} movesLeft - number of moves left, used to calculate score
    */
    levelUp(movesLeft) {
        const newLevel = this.state.level + 1;
        let newScore = this.state.score + 10;
        if (this.state.triColor) {
            newScore += ((movesLeft * 10) + this.state.level) * 3;
        } else {
            newScore += (movesLeft * 10) + this.state.level;
        }
        this.setState({
            level: newLevel,
            score: newScore,
            boardStateCache: null,
        });
    }

    /**
    * Method to toggle triColor mode true and false
    * @param {Boolean} status - boolean indicating status of triColor mode
    */
    toggleTriColorMode() {
        const triColor = !this.state.triColor;
        this.setState({ triColor });
    }

    /**
    * TODO: this should be more efficient, ie balanced search trees
    * Save the new score into AsyncStorage and state, after sorting and truncating the leaderboard
    */
    saveScoreToStorage() {
        const date = new Date();
        const newScore = {
            date: date.toLocaleString(),
            score: this.state.score,
            triColor: this.state.triColor ? 'ON' : 'OFF',
        };
        const leaderboard = this.props.leaderboard;
        leaderboard.push(newScore);
        const sortedLeaderboard = leaderboard.sort(this.compare).slice(0, 20);
        this.props.setLeaderboard(sortedLeaderboard);
        Store.save('leaderboard', sortedLeaderboard);
    }

    render() {
        const levelState = this.getStateForLevel();
        return (
            <View style={{ flex: 1 }}>
                {this.state.route.menu ?
                    <Menu
                      setRoute={this.setRoute}
                      firstLoad={this.state.firstLoad}
                      triColor={this.state.triColor}
                      toggleTriColorMode={this.toggleTriColorMode}
                    /> : null}
                {this.state.route.game ?
                    <Board
                      size={levelState.size}
                      moves={levelState.moves}
                      key={this.state.level}
                      level={this.state.level}
                      levelUp={this.levelUp}
                      score={this.state.score}
                      setRoute={this.setRoute}
                      boardStateCache={this.state.boardStateCache}
                      triColor={this.state.triColor}
                    /> : null}
                {this.state.route.leaderboard ?
                    <LeaderBoard setRoute={this.setRoute} /> : null}
            </View>
        );
    }
}

GameMaster.propTypes = {
    leaderboard: PropTypes.array.isRequired,
    setLeaderboard: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
        routes: state.routes,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster);
