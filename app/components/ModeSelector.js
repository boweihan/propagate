import React from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/ModeSelectorStyles';
import ModeUtils from './utils/ModeUtils';
import { ActionCreators } from '../actions';

const { width, height } = Dimensions.get('window');
const ButtonSize = width > height ? 0.8 * (height / 3) : 0.8 * (width / 3);
const SquarePattern = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const PlusPattern = [1, 3, 4, 5, 7];
const CrossPattern = [0, 2, 4, 6, 8];

class ModeSelector extends React.Component {
    constructor() {
        super();
        this.squareTiles = ModeUtils.getModeTiles(3, (ButtonSize - 20) / 3, SquarePattern);
        this.plusTiles = ModeUtils.getModeTiles(3, (ButtonSize - 20) / 3, PlusPattern);
        this.crossTiles = ModeUtils.getModeTiles(3, (ButtonSize - 20) / 3, CrossPattern);
    }

    selectMode(mode) {
        this.props.setMode(mode);
        this.props.setBoardMode(mode);
    }

    render() {
        return (
            <View>
                <View style={styles.selectedMode}>
                    <View style={styles.selectedModeHelp}>
                        <Text style={styles.selectedModeText}>Pick a flipping mode</Text>
                    </View>
                </View>
                <View style={styles.modes}>
                    <Animated.View
                      style={[styles.selectors, this.props.mode.squareStyle]}
                      onStartShouldSetResponder={() => this.selectMode('square')}
                    >
                        {this.squareTiles.map(tile =>
                            <View key={tile.key} style={tile.tileStyle} />,
                        )}
                    </Animated.View>
                    <Animated.View
                      style={[styles.selectors, this.props.mode.plusStyle]}
                      onStartShouldSetResponder={() => this.selectMode('plus')}
                    >
                        {this.plusTiles.map(tile =>
                            <View key={tile.key} style={tile.tileStyle} />,
                        )}
                    </Animated.View>
                    <Animated.View
                      style={[styles.selectors, this.props.mode.crossStyle]}
                      onStartShouldSetResponder={() => this.selectMode('cross')}
                    >
                        {this.crossTiles.map(tile =>
                            <View key={tile.key} style={tile.tileStyle} />,
                        )}
                    </Animated.View>
                </View>
            </View>
        );
    }
}

ModeSelector.propTypes = {
    setMode: PropTypes.func.isRequired,
    setBoardMode: PropTypes.func.isRequired,
    mode: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        mode: state.mode,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelector);
