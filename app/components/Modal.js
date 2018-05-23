import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators } from '../actions';
import styles from './styles/ModalStyles';

class FullScreenModal extends React.Component {
  hideModal() {
    if (this.props.modal.type === 'fail') {
      this.props.setCompleteRoute('gameOver', this.props.boardStateCache);
    } else if (this.props.modal.type === 'levelup') {
      this.props.levelUp(
        this.props.board.movesLeft,
        this.props.levelRatings,
        this.props.level,
        this.props.highestLevel,
      );
    } else if (this.props.modal.type === 'won') {
      this.props.levelUp(
        this.props.board.movesLeft,
        this.props.levelRatings,
        this.props.level,
        this.props.highestLevel,
      );
      this.props.setCompleteRoute('won', this.props.boardStateCache);
    }
  }

  render() {
    const opacity = this.props.modal.type === 'levelup' ? 0.9 : 1;
    return (
      <Modal
        isVisible={this.props.modal.visible}
        backdropColor={this.props.modal.color}
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
            <Text style={[styles.modalMsg, { color: this.props.modal.color }]}>
              {this.props.modal.msg}
            </Text>
          </View>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              this.hideModal();
            }}
          >
            <Ionicons
              style={styles.modalClose}
              name="md-arrow-dropright-circle"
            />
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}

FullScreenModal.propTypes = {
  modal: PropTypes.object.isRequired,
  setCompleteRoute: PropTypes.func.isRequired,
  levelUp: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  boardStateCache: PropTypes.object,
  level: PropTypes.number.isRequired,
  highestLevel: PropTypes.number.isRequired,
  levelRatings: PropTypes.object.isRequired,
};

FullScreenModal.defaultProps = {
  boardStateCache: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    modal: state.modal,
    boardStateCache: state.boardStateCache,
    levelRatings: state.levelRatings,
    level: state.level,
    highestLevel: state.highestLevel,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenModal);
