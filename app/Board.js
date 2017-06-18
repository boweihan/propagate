import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing } from 'react-native';
import Dimensions from 'Dimensions';
import ModeSelector from './ModeSelector';
import Tile from './Tile';

// get device dimensions
let {width, height} = Dimensions.get('window');
let COLORS = ['#403837', '#BE3E2C'];
let MODES = ['square', 'plus', 'cross'];

export default class Board extends React.Component {
  constructor(props) {
    super();
    this.state = {
        board : this.buildBoard(props.size),
        mode : MODES[0]
    }
    this.clickTile = this.clickTile.bind(this);
    this.setMode = this.setMode.bind(this);
  }

/* ----------------------------- initialization logic ------------------------*/
  // build board given a board size N (n x n board)
  buildBoard(size) {
    let cell_size = 0.8*width * 1/size;
    let cell_padding = cell_size * 0.05;
    let border_radius = cell_padding * 2;
    let title_size = cell_size - cell_padding * 2;
    let opacities = this.getInitialOpacities(size);
    let tilts = this.getInitialTilt(size);
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
  getInitialOpacities(size) {
    let opacities = new Array(size * size);
    for (let i = 0; i < opacities.length; i++) {
      opacities[i] = new Animated.Value(1);
    }
    return opacities;
  }

  // tile tilt
  getInitialTilt(size) {
    let tilt = new Array(size * size);
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
        let tileStyle = {
          left: col * cell_size + cell_padding,
          top: row * cell_size + cell_padding,
          opacity: opacities[key],
          transform: [{perspective: cell_size * 8},
                      {rotateX: tilt}],
          backgroundColor: COLORS[0] // set initial color to be green;
        };
        tiles.push({key : key, tileStyle : tileStyle});
      }
    }
    return tiles;
  }

  resetInitialState() {
    let newState = {
      board : this.buildBoard(this.state.board.size)
    }
    this.setState(newState);
  }

/* ----------------------------- board drawing logic -------------------------*/
  render() {
    let that = this;
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View style={styles.game}>
        <View style={styles.board}>
          <View style={dynamicStyles.container}>
            {this.state.board.tiles.map(function(tile, i){
              return <Tile key={tile.key} id={tile.key} style={[dynamicStyles.tile, tile.tileStyle]} clickTile={that.clickTile}/>
            })}
          </View>
        </View>
        <View style={styles.menu}>
          <ModeSelector style={styles.modeSelector} setMode={this.setMode}/>
        </View>
      </View>
    );
  }

/* ----------------------------- game logic ----------------------------------*/
  clickTile(id) {
    let ids;

    switch (this.state.mode) {
      case MODES[0]:
        ids = this.squareModeClickHandler(id);
        break;
      case MODES[1]:
        ids = this.plusModeClickHandler(id);
        break;
      case MODES[2]:
        ids = this.crossModeClickHandler(id);
        break;
      default:
        alert('that mode is unsupported');
        break;
    }

    for (let i = 0; i < ids.length; i++) {
      this.triggerTileAnimation(ids[i]);
      this.triggerColorChange(ids[i]);
    }
  }

  setMode(mode) {
    let modeIndex = MODES.indexOf(mode);
    if (modeIndex !== -1) {
      this.setState({
        mode : MODES[modeIndex]
      });
    }
  }

  didWin() {
      let size = this.state.board.size;
      for (var i = 0; i < (size * size); i++) {
          if (this.state.board.tiles[i].tileStyle.backgroundColor !== "#BE3E2C") {
              return false;
          }
      }
      return true;
  }

  // TODO: refactors all these handlers
  buildClickHandlerVars(id) {
    size = this.state.board.size;
    return [[id], size, id % size, Math.floor(id / size)];
  }

  plusModeClickHandler(id) {
    let [ids, size, xPos, yPos] = this.buildClickHandlerVars(id);

    if (yPos === 0) {
      if (xPos === 0) { ids = ids.concat([id + 1, id + size]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id + size]); }
      else { ids = ids.concat([id - 1, id + size]); }
    } else if (yPos < size - 1) {
      if (xPos === 0) { ids = ids.concat([id + 1, id + size, id - size]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id + size, id - size]); }
      else { ids = ids.concat([id - 1, id + size, id - size]); }
    } else {
      if (xPos === 0) { ids = ids.concat([id + 1, id - size]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id - size]); }
      else { ids = ids.concat([id - 1, id - size]); }
    }

    return ids;
  }

  squareModeClickHandler(id) {
    let [ids, size, xPos, yPos] = this.buildClickHandlerVars(id);

    if (yPos === 0) {
      if (xPos === 0) { ids = ids.concat([id + 1, id + size, id + size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id + size, id + size - 1, id + size + 1]); }
      else { ids = ids.concat([id - 1, id + size, id + size - 1]); }
    } else if (yPos < size - 1) {
      if (xPos === 0) { ids = ids.concat([id + 1, id + size, id - size, id + size + 1, id - size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id + size, id - size, id + size - 1, id + size + 1, id - size - 1, id - size + 1]); }
      else { ids = ids.concat([id - 1, id + size, id - size, id - size - 1, id + size - 1]); }
    } else {
      if (xPos === 0) { ids = ids.concat([id + 1, id - size, id - size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id - 1, id + 1, id - size, id - size - 1, id - size + 1]); }
      else { ids = ids.concat([id - 1, id - size, id - size - 1]); }
    }

    return ids;
  }

  crossModeClickHandler(id) {
    let [ids, size, xPos, yPos] = this.buildClickHandlerVars(id);

    if (yPos === 0) {
      if (xPos === 0) { ids = ids.concat([id + size - 1, id + size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id + size - 1, id + size + 1]); }
      else { ids = ids.concat([id + size - 1]); }
    } else if (yPos < size - 1) {
      if (xPos === 0) { ids = ids.concat([id + size + 1, id - size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id + size - 1, id + size + 1, id - size - 1, id - size + 1]); }
      else { ids = ids.concat([id - size - 1, id + size - 1]); }
    } else {
      if (xPos === 0) { ids = ids.concat([id - size + 1]); }
      else if (xPos < size - 1) { ids = ids.concat([id - size - 1, id - size + 1]); }
      else { ids = ids.concat([id - size - 1]); }
    }

    return ids;
  }

/* ----------------------------- animations ----------------------------------*/
  triggerColorChange(id) {
    let currColor = this.state.board.tiles[id].tileStyle.backgroundColor;
    let currIndex = COLORS.indexOf(currColor);
    let newIndex = (currIndex === COLORS.length - 1) ? 0 : currIndex + 1;
    let newState = this.state;
    newState.board.tiles[id].tileStyle.backgroundColor = COLORS[newIndex];
    this.setState(newState);
  }

  triggerTileAnimation(id) {
    var that = this;
    let opacity = this.state.board.opacities[id];
    let tilt = this.state.board.tilts[id];
    opacity.setValue(.5); // half transparent, half opaque
    tilt.setValue(2);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // fully opaque
        duration: 450, // milliseconds
      }),
      Animated.timing(tilt, {
        toValue: 0, // mapped to 0 degrees (no tilt)
        duration: 450, // milliseconds
        easing: Easing.quad // quadratic easing function: (t) => t * t
      })
    ]).start(function() {
      // check win condition in the callback to animation to avoid intermediate states
      if (that.didWin()) {
        that.resetInitialState();
      }
    });
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
        backgroundColor: '#403837',
      }
    }
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({
  board: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  menu: {
    flex: 1,
    justifyContent: 'center'
  },
  game: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CECDCD',
  }
});
