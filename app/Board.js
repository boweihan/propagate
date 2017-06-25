import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated,
         Easing, Alert, Button, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import ModeSelector from './ModeSelector';
import Tile from './Tile';
import BoardMenu from './BoardMenu';
import Modal from 'react-native-modal';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';

let {width, height} = Dimensions.get('window');
let COLORS = ['#403837', '#BE3E2C'];
let AUXCOLORS = ['gray'];
let MODS = ["grayBlock"];
let MODES = ['square', 'plus', 'cross'];

export default class Board extends React.Component {
  constructor(props) {
    super();
    this.state = {
      board : props.boardStateCache ? props.boardStateCache : this.buildBoard(props.size, props.moves),
      modal : {
        visible : false,
        msg : null,
        color : null,
        type : null
      }
    }
    this.setDisabledTiles(props);
    this.setFlippedTiles(props);
    this.setTriColorTiles(props);
    this.clickTile = this.clickTile.bind(this);
    this.setMode = this.setMode.bind(this);
  }

/******************************************************************************/
/**************************** Initialization Logic ****************************/
/******************************************************************************/

  /**
  * Set disabled tiles on initialization
  * @param {object} props - react props
  */
  setDisabledTiles(props) {
    let numTilesToDisable;
    if (props.level % 5 == 4) {
      numTilesToDisable = props.level / 5;
    } else if (props.level % 5 == 0) {
      numTilesToDisable = (props.level / 5) * 2;
    }
    for (let i = 0; i < numTilesToDisable; i++) {
      let tileId = Math.floor(Math.random()*this.state.board.tiles.length);
      let tile = this.state.board.tiles[tileId];
      tile.mods.push(MODS[0]);
      tile.tileStyle.backgroundColor = AUXCOLORS[0];
    }
  }

  /**
  * Set flipped tiles on initialization
  * @param {object} props - react props
  */
  setFlippedTiles(props) {
    if (props.level % 5 !== 1) {
      let numTilesToMutate = (props.level % 5) * (props.level / 5);
      if (numTilesToMutate < 1) { numTilesToMutate = 1; }
      while (numTilesToMutate > 0) {
        let tileId = Math.floor(Math.random()*this.state.board.tiles.length);
        let tile = this.state.board.tiles[tileId];
        if (tile.mods.indexOf(MODS[0]) === -1) { // not disabled, so flip
          tile.tileStyle.backgroundColor = COLORS[1];
          numTilesToMutate--;
        }
      }
    }
  }

  /**
  * Set tiles with an extra color
  * @param {object} props - react props
  */
  setTriColorTiles(props) {
    let numTilesToEnhance = 2;
    while (numTilesToEnhance > 0) {
      let tileId = Math.floor(Math.random()*this.state.board.tiles.length);
      let tile = this.state.board.tiles[tileId];
      if (tile.mods.indexOf(MODS[0]) === -1) { // not disabled, so enhance
        tile.colorsOverride = ['#403837', '#7F3B32' ,'#BE3E2C', '#7F3B32'];
        tile.tileStyle.borderWidth = 6;
        tile.tileStyle.borderColor = 'gray';
        numTilesToEnhance--;
      }
    }
  }

  /**
  * Build board on initialization
  * @param {Int} size - width/height of cubic board
  * @param {Int} movesLeft - moves allowed for level
  */
  buildBoard(size, movesLeft) {
    let cellSize = 0.8*width * 1/size;
    let cellPadding = cellSize * 0.01;
    let tile_size = cellSize - cellPadding * 2;
    let opacities = this.getInitialOpacities(size);
    let tilts = this.getInitialTilt(size);
    let tiles = this.getInitialTileState(size, cellSize, cellPadding, opacities, tilts);
    return {
        size : size, cellSize : cellSize, cellPadding : cellPadding,
        tile_size : tile_size, opacities : opacities, tilts : tilts,
        tiles : tiles, movesLeft : movesLeft, mode : MODES[0]
    }
  }

  /**
  * Create an array of Animated() values to use for opacity
  * @param {Int} size - width/height of cubic board
  */
  getInitialOpacities(size) {
    let opacities = new Array(size * size);
    for (let i = 0; i < opacities.length; i++) { opacities[i] = new Animated.Value(1); }
    return opacities;
  }

  /**
  * Create an array of Animated() values to use for tilt
  * @param {Int} size - width/height of cubic board
  */
  getInitialTilt(size) {
    let tilt = new Array(size * size);
    for (let i = 0; i < tilt.length; i++) { tilt[i] = new Animated.Value(0); }
    return tilt;
  }

  /**
  * Set the initial state of a Tile
  * @param {Int} size - width/height of cubic board
  * @param {float} cellSize - Tile cell size
  * @param {float} cellPadding - Tile padding
  * @param {Array<Animated>} opacities - Array of Animated() opacity values
  * @param {Array<Animated>} tilts - Array of Animated() tilt values
  */
  getInitialTileState(size, cellSize, cellPadding, opacities, tilts) {
    let tiles = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let key = row * size + col;
        let tileStyle = { // tile styling
          left: col * cellSize + cellPadding,
          top: row * cellSize + cellPadding,
          opacity: opacities[key],
          transform: [{perspective: cellSize * 100}, {rotateX: tilts[key].interpolate({
                          inputRange: [0, 1], outputRange: ['0deg', '-90deg'] })}],
          backgroundColor: COLORS[0]
        };
        let mods = [] // extra classes for additional behaviour
        tiles.push({key : key, tileStyle : tileStyle, mods: mods, colorsOverride: null});
      }
    }
    return tiles;
  }

/******************************************************************************/
/**************************** Board Drawing Logic *****************************/
/******************************************************************************/

  render() {
    let that = this;
    let dynamicStyles = this.getDynamicStyles();

    return (
      <View style={styles.game}>
        <View style={styles.boardMenu}>
          <BoardMenu setRoute={this.props.setRoute} movesLeft={this.state.board.movesLeft}
            level={this.props.level} score={this.props.score} board={this.state.board}/>
        </View>
        <View style={styles.board}>
          <View style={dynamicStyles.container}>
            {this.state.board.tiles.map(function(tile, i){
              return <Tile key={tile.key} id={tile.key} style={[dynamicStyles.tile, tile.tileStyle]} clickTile={that.clickTile}/>
            })}
          </View>
        </View>
        <View style={styles.selector}>
          <ModeSelector style={styles.modeSelector} setMode={this.setMode}/>
        </View>
        {this.modal()}
      </View>
    );
  }

/******************************************************************************/
/********************************* Game Logic *********************************/
/******************************************************************************/

  /**
  * Handler for Tile click event
  * @param {Int} id - index of the clicked Tile
  */
  clickTile(id) {
    if (this.state.board.tiles[id].mods.indexOf(MODS[0]) !== -1) { return; } // return if disabled
    this.playFlip();

    let newState = this.state; // ensure that we decrement moves before checking win TODO: refactor
    newState.board.movesLeft--; // decrement moves before we setState later on

    let ids = this.getIdsForMode(id);
    for (let i = 0; i < ids.length; i++) {
        let tile = this.state.board.tiles[ids[i]];
        if (tile.mods.indexOf(MODS[0]) === -1) { // don't change color if there's a gray mod
          this._triggerTileAnimation(ids[i]).start();
        }
    }
    this._triggerColorChange(ids, newState);
  }

  /**
  * Handler for ModeSelector click event
  * @param {String} mode - mode type
  */
  setMode(mode) {
    let modeIndex = MODES.indexOf(mode);
    if (modeIndex !== -1) {
      let newState = this.state;
      newState.board.mode = MODES[modeIndex];
      this.setState(newState);
    }
  }

  /**
  * Check win conditions
  * @param {Object} newState - copied state object
  */
  _didWin(newState) {
    let won = true;
    let size = this.state.board.size;
    for (let i = 0; i < (size * size); i++) {
        let tile = this.state.board.tiles[i];
        if (tile.tileStyle.backgroundColor !== COLORS[1] &&
          tile.mods.indexOf(MODS[0]) === -1) { // not black or disabled, you don't win
            won = false;
        }
    }
    if (won) { this.renderModal('levelup'); }
    else if (newState.board.movesLeft === 0) { this.renderModal('fail'); }
  }

  /**
  * Helper to get ids of Tiles to change after clickTile event
  * @param {Int} id - index of the clicked Tile
  */
  getIdsForMode(id) {
    let ids;
    switch (this.state.board.mode) {
      case MODES[0]:
        ids = this._squareModeClickHandler(id); break;
      case MODES[1]:
        ids = this._plusModeClickHandler(id); break;
      case MODES[2]:
        ids = this._crossModeClickHandler(id); break;
      default:
        console.log('that mode is unsupported'); break;
    }
    return ids;
  }

  /**
  * TODO: refactor
  * Helper to build local variables for click handler
  * @param {Int} id - index of the clicked Tile
  */
  buildClickHandlerVars(id) {
    size = this.state.board.size;
    return [[id], size, id % size, Math.floor(id / size)];
  }

  /**
  * TODO: refactor
  * Click handler for plus mode
  * @param {Int} id - index of the clicked Tile
  */
  _plusModeClickHandler(id) {
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

  /**
  * TODO: refactor
  * Click handler for square mode
  * @param {Int} id - index of the clicked Tile
  */
  _squareModeClickHandler(id) {
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

  /**
  * TODO: refactor
  * Click handler for cross mode
  * @param {Int} id - index of the clicked Tile
  */
  _crossModeClickHandler(id) {
    let [ids, size, xPos, yPos] = this.buildClickHandlerVars(id);

    if (yPos === 0) {
      if (xPos === 0) { ids = ids.concat([id + size + 1]); }
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

/******************************************************************************/
/********************************* Animations *********************************/
/******************************************************************************/

  /**
  * Method to trigger color change for a set of Tiles
  * @param {Array<Int>} ids - list of Tile indexes
  * @param {Object} newState - copied state object
  */
  _triggerColorChange(ids, newState) {
    for (let i = 0; i < ids.length; i++) {
      let tile = this.state.board.tiles[ids[i]];
      if (tile.mods.indexOf(MODS[0]) === -1) { // not disabled, trigger color change
        let currColor = tile.tileStyle.backgroundColor;
        let colors = tile.colorsOverride ? tile.colorsOverride : COLORS;
        let currIndex = colors.indexOf(currColor);
        let newIndex = (currIndex === colors.length - 1) ? 0 : currIndex + 1;
        newState.board.tiles[ids[i]].tileStyle.backgroundColor = colors[newIndex];
      }
    }
    this.setState(newState);
    this._didWin(newState);
  }

  /**
  * Method to trigger animation for a single Tile
  * @param {Int} id - Tile Index
  */
  _triggerTileAnimation(id) {
    let opacity = this.state.board.opacities[id];
    let tilt = this.state.board.tilts[id];
    opacity.setValue(.5); // half transparent, half opaque
    tilt.setValue(2);
    return Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // fully opaque
        duration: 350, // milliseconds
      }),
      Animated.timing(tilt, {
        toValue: 0, // mapped to 0 degrees (no tilt)
        duration: 350, // milliseconds
        easing: Easing.quad // quadratic easing function: (t) => t * t
      })
    ]);
  }

/******************************************************************************/
/******************************** Sound Effects *******************************/
/******************************************************************************/

  /**
  * Play the flip sound
  */
  async playFlip() {
    await Audio.setIsEnabledAsync(true);
    const sound = new Audio.Sound();
    await sound.loadAsync(require('./assets/sounds/flipSoft.mp3'));
    await sound.playAsync();
  }

/******************************************************************************/
/****************************** Dynamic Styling *******************************/
/******************************************************************************/

  /**
  * Get Dynamic sizes that adjust with screen dimensions
  */
  getDynamicStyles() {
    return {
      container: {
        width: this.state.board.cellSize * this.state.board.size,
        height: this.state.board.cellSize * this.state.board.size,
        backgroundColor: 'transparent',
      },
      tile: {
        position: 'absolute',
        width: this.state.board.tile_size,
        height: this.state.board.tile_size,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#403837',
      }
    }
  }

/******************************************************************************/
/************************** Modal Rendering Logic *****************************/
/******************************************************************************/

  /**
  * Return a modal object to be rendered
  * @param {String} msg - modal message
  */
  modal(msg) {
    let opacity = (this.state.modal.type === "levelup") ? 0.9 : 1
    return (
      <Modal isVisible={this.state.modal.visible} backdropColor={this.state.modal.color}
        backdropOpacity={opacity} animationIn={'zoomInDown'} animationOut={'zoomOutUp'}
        animationInTiming={200} animationOutTiming={200} backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}>
        <View>
          <View style={styles.modal}>
            <Text style={[styles.modalMsg, {color:this.state.modal.color}]}>{this.state.modal.msg}</Text>
          </View>
          <TouchableHighlight underlayColor='transparent' onPress={() => {this.hideModal()}}>
            <Ionicons style={styles.modalClose} name="md-arrow-dropright-circle" />
          </TouchableHighlight>
        </View>
      </Modal>
    )
  }

  /**
  * TODO: use enum
  * Render the modal based on type
  * @param {String} type - string indicated which type of modal to render
  */
  renderModal(type) {
    switch (type) {
      case 'fail':
        this.setState({modal:{
          visible: true,
          msg: "SORRY. OUT OF MOVES.",
          color: '#dd7b6e',
          type: 'fail'
        }}); break;
      case 'levelup':
        this.setState({modal:{
          visible: true,
          msg: "LEVEL UP",
          color: '#7AAF29',
          type: 'levelup'
        }}); break;
    }
  }

  /**
  * hide modal on click
  */
  hideModal() {
    if (this.state.modal.type === 'fail') {
      this.props.setRoute('gameOver');
    } else { // NOTE: don't need to set modal visible:false because component is reconstructed
      this.props.levelUp(this.state.board.movesLeft);
    }
  }
}

/******************************************************************************/
/******************************* Static Styling *******************************/
/******************************************************************************/

const styles = StyleSheet.create({
  boardMenu: {
    flex: 1
  },
  board: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selector: {
    flex: 1
  },
  game: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#CECDCD',
  },
  modal: {
    backgroundColor: '#b3b3b3',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalMsg: {
    fontSize: 30,
    fontFamily: 'NukamisoLite',
    textAlign: 'center'
  },
  modalClose: {
    textAlign: 'center',
    fontSize: 60,
    marginTop: 20,
    color: '#b3b3b3'
  }
});
