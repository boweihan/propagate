import React from 'react';
import GameMaster from './GameMaster';
import { Font } from 'expo';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class Propagate extends React.Component {
    async componentDidMount() {
        let leaderboard;
        await Font.loadAsync({
            'NukamisoLite': require('../assets/fonts/NukamisoLite.ttf'),
        });
        await Store.get("leaderboard").then( //initialize store to array if need be
            scores => {
                leaderboard = scores;
                if (!leaderboard) {
                    leaderboard = [];
                    Store.save("leaderboard", leaderboard);
                }
            });
        this.props.setLeaderboard(leaderboard);
    }

    render() {
        return this.props.leaderboard ?
            <GameMaster leaderboard={this.props.leaderboard} /> : null;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Propagate);
