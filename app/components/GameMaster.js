import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Board from './Board';
import LevelPicker from './LevelPicker';
import Menu from './Menu';
import Settings from './Settings';
import Instructions from './Instructions';
import { ActionCreators } from '../actions';
import styles from './styles/GameMasterStyles';
import FadeInView from './wrappers/FadeInView';

class GameMaster extends React.Component {
  render() {
    return (
      <FadeInView style={styles.container}>
        {this.props.routes.menu ? <Menu /> : null}
        {this.props.routes.game ? <Board key={this.props.level} /> : null}
        {this.props.routes.picker ? <LevelPicker /> : null}
        {this.props.routes.instructions ? <Instructions /> : null}
        {this.props.routes.settings ? <Settings /> : null}
      </FadeInView>
    );
  }
}

GameMaster.propTypes = {
  routes: PropTypes.object.isRequired,
  level: PropTypes.number,
};

GameMaster.defaultProps = {
  level: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    routes: state.routes,
    level: state.level,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster);
