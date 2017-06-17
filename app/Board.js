import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing } from 'react-native';
import Dimensions from 'Dimensions';
import Tile from './Tile';

// get device dimensions
let {width, height} = Dimensions.get('window');

export default class Board extends React.Component {
  constructor(props) {
    super();
    this.state = {
        board : this.buildBoard(props)
    }
    this.clickTile = this.clickTile.bind(this);
  }

/* ----------------------------- initialization logic ------------------------*/
  // build board given a board size N (n x n board)
  buildBoard(props) {
    let size = props.size;
    let cell_size = 0.8*width * 1/size;
    let cell_padding = cell_size * 0.05;
    let border_radius = cell_padding * 2;
    let title_size = cell_size - cell_padding * 2;
    let opacities = this.getInitialOpacities(props);
    let tilts = this.getInitialTilt(props);
    let tiles = this.getInitialTileState(size, cell_size, cell_padding, opacities, tilts);
    return {
        size : size,
        cell_size : cell_size,
        cell_padding : cell_padding,
        border_radius : border_radius,
        title_size : title_size,
        opacities : opacities,
        tilts : tilts,
        tiles : tiles
    }
  }

  // tile opacities
  getInitialOpacities(props) {
    let opacities = new Array(props.size * props.size);
    for (let i = 0; i < opacities.length; i++) {
      opacities[i] = new Animated.Value(1);
    }
    return opacities;
  }

  // tile tilt
  getInitialTilt(props) {
    let tilt = new Array(props.size * props.size);
    for (let i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    return tilt;
  }

  getInitialTileState(size, cell_size, cell_padding, opacities, tilts) {
    let tiles = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let key = row * size + col;
        // add tilt effect to tile
        let tilt = tilts[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        });
        // tile styling
        let position = {
          left: col * cell_size + cell_padding,
          top: row * cell_size + cell_padding,
          opacity: opacities[key],
          transform: [{perspective: cell_size * 8},
                      {rotateX: tilt}]
        };
        tiles.push({key : key, position : position});
      }
    }
    return tiles;
  }

/* ----------------------------- board drawing logic -------------------------*/
  // draw the board based on given board state
  renderBoard() {
    let renderedBoard = [];
    for (let x = 0; x < this.state.board.tiles.length; x++) {
      renderedBoard.push(this.renderTile(this.state.board.tiles[x].key, this.state.board.tiles[x].position));
    }
    return renderedBoard;
  }

  renderTile(id, position) {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <Tile key={id} id={id} style={[dynamicStyles.tile, position]} clickTile={this.clickTile}/>
    )
  }

  render() {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View style={dynamicStyles.container}>
          {this.renderBoard()}
      </View>
    );
  }

/* ----------------------------- game logic ----------------------------------*/
  clickTile(id) {
    this.triggerTileAnimation(id);
  }

/* ----------------------------- animations ----------------------------------*/
  triggerTileAnimation(id) {
    let opacity = this.state.board.opacities[id];
    let tilt = this.state.board.tilts[id];
    opacity.setValue(.5); // half transparent, half opaque
    tilt.setValue(2);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // fully opaque
        duration: 350, // milliseconds
      }),
      Animated.timing(tilt, {
        toValue: 0, // mapped to 0 degrees (no tilt)
        duration: 250, // milliseconds
        easing: Easing.quad // quadratic easing function: (t) => t * t
      })
    ]).start();
  }

/* ----------------------------- dynamic styling -----------------------------*/
  getDynamicStyles() {
    return {
      container: {
        width: this.state.board.cell_size * this.state.board.size,
        height: this.state.board.cell_size * this.state.board.size,
        backgroundColor: 'transparent',
      },
      tile: {
        position: 'absolute',
        width: this.state.board.title_size,
        height: this.state.board.title_size,
        borderRadius: this.state.board.border_radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BEE1D2',
      }
    }
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({

});
