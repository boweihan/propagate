import React from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/ModeSelectorStyles';

const { width, height } = Dimensions.get('window');
const ButtonSize = width > height ? 0.8 * (height / 3) : 0.8 * (width / 3);
const RegularTileColors = ['#403837', '#BE3E2C'];

export default class ModeSelector extends React.Component {
    static getModeTiles(size, cellSize, tilesToFlip) {
        const tiles = [];
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                const key = (row * size) + col;
                let tileColor = RegularTileColors[0];
                if (tilesToFlip && tilesToFlip.indexOf(key) !== -1) {
                    tileColor = RegularTileColors[1];
                }
                const tileStyle = {
                    left: (col * cellSize) + 1.5,
                    top: (row * cellSize) + 1.5,
                    backgroundColor: tileColor,
                    position: 'absolute',
                    width: cellSize - 3,
                    height: cellSize - 3,
                };
                tiles.push({ key, tileStyle }); // shorthand notation
            }
        }
        return tiles;
    }

    constructor() {
        super();
        this.state = {
            mode: 'SQUARE',
            modeTiles: {
                squareTiles: ModeSelector.getModeTiles(3, (ButtonSize - 20) / 3, [0, 1, 2, 3, 4, 5, 6, 7, 8]),
                plusTiles: ModeSelector.getModeTiles(3, (ButtonSize - 20) / 3, [1, 3, 4, 5, 7]),
                crossTiles: ModeSelector.getModeTiles(3, (ButtonSize - 20) / 3, [0, 2, 4, 6, 8]),
            },
            squareStyle: styles.active,
            plusStyle: null,
            crossStyle: null,
        };
    }

    selectMode(mode) {
        const newState = {
            mode: 'SQUARE',
            squareStyle: null,
            plusStyle: null,
            crossStyle: null,
        };
        switch (mode) {
        case 'square':
            newState.squareStyle = styles.active;
            newState.mode = 'SQUARE';
            break;
        case 'plus':
            newState.plusStyle = styles.active;
            newState.mode = 'PLUS';
            break;
        case 'cross':
            newState.crossStyle = styles.active;
            newState.mode = 'CROSS';
            break;
        default:
            break;
        }
        this.setState(newState);
        this.props.setMode(mode);
    }

    render() {
        return (
            <View>
                <View style={styles.selectedMode}>
                    <Text style={styles.selectedModeText}>CURRENT PATTERN: {this.state.mode}</Text>
                </View>
                <View style={styles.modes}>
                    <Animated.View
                      style={[styles.selectors, this.state.squareStyle]}
                      onStartShouldSetResponder={() => this.selectMode('square')}
                    >
                        {this.state.modeTiles.squareTiles.map(tile =>
                            <View key={tile.key} style={tile.tileStyle} />,
                        )}
                    </Animated.View>
                    <Animated.View
                      style={[styles.selectors, this.state.plusStyle]}
                      onStartShouldSetResponder={() => this.selectMode('plus')}
                    >
                        {this.state.modeTiles.plusTiles.map(tile =>
                            <View key={tile.key} style={tile.tileStyle} />,
                        )}
                    </Animated.View>
                    <Animated.View
                      style={[styles.selectors, this.state.crossStyle]}
                      onStartShouldSetResponder={() => this.selectMode('cross')}
                    >
                        {this.state.modeTiles.crossTiles.map(tile =>
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
};