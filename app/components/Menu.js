import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableHighlight } from 'react-native';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      pulseRed : new Animated.Value(0),
      pulseBlack : new Animated.Value(0)
    };
  }

  _initRedAnimation() {
    Animated.timing(this.state.pulseRed, { toValue: 1, duration: 1000 }).start();
    return this.state.pulseRed.interpolate({ inputRange: [0, 1], outputRange: ["#403837", "#BE3E2C"] });
  }

  _initBlackAnimation() {
    Animated.timing(this.state.pulseBlack, { toValue: 1, duration: 1000 }).start(this._blackEnd);
    return this.state.pulseBlack.interpolate({ inputRange: [0, 1], outputRange: ["#BE3E2C", "#403837"] });
  }

  render() {
    let animateRedFirst = this._initRedAnimation();
    let animateBlackFirst = this._initBlackAnimation();
    let triColor = this.props.triColor ? "ON" : "OFF";

    return (
      <View style={styles.menu}>
        <View style={{flexDirection: 'row', marginBottom: 50}}>
          <Animated.Text style={[styles.prop, {color: animateRedFirst}]} numberOfLines={2}>PROP
            <Animated.Text style={[styles.agate,  {color: animateBlackFirst}]}>AGATE</Animated.Text>
          </Animated.Text>
        </View>
        {!this.props.firstLoad ?
          <TouchableHighlight underlayColor='white' activeOpacity={0.5} style={styles.startButton}
            onPress={() => this.props.setRoute('game')}>
            <Text style={styles.startText}>CONTINUE</Text>
          </TouchableHighlight>
        : null}
        <TouchableHighlight underlayColor='white' activeOpacity={0.5} style={styles.startButton}
          onPress={() => this.props.setRoute('newGame')}>
          <Text style={styles.startText}>NEW GAME</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='white' activeOpacity={0.5} style={styles.startButton}
          onPress={() => this.props.setRoute('leaderboard')}>
          <Text style={styles.startText}>SCORES</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='white' activeOpacity={0.5} style={{marginTop:70}}
          onPress={() => this.props.toggleTriColorMode()}>
          <Text style={styles.triColorText}>TRICOLOR MODE:
            <Text style={{textDecorationLine: "underline"}}>{triColor}</Text>
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  prop : {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#403837",
    fontSize: 30,
    fontFamily: "NukamisoLite"
  },
  agate : {
    color: "#BE3E2C",
    fontFamily: "NukamisoLite"
  },
  startButton : {
    marginTop: 20
  },
  startText : {
    fontWeight: 'bold',
    fontSize: 13,
    color: "#7c6c6a",
    fontFamily: "NukamisoLite"
  },
  triColorText : {
    fontSize: 10,
    color: "#7c6c6a",
    fontFamily: "NukamisoLite"
  }
});
