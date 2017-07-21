import React from 'react';
import { Text, View, Animated, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/MenuStyles';

export default class Menu extends React.Component {
    constructor() {
        super();
        this.state = {
            pulseRed: new Animated.Value(0),
            pulseBlack: new Animated.Value(0),
        };
    }

    initRedAnimation() {
        Animated.timing(this.state.pulseRed, { toValue: 1, duration: 1000 }).start();
        return this.state.pulseRed.interpolate({ inputRange: [0, 1], outputRange: ['#403837', '#BE3E2C'] });
    }

    initBlackAnimation() {
        Animated.timing(this.state.pulseBlack, { toValue: 1, duration: 1000 }).start();
        return this.state.pulseBlack.interpolate({ inputRange: [0, 1], outputRange: ['#BE3E2C', '#403837'] });
    }

    render() {
        const red = this.initRedAnimation();
        const black = this.initBlackAnimation();
        const triColor = this.props.triColor ? 'ON' : 'OFF';

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
                {!this.props.firstLoad ?
                    <TouchableHighlight
                      underlayColor="white"
                      activeOpacity={0.5}
                      style={styles.startButton}
                      onPress={() => this.props.setRoute('game')}
                    >
                        <Text style={styles.startText}>CONTINUE</Text>
                    </TouchableHighlight>
                : null}
                <TouchableHighlight
                  underlayColor="white"
                  activeOpacity={0.5}
                  style={styles.startButton}
                  onPress={() => this.props.setRoute('newGame')}
                >
                    <Text style={styles.startText}>NEW GAME</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="white"
                  activeOpacity={0.5}
                  style={styles.startButton}
                  onPress={() => this.props.setRoute('leaderboard')}
                >
                    <Text style={styles.startText}>SCORES</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="white"
                  activeOpacity={0.5}
                  style={{ marginTop: 70 }}
                  onPress={() => this.props.toggleTriColorMode()}
                >
                    <Text style={styles.triColorText}>TRICOLOR MODE:
                        <Text style={{ textDecorationLine: 'underline' }}>{triColor}</Text>
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

Menu.propTypes = {
    triColor: PropTypes.bool.isRequired,
    firstLoad: PropTypes.bool.isRequired,
    setRoute: PropTypes.func.isRequired,
    toggleTriColorMode: PropTypes.func.isRequired,
};
