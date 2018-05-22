import React from 'react';
import { Font } from 'expo';
import Store from 'react-native-simple-store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions';
import GameMaster from './GameMaster';

const NukamisoLite = require('../assets/fonts/NukamisoLite.ttf');
const MontserratBold = require('../assets/fonts/Montserrat-Bold.ttf');
const MontserratRegular = require('../assets/fonts/Montserrat-Regular.ttf');

class Propagate extends React.Component {
  static async loadFonts() {
    await Font.loadAsync({ NukamisoLite });
    await Font.loadAsync({ MontserratBold });
    await Font.loadAsync({ MontserratRegular });
  }

  async componentDidMount() {
    await Propagate.loadFonts();
    await this.loadGameState();
  }

  async loadGameState() {
    let highestLevel;
    let levelRatings;
    await Store.get('highestLevel').then(level => {
      highestLevel = level;
      if (!highestLevel) {
        highestLevel = 1;
        Store.save('highestLevel', highestLevel);
      }
    });
    this.props.setHighestLevel(highestLevel);
    await Store.get('levelRatings').then(ratings => {
      levelRatings = ratings;
      if (!levelRatings) {
        levelRatings = {};
        Store.save('levelRatings', levelRatings);
      }
    });
    this.props.setLevelRatings(levelRatings);
  }

  render() {
    return this.props.highestLevel && this.props.levelRatings ? (
      <GameMaster />
    ) : null;
  }
}

Propagate.propTypes = {
  setHighestLevel: PropTypes.func.isRequired, // eslint-disable-line
  highestLevel: PropTypes.number,
  setLevelRatings: PropTypes.func.isRequired,
  levelRatings: PropTypes.object,
};

Propagate.defaultProps = {
  highestLevel: null,
  levelRatings: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    highestLevel: state.highestLevel,
    levelRatings: state.levelRatings,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Propagate);
