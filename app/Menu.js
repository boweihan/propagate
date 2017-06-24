import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableHighlight } from 'react-native';

export default class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      pulseRed : new Animated.Value(0),
      pulseBlack : new Animated.Value(0)
    };
    this._redStart = this._redStart.bind(this);
    this._redEnd = this._redEnd.bind(this);
    this._blackStart = this._blackStart.bind(this);
    this._blackEnd = this._blackEnd.bind(this);
  }

  _redStart() {
    Animated.timing(this.state.pulseRed, { toValue: 1, duration: 1000 }).start(this._redEnd);
  }

  _redEnd() {
    Animated.timing(this.state.pulseRed, { toValue: 0, duration: 1000 }).start(this._redStart);
  }

  _blackStart() {
    Animated.timing(this.state.pulseBlack, { toValue: 1, duration: 1000 }).start(this._blackEnd);
  }

  _blackEnd() {
    Animated.timing(this.state.pulseBlack, { toValue: 0, duration: 1000 }).start(this._blackStart);
  }

  _initRedAnimation() {
    this._redStart();
    return this.state.pulseRed.interpolate({ inputRange: [0, 1], outputRange: ["#403837", "#BE3E2C"] });
  }

  _initBlackAnimation() {
    this._blackStart();
    return this.state.pulseBlack.interpolate({ inputRange: [0, 1], outputRange: ["#BE3E2C", "#403837"] });
  }

  render() {
    let animateRedFirst = this._initRedAnimation();
    let animateBlackFirst = this._initBlackAnimation();

    return (
      <View style={styles.menu}>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Animated.Text style={[styles.prop, {color: animateRedFirst}]} numberOfLines={2}>PROP
            <Animated.Text style={[styles.agate,  {color: animateBlackFirst}]}>AGATE</Animated.Text>
          </Animated.Text>
        </View>
        {!this.props.firstLoad ?
          <TouchableHighlight underlayColor='white' activeOpacity={0.5}
            onPress={() => this.props.setRoute('game')}>
            <View style={styles.startButton}>
              <Text style={styles.startText}>CONTINUE</Text>
            </View>
          </TouchableHighlight>
        : null}
        <TouchableHighlight underlayColor='white' activeOpacity={0.5}
          onPress={() => this.props.setRoute('newGame')}>
          <View style={styles.startButton}>
            <Text style={styles.startText}>NEW GAME</Text>
          </View>
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
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  startText : {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#7c6c6a",
    fontFamily: "NukamisoLite"
  }
});
