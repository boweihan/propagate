import React from 'react';
import styles from './styles/ModeSelectorStyles';
import { Text, View, Animated } from 'react-native';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
const ButtonSize = width > height ? 0.8*(height/3) : 0.8*(width/3);
const RegularTileColors = ['#403837', '#BE3E2C'];

export default class ModeSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            mode : 'SQUARE',
            modeTiles : {
                squareTiles : this.getModeTiles(3, (ButtonSize-20)/3, [0, 1, 2, 3, 4, 5, 6, 7, 8]),
                plusTiles : this.getModeTiles(3, (ButtonSize-20)/3, [1, 3, 4, 5, 7]),
                crossTiles : this.getModeTiles(3, (ButtonSize-20)/3, [0, 2, 4, 6, 8])
            },
            squareStyle : styles.active,
            plusStyle : null,
            crossStyle : null
        };
    }

    getModeTiles(size, cellSize, tilesToFlip) {
        let tiles = [];
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                let key = row * size + col;
                let tileColor = RegularTileColors[0];
                if (tilesToFlip && tilesToFlip.indexOf(key) !== -1) {
                    tileColor = RegularTileColors[1];
                }
                let tileStyle = {
                    left: col * cellSize + 1.5,
                    top: row * cellSize + 1.5,
                    backgroundColor: tileColor,
                    position: 'absolute',
                    width: cellSize-3,
                    height: cellSize-3
                };
                tiles.push({key : key, tileStyle : tileStyle});
            }
        }
        return tiles;
    }
    render() {
        return (
            <View>
                <View style={styles.selectedMode}>
                    <Text style={styles.selectedModeText}>CURRENT PATTERN: {this.state.mode}</Text>
                </View>
                <View style={styles.modes}>
                    <Animated.View style={[styles.selectors, this.state.squareStyle]}
                        onStartShouldSetResponder={() => this.selectMode('square')}>
                        {this.state.modeTiles.squareTiles.map(function(tile, i){
                            return <View key={tile.key} style={tile.tileStyle}></View>
                        })}
                    </Animated.View>
                    <Animated.View style={[styles.selectors, this.state.plusStyle]}
                        onStartShouldSetResponder={() => this.selectMode('plus')}>
                        {this.state.modeTiles.plusTiles.map(function(tile, i){
                            return <View key={tile.key} style={tile.tileStyle}></View>
                        })}
                    </Animated.View>
                    <Animated.View style={[styles.selectors, this.state.crossStyle]}
                        onStartShouldSetResponder={() => this.selectMode('cross')}>
                        {this.state.modeTiles.crossTiles.map(function(tile, i){
                            return <View key={tile.key} style={tile.tileStyle}></View>
                        })}
                    </Animated.View>
                </View>
            </View>
        );
    }

    selectMode(mode) {
        let newState = {
            mode : 'SQUARE',
            squareStyle : null,
            plusStyle : null,
            crossStyle : null
        }
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
        }
        this.setState(newState);
        this.props.setMode(mode);
    }
}
