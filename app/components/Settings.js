import React from 'react';
import { Text, View, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Store from 'react-native-simple-store';
import styles from './styles/SettingsStyles';
import { ActionCreators } from '../actions';
import FadeInView from './wrappers/FadeInView';
import Colors from '../constants/colors';

class Settings extends React.Component {
  resetLevel() {
    Alert.alert(
      'Clear Progress?',
      'Are you sure you want to do that? This action will reset your highest level to 1',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Confirm', onPress: () => this.resetLevelConfirmed() },
      ],
      { cancelable: false },
    );
  }

  resetLevelConfirmed() {
    Store.save('highestLevel', 1);
    Store.save('levelRatings', {});
    this.props.setHighestLevel(1);
    this.props.setLevel(null);
    this.props.setMode('SQUARE');
    this.props.setBoardStateCache(null);
    this.props.setLevelRatings({});
  }

  render() {
    const triColor = this.props.triColorMode ? 'ON' : 'OFF';

    return (
      <FadeInView style={styles.settings}>
        <View style={styles.settings_header}>
          <TouchableHighlight
            underlayColor={Colors.white}
            activeOpacity={0.5}
            style={styles.menuButton}
            onPress={() =>
              this.props.setCompleteRoute('menu', this.props.boardStateCache)
            }
          >
            <View style={styles.menuContainer}>
              <View style={styles.backToMenu}>
                <Text style={styles.menuText}>MENU</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.settingsElement}>
            <View style={styles.menuContainer}>
              <Animatable.View animation="bounceIn" style={styles.settingsBox}>
                <Text style={[styles.menuText, styles.settingsText]}>
                  SETTINGS
                </Text>
              </Animatable.View>
            </View>
          </View>
        </View>
        <View style={{ flex: 7, marginBottom: 30, width: '90%' }}>
          <Animatable.View animation="fadeInUp" style={styles.menu}>
            <TouchableHighlight
              underlayColor={Colors.gray}
              activeOpacity={0.5}
              style={styles.settingsButton}
              onPress={() =>
                this.props.setTriColorMode(!this.props.triColorMode)
              }
            >
              <Text style={styles.settingsButtonText}>
                TRICOLOR MODE :&nbsp;
                <Text style={styles.triColorStatus}>{triColor}</Text>
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={Colors.gray}
              activeOpacity={0.5}
              style={[
                styles.settingsButton,
                { backgroundColor: Colors.darkRed },
              ]}
              onPress={() => this.resetLevel()} // todo: add modal
            >
              <Text style={styles.progressText}>CLEAR PROGRESS</Text>
            </TouchableHighlight>
          </Animatable.View>
        </View>
      </FadeInView>
    );
  }
}

Settings.propTypes = {
  triColorMode: PropTypes.bool.isRequired,
  setTriColorMode: PropTypes.func.isRequired,
  setCompleteRoute: PropTypes.func.isRequired,
  setHighestLevel: PropTypes.func.isRequired,
  setLevel: PropTypes.func.isRequired,
  setBoardStateCache: PropTypes.func.isRequired,
  setLevelRatings: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  boardStateCache: PropTypes.object,
};

Settings.defaultProps = {
  boardStateCache: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    triColorMode: state.triColorMode,
    boardStateCache: state.boardStateCache,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
