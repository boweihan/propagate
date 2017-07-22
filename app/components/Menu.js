import React from 'react';
import { Text, View, Animated, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/MenuStyles';
import { ActionCreators } from '../actions';

class Menu extends React.Component {
    initRedAnimation() {
        Animated.timing(this.props.pulseRed, { toValue: 1, duration: 1000 }).start();
        return this.props.pulseRed.interpolate({ inputRange: [0, 1], outputRange: ['#403837', '#BE3E2C'] });
    }

    initBlackAnimation() {
        Animated.timing(this.props.pulseBlack, { toValue: 1, duration: 1000 }).start();
        return this.props.pulseBlack.interpolate({ inputRange: [0, 1], outputRange: ['#BE3E2C', '#403837'] });
    }

    render() {
        const red = this.initRedAnimation();
        const black = this.initBlackAnimation();
        const triColor = this.props.triColorMode ? 'ON' : 'OFF';

        return (
            <View style={styles.menu}>
                <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                    <Animated.Text
                      style={[styles.prop, { color: red }]}
                      numberOfLines={2}
                    >
                    PROP
                        <Animated.Text style={[styles.agate, { color: black }]}>
                            AGATE
                        </Animated.Text>
                    </Animated.Text>
                </View>
                <TouchableHighlight
                  underlayColor="lightgray"
                  activeOpacity={0.5}
                  style={styles.startButton}
                  onPress={() => this.props.setCompleteRoute('game')}
                >
                    <Text style={styles.startText}>PLAY</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="lightgray"
                  activeOpacity={0.5}
                  style={styles.startButton}
                  onPress={() => this.props.setCompleteRoute('instructions')}
                >
                    <Text style={styles.startText}>INSTRUCTIONS</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="lightgray"
                  activeOpacity={0.5}
                  style={styles.startButton}
                  onPress={() => this.props.setCompleteRoute('settings')}
                >
                    <Text style={styles.startText}>SETTINGS</Text>
                </TouchableHighlight>
                <View style={styles.highestLevel}>
                    <Text style={styles.highestLevelText}>Highest Level Achieved :&nbsp;
                        <Text style={styles.highestLevelStatus}>1</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

Menu.propTypes = {
    triColorMode: PropTypes.bool.isRequired,
    setCompleteRoute: PropTypes.func.isRequired,
    pulseRed: PropTypes.object.isRequired,
    pulseBlack: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        triColorMode: state.triColorMode,
        pulseRed: state.pulseRed,
        pulseBlack: state.pulseBlack,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
