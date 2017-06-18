import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing,
         Image } from 'react-native';
import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');
// buttonsize math works because menu takes up 33% of height and there are 3 buttons
let BUTTONSIZE = width > height ? 0.8*(height/3) : 0.8*(width/3);

export default class ModeSelector extends React.Component {
  constructor() {
    super()
    this.state = {
      mode : 'SQUARE',
      squareStyle : styles.active,
      plusStyle : null,
      crossStyle : null
    }
  }
  render() {
    return (
      <View>
        <View style={styles.selectedMode}>
          <Text style={styles.selectedModeText}>MODE: {this.state.mode}</Text>
        </View>
        <View style={styles.modes}>
          <Animated.View style={[styles.square, this.state.squareStyle]}
            onStartShouldSetResponder={() => this.selectMode('square')}>
            <Image style={styles.image} source={require('./assets/images/square.png')} />
          </Animated.View>
          <Animated.View style={[styles.plus, this.state.plusStyle]}
            onStartShouldSetResponder={() => this.selectMode('plus')}>
            <Image style={styles.image} source={require('./assets/images/plus.png')} />
          </Animated.View>
          <Animated.View style={[styles.cross, this.state.crossStyle]}
            onStartShouldSetResponder={() => this.selectMode('cross')}>
            <Image style={styles.image} source={require('./assets/images/cross.png')} />
          </Animated.View>
        </View>
      </View>
    );
  }

  selectMode(mode) {
    let newState = {
      mode : 'SQUARE',
      squareStyle : null,
      plusStyle : null,
      crossStyle : null
    }
    switch (mode) {
      case 'square':
        newState.squareStyle = styles.active;
        newState.mode = 'SQUARE';
        break;
      case 'plus':
        newState.plusStyle = styles.active;
        newState.mode = 'PLUS';
        break;
      case 'cross':
        newState.crossStyle = styles.active;
        newState.mode = 'CROSS';
        break;
    }
    this.setState(newState);
    this.props.setMode(mode);
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({
  active: {
    borderWidth: 10,
    borderRadius: 4,
    borderColor: '#d6d7da'
  },
  modes: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  square: {
    width: BUTTONSIZE,
    height: BUTTONSIZE,
    margin: BUTTONSIZE*0.1,
  },
  plus: {
    width: BUTTONSIZE,
    height: BUTTONSIZE,
    margin: BUTTONSIZE*0.1,
    backgroundColor: 'gray'
  },
  cross: {
    width: BUTTONSIZE,
    height: BUTTONSIZE,
    margin: BUTTONSIZE*0.1,
    backgroundColor: 'gray'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  selectedMode: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedModeText: {
    fontWeight: 'bold'
  }
});
