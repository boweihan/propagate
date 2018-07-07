import React from 'react';
import { View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModeSelector from './ModeSelector';
import Tile from './Tile';
import BoardMenu from './BoardMenu';
import styles from './styles/BoardStyles';
import BoardUtils from '../utils/BoardUtils';
import ModeUtils from '../utils/ModeUtils';
import SoundUtils from '../utils/SoundUtils';
import LevelUtils from '../utils/LevelUtils';
import { ActionCreators } from '../actions';
import Modal from './Modal';
import FadeInView from './wrappers/FadeInView';

const Colors3 = ['#403837', '#7F3B32', '#BE3E2C'];
const Colors2 = ['#403837', '#BE3E2C'];
const ColorsExtra = ['gray'];
const ColorsOverride = ['#403837', '#004d00', '#BE3E2C'];
const Mods = ['grayBlock'];
const Modes = ['SQUARE', 'PLUS', 'CROSS'];

class Board extends React.Component {
  constructor(props) {
    super();
    const levelSpec = LevelUtils.getLevelSpecs(props.level);
    this.colors = props.triColorMode ? Colors3 : Colors2;
    this.state = {
      board: props.boardStateCache
        ? props.boardStateCache
        : BoardUtils.buildBoard(
            levelSpec.size,
            levelSpec.moves,
            this.colors,
            props.mode.activeMode,
          ),
    };
    if (!props.boardStateCache) {
      this.setInitialBoardState(levelSpec.initialBoard);
    }
    this.clickTile = this.clickTile.bind(this);
    this.setBoardMode = this.setBoardMode.bind(this);
  }

  setInitialBoardState(initialBoard) {
    Object.keys(initialBoard).forEach(key => {
      const tile = this.state.board.tiles[key];
      if (initialBoard[key] === 'd') {
        // disabled
        tile.mods.push(Mods[0]);
        tile.tileStyle.backgroundColor = ColorsExtra[0];
      } else if (initialBoard[key] === 'f') {
        // flipped
        tile.tileStyle.backgroundColor = this.colors[this.colors.length - 1];
      } else if (initialBoard[key] === 't') {
        // triColor
        tile.colorsOverride = ColorsOverride;
        tile.tileStyle.borderWidth = 6;
        tile.tileStyle.borderColor = 'gray';
      }
    });
  }

  setBoardMode(mode) {
    const modeIndex = Modes.indexOf(mode);
    if (modeIndex !== -1) {
      const newState = this.state;
      newState.board.mode = Modes[modeIndex];
      this.setState(newState);
    }
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
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#403837',
      },
    };
  }

  clickTile(id) {
    if (this.state.board.tiles[id].mods.indexOf(Mods[0]) !== -1) {
      return;
    } // return if disabled
    SoundUtils.playFlip();

    const newState = this.state; // ensure that we decrement moves before checking win TODO: refactor
    newState.board.movesLeft -= 1; // decrement moves before we setState later on

    const ids = ModeUtils.getIdsForMode(
      id,
      this.state.board.mode,
      this.state.board.size,
    );
    for (let i = 0; i < ids.length; i += 1) {
      const tile = this.state.board.tiles[ids[i]];
      if (tile.mods.indexOf(Mods[0]) === -1) {
        // don't change color if there's a gray mod
        this.triggerTileAnimation(ids[i]).start();
      }
    }
    this.triggerColorChange(ids, newState);
  }

  didWin(newState) {
    let won = true;
    const size = this.state.board.size;
    for (let i = 0; i < size * size; i += 1) {
      const tile = this.state.board.tiles[i];
      if (
        tile.tileStyle.backgroundColor !==
          this.colors[this.colors.length - 1] &&
        tile.mods.indexOf(Mods[0]) === -1
      ) {
        // not red or disabled, you don't win
        won = false;
      }
    }
    if (won) {
      if (LevelUtils.getMaxLevel() === this.props.level) {
        this.props.setModal('won');
      } else {
        this.props.setModal('levelup');
      }
    } else if (newState.board.movesLeft === 0) {
      this.props.setModal('fail');
    }
  }

  triggerColorChange(ids, newState) {
    const newerState = newState;
    for (let i = 0; i < ids.length; i += 1) {
      const tile = this.state.board.tiles[ids[i]];
      if (tile.mods.indexOf(Mods[0]) === -1) {
        // not disabled, trigger color change
        const currColor = tile.tileStyle.backgroundColor;
        const colors = tile.colorsOverride ? tile.colorsOverride : this.colors;
        const currIndex = colors.indexOf(currColor);
        const newIndex = currIndex === colors.length - 1 ? 0 : currIndex + 1;
        newerState.board.tiles[ids[i]].tileStyle.backgroundColor =
          colors[newIndex];
      }
    }
    this.setState(newerState);
    this.didWin(newerState);
  }

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
      <FadeInView style={styles.game}>
        <View style={styles.boardMenu}>
          <BoardMenu
            movesLeft={this.state.board.movesLeft}
            level={this.props.level}
            score={this.props.score}
            board={this.state.board}
            setCompleteRoute={this.props.setCompleteRoute}
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
            setBoardMode={this.setBoardMode}
          />
        </View>
        <Modal board={this.state.board} />
      </FadeInView>
    );
  }
}

Board.propTypes = {
  triColorMode: PropTypes.bool.isRequired,
  boardStateCache: PropTypes.object,
  level: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired,
  mode: PropTypes.object.isRequired,
  setCompleteRoute: PropTypes.func.isRequired,
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
    mode: state.mode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
