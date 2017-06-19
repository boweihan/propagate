import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing,
         TouchableHighlight } from 'react-native';

export default class Menu extends React.Component {
  constructor() {
    super()
    this.state = {
      animatedPulse : new Animated.Value(1)
    };
    this.pulseAnimationStart = this.pulseAnimationStart.bind(this);
    this.pulseAnimationEnd = this.pulseAnimationEnd.bind(this);
  }

  // TODO: change this to be color inversion animation
  pulseAnimationStart() {
    let animation = this.state.animatedPulse;
    animation.setValue(0.2);
    Animated.timing(animation, {
      toValue: 1, // fully opaque
      duration: 1000, // milliseconds
    }).start(this.pulseAnimationEnd);
  }

  pulseAnimationEnd() {
    let animation = this.state.animatedPulse;
    animation.setValue(1);
    Animated.timing(animation, {
      toValue: 0.2, // fully opaque
      duration: 1000, // milliseconds
    }).start(this.pulseAnimationStart);
  }

  render() {
    this.pulseAnimationStart();
    return (
      <View style={styles.menu}>
        <Animated.View style={{flexDirection: 'row', marginBottom: 30, opacity: this.state.animatedPulse}}>
          <Text style={styles.prop} numberOfLines={2}>PROP
            <Text style={styles.agate}>AGATE</Text>
          </Text>
        </Animated.View>
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

/* ----------------------------- static styling ------------------------------*/
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
    fontSize: 25,
    fontFamily: "NukamisoLite"
  },
  agate : {
    color: "#BE3E2C",
    fontFamily: "NukamisoLite"
  },
  startButton : {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  startText : {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#7c6c6a",
    fontFamily: "NukamisoLite"
  }
});
