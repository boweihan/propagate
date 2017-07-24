import React from 'react';
import { Text, View, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Store from 'react-native-simple-store';
import styles from './styles/SettingsStyles';
import { ActionCreators } from '../actions';

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
        this.props.setBoardStateCache(null);
        this.props.setLevelRatings({});
    }

    render() {
        const triColor = this.props.triColorMode ? 'ON' : 'OFF';

        return (
            <View style={styles.settings}>
                <View style={styles.settings_header}>
                    <TouchableHighlight
                      style={styles.menuButton}
                      underlayColor="#f2f2f2"
                      activeOpacity={0.5}
                      onPress={() => this.props.setCompleteRoute('menu')}
                    >
                        <View style={styles.menuContainer}>
                            <View style={styles.backToMenu}>
                                <Text style={styles.menuText}>MENU</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.settingsElement}>
                        <View style={styles.menuContainer}>
                            <View style={styles.settingsBox}>
                                <Text style={[styles.menuText, styles.settingsText]}>
                                    SETTINGS
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, marginBottom: 30, width: '90%' }}>
                    <View style={styles.menu}>
                        <TouchableHighlight
                          underlayColor="white"
                          activeOpacity={0.5}
                          style={styles.settingsButton}
                          onPress={() => this.props.setTriColorMode(!this.props.triColorMode)}
                        >
                            <Text style={styles.settingsButtonText}>TRICOLOR MODE :&nbsp;
                                <Text style={styles.triColorStatus}>{triColor}</Text>
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          underlayColor="white"
                          activeOpacity={0.5}
                          style={styles.settingsButton}
                          onPress={() => this.resetLevel()} // todo: add modal
                        >
                            <Text style={styles.progressText}>CLEAR PROGRESS</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
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
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        triColorMode: state.triColorMode,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
