import React from 'react';
import { Font } from 'expo';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions';
import GameMaster from './GameMaster';

const NukamisoLite = require('../assets/fonts/NukamisoLite.ttf');

class Propagate extends React.Component {
    async componentDidMount() {
        let leaderboard;
        await Font.loadAsync({ NukamisoLite });
        await Store.get('leaderboard').then(
            (scores) => {
                leaderboard = scores;
                if (!leaderboard) {
                    leaderboard = [];
                    Store.save('leaderboard', leaderboard);
                }
            });
        this.props.setLeaderboard(leaderboard);
    }

    render() {
        return this.props.leaderboard ?
            <GameMaster leaderboard={this.props.leaderboard} /> : null;
    }
}

Propagate.propTypes = {
    setLeaderboard: PropTypes.func.isRequired,
    leaderboard: PropTypes.array,
};

Propagate.defaultProps = {
    leaderboard: [],
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Propagate);
