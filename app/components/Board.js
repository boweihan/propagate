// NOTE: leaving this as a react component for now

import React from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModeSelector from './ModeSelector';
import Tile from './Tile';
import BoardMenu from './BoardMenu';
import styles from './styles/BoardStyles';
import HelperUtils from './utils/HelperUtils';
import ModeUtils from './utils/ModeUtils';
import SoundUtils from './utils/SoundUtils';
import { ActionCreators } from '../actions';
import Modal from './Modal';

const Width = Dimensions.get('window').width;
const Colors3 = ['#403837', '#7F3B32', '#BE3E2C'];
const Colors2 = ['#403837', '#BE3E2C'];
const ColorsExtra = ['gray'];
const ColorsOverride = ['#403837', '#004d00', '#BE3E2C'];
const Mods = ['grayBlock'];
const Modes = ['square', 'plus', 'cross'];


class Board extends React.Component {
    constructor(props) {
        super();
        this.colors = props.triColorMode ? Colors3 : Colors2;
        this.state = {
            board: props.boardStateCache ? props.boardStateCache : this.buildBoard(props.size, props.moves),
        };
        if (!props.boardStateCache) {
            this.setDisabledTiles(props);
            this.setFlippedTiles(props);
            this.setTriColorTiles(props);
        }
        this.clickTile = this.clickTile.bind(this);
        this.setMode = this.setMode.bind(this);
    }

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
    * Handler for ModeSelector click event
    * @param {String} mode - mode type
    */
    setMode(mode) {
        const modeIndex = Modes.indexOf(mode);
        if (modeIndex !== -1) {
            const newState = this.state;
            newState.board.mode = Modes[modeIndex];
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
        const opacities = HelperUtils.getInitialOpacities(size);
        const tilts = HelperUtils.getInitialTilt(size);
        const tiles = this.getInitialTileState(size, cellSize, cellPadding, opacities, tilts);
        return { size, cellSize, cellPadding, tileSize, opacities, tilts, tiles, movesLeft, mode: Modes[0] };
    }

    /**
    * Handler for Tile click event
    * @param {Int} id - index of the clicked Tile
    */
    clickTile(id) {
        if (this.state.board.tiles[id].mods.indexOf(Mods[0]) !== -1) { return; } // return if disabled
        SoundUtils.playFlip();

        const newState = this.state; // ensure that we decrement moves before checking win TODO: refactor
        newState.board.movesLeft -= 1; // decrement moves before we setState later on

        const ids = ModeUtils.getIdsForMode(id, this.state.board.mode, this.state.board.size);
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
            this.props.setModal('levelup');
        } else if (newState.board.movesLeft === 0) {
            this.props.setModal('fail');
        }
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

    render() {
        const that = this;
        const dynamicStyles = this.getDynamicStyles();
        return (
            <View style={styles.game}>
                <View style={styles.boardMenu}>
                    <BoardMenu
                      setCompleteRoute={this.props.setCompleteRoute}
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
                <Modal
                  levelUp={this.props.levelUp}
                  setCompleteRoute={this.props.setCompleteRoute}
                  board={this.state.board}
                />
            </View>
        );
    }
}

Board.propTypes = {
    triColorMode: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    boardStateCache: PropTypes.object,
    setCompleteRoute: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    setModal: PropTypes.func.isRequired,
    levelUp: PropTypes.func.isRequired,
};

Board.defaultProps = {
    boardStateCache: {},
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        level: state.level,
        score: state.score,
        triColorMode: state.triColorMode,
        boardStateCache: state.boardStateCache,
        modal: state.modal,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
