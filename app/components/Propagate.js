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
        await Font.loadAsync({ NukamisoLite });
        await Font.loadAsync({ MontserratBold });
        await Font.loadAsync({ MontserratRegular });
        await Store.get('level').then(
            (level) => {
                startingLevel = level;
                if (!startingLevel) {
                    startingLevel = 1;
                    Store.save('level', startingLevel);
                }
            });
        this.props.setLevel(startingLevel);
    }

    render() {
        return this.props.level ?
            <GameMaster /> : null;
    }
}

Propagate.propTypes = {
    setLevel: PropTypes.func.isRequired,
    level: PropTypes.number,
};

Propagate.defaultProps = {
    level: null, // needs to start as null to prevent rendering before font load
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        level: state.level,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Propagate);
