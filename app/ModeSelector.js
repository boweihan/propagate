import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing } from 'react-native';
import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');
// buttonsize math works because menu takes up 33% of height and there are 3 buttons
let BUTTONSIZE = width > height ? 0.8*(height/3) : 0.8*(width/3);

export default class ModeSelector extends React.Component {
  render() {
    return (
      <View style={styles.modes}>
        <Animated.View style={styles.mode}
          onStartShouldSetResponder={() => this.props.setMode('square')}>
        </Animated.View>
        <Animated.View style={styles.mode}
          onStartShouldSetResponder={() => this.props.setMode('plus')}>
        </Animated.View>
        <Animated.View style={styles.mode}
          onStartShouldSetResponder={() => this.props.setMode('cross')}>
        </Animated.View>
      </View>
    );
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({
  modes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  mode: {
    width: BUTTONSIZE,
    height: BUTTONSIZE,
    margin: BUTTONSIZE*0.1,
    borderRadius: BUTTONSIZE*0.1,
    backgroundColor: 'black'
  }
});
