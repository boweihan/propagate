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
        if (route === 'menu' || route === 'settings') {
            this.props.setBoardStateCache(boardState);
        }
        this.props.setRoute(route);
    }

    levelUp() {
        Store.save('level', this.props.level + 1);
        this.props.incrementLevel(this.props.level);
        this.props.setBoardStateCache(null);
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
    routes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
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
        routes: state.routes,
        level: state.level,
        score: state.score,
        boardStateCache: state.boardStateCache,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster);
