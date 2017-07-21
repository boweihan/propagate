import React from 'react';
import { Text, View, Animated, Easing, TouchableHighlight, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line
import PropTypes from 'prop-types';
import ModeSelector from './ModeSelector';
import Tile from './Tile';
import BoardMenu from './BoardMenu';
import styles from './styles/BoardStyles';

const flipSound = require('../assets/sounds/flipSoft.mp3');

const Width = Dimensions.get('window').width;
const Colors3 = ['#403837', '#7F3B32', '#BE3E2C'];
const Colors2 = ['#403837', '#BE3E2C'];
const ColorsExtra = ['gray'];
const ColorsOverride = ['#403837', '#004d00', '#BE3E2C'];
const Mods = ['grayBlock'];


export default class Board extends React.Component {
    /**
    * Create an array of Animated() values to use for opacity
    * @param {Int} size - width/height of cubic board
    */
    static getInitialOpacities(size) {
        const opacities = new Array(size * size);
        for (let i = 0; i < opacities.length; i += 1) { opacities[i] = new Animated.Value(1); }
        return opacities;
    }

    /**
    * Create an array of Animated() values to use for tilt
    * @param {Int} size - width/height of cubic board
    */
    static getInitialTilt(size) {
        const tilt = new Array(size * size);
        for (let i = 0; i < tilt.length; i += 1) { tilt[i] = new Animated.Value(0); }
        return tilt;
    }

    constructor(props) {
        super();
        this.colors = props.triColor ? Colors3 : Colors2;
        this.modes = ['square', 'plus', 'cross'];
        this.soundArray = [];
        this.state = {
            board: props.boardStateCache ? props.boardStateCache : this.buildBoard(props.size, props.moves),
            modal: {
                visible: false,
                msg: null,
                color: null,
                type: null,
            },
        };
        if (!props.boardStateCache) {
            this.setDisabledTiles(props);
            this.setFlippedTiles(props);
            this.setTriColorTiles(props);
        }
        this.clickTile = this.clickTile.bind(this);
        this.setMode = this.setMode.bind(this);
        this.soundCallback = this.soundCallback.bind(this);
    }

    /**
    * Set disabled tiles on initialization
    * @param {object} props - react props
    */
    setDisabledTiles(props) {
        let numTilesToDisable;
        if (props.level % 8 === 4) {
            numTilesToDisable = props.level / 5;
        } else if (props.level % 8 > 4 || props.level % 8 === 0) {
            numTilesToDisable = (Math.floor(props.level / 5)) * 2;
        }
        for (let i = 0; i < numTilesToDisable; i += 1) {
            const tileId = Math.floor(Math.random() * this.state.board.tiles.length);
            const tile = this.state.board.tiles[tileId];
            tile.mods.push(Mods[0]);
            tile.tileStyle.backgroundColor = ColorsExtra[0];
        }
    }

    /**
    * Set flipped tiles on initialization
    * @param {object} props - react props
    */
    setFlippedTiles(props) {
        if (props.level % 8 !== 1) {
            let numTilesToMutate = (props.level % 8) * (props.level / 8) * 0.5;
            if (numTilesToMutate < 1) { numTilesToMutate = 1; }
            if (props.level % 8 === 0) { numTilesToMutate = (1 * props.level) / 8; } // custom logic for levels with multiples of 8, fixme
            while (numTilesToMutate > 0) {
                const tileId = Math.floor(Math.random() * this.state.board.tiles.length);
                const tile = this.state.board.tiles[tileId];
                if (tile.mods.indexOf(Mods[0]) === -1) { // not disabled, so flip
                    tile.tileStyle.backgroundColor = this.colors[this.colors.length - 1];
                    numTilesToMutate -= 1;
                }
            }
        }
    }

    /**
    * Set tiles with an extra color
    * @param {object} props - react props
    */
    setTriColorTiles(props) {
        let numTilesToEnhance;
        if (props.level % 8 === 6) {
            numTilesToEnhance = Math.floor(props.level / 6);
        } else if (props.level % 8 > 6 || props.level * 8 === 0) {
            numTilesToEnhance = (Math.floor(props.level / 7)) * 2;
        }
        while (numTilesToEnhance > 0) {
            const tileId = Math.floor(Math.random() * this.state.board.tiles.length);
            const tile = this.state.board.tiles[tileId];
            if (tile.mods.indexOf(Mods[0]) === -1) { // not disabled, so enhance
                tile.colorsOverride = ColorsOverride;
                tile.tileStyle.borderWidth = 6;
                tile.tileStyle.borderColor = 'gray';
                numTilesToEnhance -= 1;
            }
        }
    }

    /**
    * Helper to get ids of Tiles to change after clickTile event
    * @param {Int} id - index of the clicked Tile
    */
    getIdsForMode(id) {
        let ids;
        switch (this.state.board.mode) {
        case this.modes[0]:
            ids = this.squareModeClickHandler(id); break;
        case this.modes[1]:
            ids = this.plusModeClickHandler(id); break;
        case this.modes[2]:
            ids = this.crossModeClickHandler(id); break;
        default:
            break;
        }
        return ids;
    }

    /**
    * Handler for ModeSelector click event
    * @param {String} mode - mode type
    */
    setMode(mode) {
        const modeIndex = this.modes.indexOf(mode);
        if (modeIndex !== -1) {
            const newState = this.state;
            newState.board.mode = this.modes[modeIndex];
            this.setState(newState);
        }
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
        const tiles = [];
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                const key = (row * size) + col;
                const tileStyle = { // tile styling
                    left: (col * cellSize) + cellPadding,
                    top: (row * cellSize) + cellPadding,
                    opacity: opacities[key],
                    transform: [{ perspective: cellSize * 100 }, { rotateX: tilts[key].interpolate({
                        inputRange: [0, 1], outputRange: ['0deg', '-90deg'] }) }],
                    backgroundColor: this.colors[0],
                };
                const mods = []; // extra classes for additional behaviour
                tiles.push({ key, tileStyle, mods, colorsOverride: null });
            }
        }
        return tiles;
    }

    getDynamicStyles() {
        return {
            container: {
                width: this.state.board.cellSize * this.state.board.size,
                height: this.state.board.cellSize * this.state.board.size,
                backgroundColor: 'transparent',
            },
            tile: {
                position: 'absolute',
                width: this.state.board.tileSize,
                height: this.state.board.tileSize,
                borderRadius: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#403837',
            },
        };
    }

    /**
    * Build board on initialization
    * @param {Int} size - width/height of cubic board
    * @param {Int} movesLeft - moves allowed for level
    */
    buildBoard(size, movesLeft) {
        const cellSize = (0.8 * Width) / size;
        const cellPadding = cellSize * 0.01;
        const tileSize = cellSize - (cellPadding * 2);
        const opacities = Board.getInitialOpacities(size);
        const tilts = Board.getInitialTilt(size);
        const tiles = this.getInitialTileState(size, cellSize, cellPadding, opacities, tilts);
        return { size, cellSize, cellPadding, tileSize, opacities, tilts, tiles, movesLeft, mode: this.modes[0] };
    }

    /**
    * Handler for Tile click event
    * @param {Int} id - index of the clicked Tile
    */
    clickTile(id) {
        if (this.state.board.tiles[id].mods.indexOf(Mods[0]) !== -1) { return; } // return if disabled
        this.playFlip();

        const newState = this.state; // ensure that we decrement moves before checking win TODO: refactor
        newState.board.movesLeft -= 1; // decrement moves before we setState later on

        const ids = this.getIdsForMode(id);
        for (let i = 0; i < ids.length; i += 1) {
            const tile = this.state.board.tiles[ids[i]];
            if (tile.mods.indexOf(Mods[0]) === -1) { // don't change color if there's a gray mod
                this.triggerTileAnimation(ids[i]).start();
            }
        }
        this.triggerColorChange(ids, newState);
    }

    /**
    * Check win conditions
    * @param {Object} newState - copied state object
    */
    didWin(newState) {
        let won = true;
        const size = this.state.board.size;
        for (let i = 0; i < (size * size); i += 1) {
            const tile = this.state.board.tiles[i];
            if (tile.tileStyle.backgroundColor !== this.colors[this.colors.length - 1] &&
              tile.mods.indexOf(Mods[0]) === -1) { // not red or disabled, you don't win
                won = false;
            }
        }
        if (won) {
            this.renderModal('levelup');
        } else if (newState.board.movesLeft === 0) {
            this.renderModal('fail');
        }
    }

    /**
    * TODO: refactor
    * Helper to build local variables for click handler
    * @param {Int} id - index of the clicked Tile
    */
    buildClickHandlerVars(id) {
        const size = this.state.board.size;
        return [size, id % size, Math.floor(id / size)];
    }

    /**
    * TODO: refactor
    * Click handler for plus mode
    * @param {Int} id - index of the clicked Tile
    */
    plusModeClickHandler(id) {
        let ids = [id];
        const [size, xPos, yPos] = this.buildClickHandlerVars(id);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size]);
            } else {
                ids = ids.concat([id - 1, id + size]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id - size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, id - size]);
            } else {
                ids = ids.concat([id - 1, id + size, id - size]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id - size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id - size]);
            } else {
                ids = ids.concat([id - 1, id - size]);
            }
        }

        return ids;
    }

    /**
    * TODO: refactor
    * Click handler for square mode
    * @param {Int} id - index of the clicked Tile
    */
    squareModeClickHandler(id) {
        let ids = [id];
        const [size, xPos, yPos] = this.buildClickHandlerVars(id);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id + size + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, (id + size) - 1, id + size + 1]);
            } else {
                ids = ids.concat([id - 1, id + size, (id + size) - 1]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id - size, id + size + 1, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, id - size, (id + size) - 1, id + size + 1, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - 1, id + size, id - size, id - size - 1, (id + size) - 1]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id - size, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id - size, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - 1, id - size, id - size - 1]);
            }
        }

        return ids;
    }

    /**
    * TODO: refactor
    * Click handler for cross mode
    * @param {Int} id - index of the clicked Tile
    */
    crossModeClickHandler(id) {
        let ids = [id];
        const [size, xPos, yPos] = this.buildClickHandlerVars(id);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + size + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([(id + size) - 1, id + size + 1]);
            } else {
                ids = ids.concat([(id + size) - 1]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + size + 1, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([(id + size) - 1, id + size + 1, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - size - 1, (id + size) - 1]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([(id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - size - 1]);
            }
        }

        return ids;
    }

    /**
    * Method to trigger color change for a set of Tiles
    * @param {Array<Int>} ids - list of Tile indexes
    * @param {Object} newState - copied state object
    */
    triggerColorChange(ids, newState) {
        const newerState = newState;
        for (let i = 0; i < ids.length; i += 1) {
            const tile = this.state.board.tiles[ids[i]];
            if (tile.mods.indexOf(Mods[0]) === -1) { // not disabled, trigger color change
                const currColor = tile.tileStyle.backgroundColor;
                const colors = tile.colorsOverride ? tile.colorsOverride : this.colors;
                const currIndex = colors.indexOf(currColor);
                const newIndex = (currIndex === colors.length - 1) ? 0 : currIndex + 1;
                newerState.board.tiles[ids[i]].tileStyle.backgroundColor = colors[newIndex];
            }
        }
        this.setState(newerState);
        this.didWin(newerState);
    }

    /**
    * Method to trigger animation for a single Tile
    * @param {Int} id - Tile Index
    */
    triggerTileAnimation(id) {
        const opacity = this.state.board.opacities[id];
        const tilt = this.state.board.tilts[id];
        opacity.setValue(0.5); // half transparent, half opaque
        tilt.setValue(2);
        return Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1, // fully opaque
                duration: 350, // milliseconds
            }),
            Animated.timing(tilt, {
                toValue: 0, // mapped to 0 degrees (no tilt)
                duration: 350, // milliseconds
                easing: Easing.quad, // quadratic easing function: (t) => t * t
            }),
        ]);
    }

    /**
    * Play the flip sound
    */
    async playFlip() {
        await Audio.setIsEnabledAsync(true);
        this.soundArray.push(new Audio.Sound());
        this.soundArray[this.soundArray.length - 1].setCallback(this.soundCallback);
        await this.soundArray[this.soundArray.length - 1].loadAsync(flipSound);
        await this.soundArray[this.soundArray.length - 1].playAsync();
    }

    soundCallback(status) {
        if (status.isLoaded) {
            if (status.didJustFinish && !status.isLooping) {
                if (this.soundArray.length > 0) {
                    this.soundArray[0].unloadAsync();
                    this.soundArray.shift();
                }
            }
        } else if (status.error) {
            // TODO
        }
    }

    /**
    * Return a modal object to be rendered
    * @param {String} msg - modal message
    */
    modal() {
        const opacity = (this.state.modal.type === 'levelup') ? 0.9 : 1;
        return (
            <Modal
              isVisible={this.state.modal.visible}
              backdropColor={this.state.modal.color}
              backdropOpacity={opacity}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
              animationInTiming={200}
              animationOutTiming={200}
              backdropTransitionInTiming={200}
              backdropTransitionOutTiming={200}
            >
                <View>
                    <View style={styles.modal}>
                        <Text style={[styles.modalMsg, { color: this.state.modal.color }]}>{this.state.modal.msg}</Text>
                    </View>
                    <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => { this.hideModal(); }}
                    >
                        <Ionicons style={styles.modalClose} name="md-arrow-dropright-circle" />
                    </TouchableHighlight>
                </View>
            </Modal>
        );
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

    /**
    * TODO: use enum
    * Render the modal based on type
    * @param {String} type - string indicated which type of modal to render
    */
    renderModal(type) {
        switch (type) {
        case 'fail':
            this.setState({ modal: {
                visible: true,
                msg: 'SORRY. OUT OF MOVES.',
                color: '#dd7b6e',
                type: 'fail',
            } }); break;
        case 'levelup':
            this.setState({ modal: {
                visible: true,
                msg: 'LEVEL UP',
                color: '#7AAF29',
                type: 'levelup',
            } }); break;
        default:
            break;
        }
    }

    render() {
        const that = this;
        const dynamicStyles = this.getDynamicStyles();
        return (
            <View style={styles.game}>
                <View style={styles.boardMenu}>
                    <BoardMenu
                      setRoute={this.props.setRoute}
                      movesLeft={this.state.board.movesLeft}
                      level={this.props.level}
                      score={this.props.score}
                      board={this.state.board}
                    />
                </View>
                <View style={styles.board}>
                    <View style={dynamicStyles.container}>
                        {this.state.board.tiles.map(tile => (
                            <Tile
                              key={tile.key}
                              id={tile.key}
                              style={[dynamicStyles.tile, tile.tileStyle]}
                              clickTile={that.clickTile}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.selector}>
                    <ModeSelector
                      style={styles.modeSelector}
                      setMode={this.setMode}
                    />
                </View>
                {this.modal()}
            </View>
        );
    }
}

Board.propTypes = {
    triColor: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    boardStateCache: PropTypes.object,
    setRoute: PropTypes.func.isRequired,
    levelUp: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
};

Board.defaultProps = {
    boardStateCache: {},
};

