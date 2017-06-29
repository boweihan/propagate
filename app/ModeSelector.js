import React from 'react';
import { StyleSheet, Text, View, Animated} from 'react-native';
import Dimensions from 'Dimensions';

export default class ModeSelector extends React.Component {
  constructor() {
    super()
    // "global" vars
    let {width, height} = Dimensions.get('window');
    this.buttonsize = width > height ? 0.8*(height/3) : 0.8*(width/3);
    this.regularTileColors = ['#403837', '#BE3E2C'];

    this.state = {
      mode : 'SQUARE',
      modeTiles : {
        squareTiles : this.getModeTiles(3, (this.buttonsize-20)/3, [0, 1, 2, 3, 4, 5, 6, 7, 8]),
        plusTiles : this.getModeTiles(3, (this.buttonsize-20)/3, [1, 3, 4, 5, 7]),
        crossTiles : this.getModeTiles(3, (this.buttonsize-20)/3, [0, 2, 4, 6, 8])
      },
      squareStyle : this.getDynamicStyles().active,
      plusStyle : null,
      crossStyle : null
    }
  }

  getModeTiles(size, cellSize, tilesToFlip) {
    let tiles = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let key = row * size + col;
        let tileColor = this.regularTileColors[0];
        if (tilesToFlip && tilesToFlip.indexOf(key) !== -1) {
          tileColor = this.regularTileColors[1];
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
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View>
        <View style={dynamicStyles.selectedMode}>
          <Text style={dynamicStyles.selectedModeText}>FLIP PATTERN: {this.state.mode}</Text>
        </View>
        <View style={dynamicStyles.modes}>
          <Animated.View style={[dynamicStyles.selectors, this.state.squareStyle]}
            onStartShouldSetResponder={() => this.selectMode('square')}>
            {this.state.modeTiles.squareTiles.map(function(tile, i){
              return <View key={tile.key} style={tile.tileStyle}></View>
            })}
          </Animated.View>
          <Animated.View style={[dynamicStyles.selectors, this.state.plusStyle]}
            onStartShouldSetResponder={() => this.selectMode('plus')}>
            {this.state.modeTiles.plusTiles.map(function(tile, i){
              return <View key={tile.key} style={tile.tileStyle}></View>
            })}
          </Animated.View>
          <Animated.View style={[dynamicStyles.selectors, this.state.crossStyle]}
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
    let dynamicStyles = this.getDynamicStyles();
    let newState = {
      mode : 'SQUARE',
      squareStyle : null,
      plusStyle : null,
      crossStyle : null
    }
    switch (mode) {
      case 'square':
        newState.squareStyle = dynamicStyles.active;
        newState.mode = 'SQUARE';
        break;
      case 'plus':
        newState.plusStyle = dynamicStyles.active;
        newState.mode = 'PLUS';
        break;
      case 'cross':
        newState.crossStyle = dynamicStyles.active;
        newState.mode = 'CROSS';
        break;
    }
    this.setState(newState);
    this.props.setMode(mode);
  }

  getDynamicStyles() {
    return {
      active: {
        borderWidth: 10,
        borderRadius: 4,
        borderColor: 'white',
        backgroundColor: 'white',
        opacity: 1
      },
      selectors: {
        borderWidth: 10,
        borderRadius: 4,
        borderColor: '#d6d7da',
        opacity: 0.7,
        width: this.buttonsize,
        height: this.buttonsize,
        margin: this.buttonsize*0.1
      },
      modes: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
      selectedMode: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      selectedModeText: {
        fontWeight: 'bold'
      }
    }
  }
}
