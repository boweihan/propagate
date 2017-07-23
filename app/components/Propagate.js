import React from 'react';
import { Font } from 'expo';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions';
import GameMaster from './GameMaster';

const NukamisoLite = require('../assets/fonts/NukamisoLite.ttf');
const MontserratBold = require('../assets/fonts/Montserrat-Bold.ttf');
const MontserratRegular = require('../assets/fonts/Montserrat-Regular.ttf');

class Propagate extends React.Component {
    async componentDidMount() {
        let startingLevel;
        let highestLevel;
        await Font.loadAsync({ NukamisoLite });
        await Font.loadAsync({ MontserratBold });
        await Font.loadAsync({ MontserratRegular });
        await Store.get('highestLevel').then(
            (level) => {
                highestLevel = level;
                if (!highestLevel) {
                    highestLevel = 1;
                    Store.save('highestLevel', highestLevel);
                }
            });
        if (highestLevel < startingLevel) { highestLevel = startingLevel; } // redundant check, but useful
        this.props.setHighestLevel(highestLevel);
    }

    render() {
        return this.props.highestLevel ?
            <GameMaster /> : null;
    }
}

Propagate.propTypes = {
    setHighestLevel: PropTypes.func.isRequired,
    highestLevel: PropTypes.number,
};

Propagate.defaultProps = {
    highestLevel: null,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        highestLevel: state.highestLevel,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Propagate);
