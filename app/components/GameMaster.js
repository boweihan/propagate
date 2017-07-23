import React from 'react';
import { View } from 'react-native';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Board from './Board';
import LevelPicker from './LevelPicker';
import Menu from './Menu';
import Settings from './Settings';
import Instructions from './Instructions';
import { ActionCreators } from '../actions';
import LevelUtils from './utils/LevelUtils';

class GameMaster extends React.Component {
    constructor() {
        super();
        this.levelUp = this.levelUp.bind(this);
        this.setCompleteRoute = this.setCompleteRoute.bind(this);
    }

    setCompleteRoute(route, gameState) {
        let newRoute = route;
        const boardState = gameState || this.props.boardStateCache;
        if (newRoute === 'won') {
            newRoute = 'menu';
            this.props.setMode('SQUARE');
            this.props.setModal('default');
            this.props.setBoardStateCache(null);
            this.props.setLevel(null);
        } else if (newRoute === 'gameOver') {
            newRoute = 'menu';
            this.props.setMode('SQUARE');
            this.props.setModal('default');
            this.props.setBoardStateCache(null);
        } else if (newRoute === 'menu' || newRoute === 'picker') {
            this.props.setBoardStateCache(boardState);
        }
        this.props.setRoute(newRoute);
    }

    levelUp(movesLeft) {
        this.updateLevelRatings(movesLeft);
        const nextLevel = this.props.level + 1;
        if (this.props.highestLevel < nextLevel) {
            Store.save('highestLevel', nextLevel);
            this.props.setHighestLevel(nextLevel);
        }
        this.props.setLevel(nextLevel);
        this.props.setModal('default');
        this.props.setBoardStateCache(null);
    }

    updateLevelRatings(movesLeft) {
        const stars = LevelUtils.getLevelSpecs(this.props.level).stars;

        let newRating;
        if (movesLeft === stars[2]) {
            newRating = 3; // 3 stars
        } else if (movesLeft >= stars[1] && movesLeft < stars[2]) {
            newRating = 2; // 2 stars
        } else if (movesLeft >= stars[0] && movesLeft < stars[1]) {
            newRating = 1; // 1 star
        }

        const ratings = this.props.levelRatings;
        if (!ratings[this.props.level] || ratings[this.props.level] < newRating) {
            ratings[this.props.level] = newRating;
        }
        Store.save('levelRatings', ratings);
        this.props.setLevelRatings(ratings);
    }

    render() {
        const levelSpec = LevelUtils.getLevelSpecs(this.props.level);
        return (
            <View style={{ flex: 1, backgroundColor: '#CECDCD' }}>
                {this.props.routes.menu ?
                    <Menu
                      setCompleteRoute={this.setCompleteRoute}
                    /> : null}
                {this.props.routes.game ?
                    <Board
                      levelSpec={levelSpec}
                      key={this.props.level}
                      levelUp={this.levelUp}
                      setCompleteRoute={this.setCompleteRoute}
                    /> : null}
                {this.props.routes.picker ?
                    <LevelPicker setCompleteRoute={this.setCompleteRoute} /> : null}
                {this.props.routes.instructions ?
                    <Instructions setCompleteRoute={this.setCompleteRoute} /> : null}
                {this.props.routes.settings ?
                    <Settings setCompleteRoute={this.setCompleteRoute} /> : null}
            </View>
        );
    }
}

GameMaster.propTypes = {
    routes: PropTypes.object.isRequired,
    level: PropTypes.number,
    boardStateCache: PropTypes.object,
    setLevel: PropTypes.func.isRequired,
    setBoardStateCache: PropTypes.func.isRequired,
    setRoute: PropTypes.func.isRequired,
    setHighestLevel: PropTypes.func.isRequired,
    highestLevel: PropTypes.number.isRequired,
    setMode: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    levelRatings: PropTypes.object.isRequired,
    setLevelRatings: PropTypes.func.isRequired,
};

GameMaster.defaultProps = {
    boardStateCache: null, // makes it easy to write exist() logic
    level: null,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        routes: state.routes,
        level: state.level,
        highestLevel: state.highestLevel,
        score: state.score,
        boardStateCache: state.boardStateCache,
        levelRatings: state.levelRatings,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster);
