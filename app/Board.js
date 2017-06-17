import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing } from 'react-native';
import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window'); // es6 destructuring

export default class Board extends React.Component {
  constructor(props) {
    super();
    this.state = {
        opacities : this.getInitialOpacities(props),
        tilt : this.getInitialTilt(props),
        board : this.buildBoard(props)
    }
  }

  buildBoard(props) {
    let size = props.size;
    let cell_size = 0.8*width * 1/size;
    let cell_padding = cell_size * 0.05;
    let border_radius = cell_padding * 2;
    let title_size = cell_size - cell_padding * 2;
    let letter_size = title_size * 0.75;
    return {
        size : size,
        cell_size : cell_size,
        cell_padding : cell_padding,
        border_radius : border_radius,
        title_size : title_size,
        letter_size : letter_size
    }
  }

  getInitialOpacities(props) {
    let opacities = new Array(props.size * props.size);
    for (let i = 0; i < opacities.length; i++) {
      opacities[i] = new Animated.Value(1);
    }
    return opacities;
  }

  getInitialTilt(props) {
    let tilt = new Array(props.size * props.size);
    for (let i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0);
    }
    return tilt;
  }

  renderBoard() {
    let result = [];
    for (let row = 0; row < this.state.board.size; row++) {
      for (let col = 0; col < this.state.board.size; col++) {
        let key = row * this.state.board.size + col;
        let letter = String.fromCharCode(65 + key);
        let tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        });
        let position = {
          left: col * this.state.board.cell_size + this.state.board.cell_padding,
          top: row * this.state.board.cell_size + this.state.board.cell_padding,
          opacity: this.state.opacities[key],
          transform: [{perspective: this.state.board.cell_size * 8},
                      {rotateX: tilt}]
        };
        result.push(this.renderTile(key, position, letter));
      }
    }
    return result;
  }

  renderTile(id, position, letter) {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <Animated.View key={id} style={[dynamicStyles.tile, position]}
             onStartShouldSetResponder={() => this.clickTile(id)}>
         <Text style={dynamicStyles.letter}>{letter}</Text>
       </Animated.View>
    )
  }

  clickTile(id) {
    let opacity = this.state.opacities[id];
    let tilt = this.state.tilt[id];
    opacity.setValue(.5); // half transparent, half opaque
    tilt.setValue(2);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // fully opaque
        duration: 350, // milliseconds
      }),
      Animated.timing(tilt, {
        toValue: 0, // mapped to 0 degrees (no tilt)
        duration: 250, // milliseconds
        easing: Easing.quad // quadratic easing function: (t) => t * t
      })
    ]).start();
  }

  render() {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View style={dynamicStyles.container}>
          {this.renderBoard()}
      </View>
    );
  }

  getDynamicStyles() {
    return {
      container: {
        width: this.state.board.cell_size * this.state.board.size,
        height: this.state.board.cell_size * this.state.board.size,
        backgroundColor: 'transparent',
      },
      tile: {
        position: 'absolute',
        width: this.state.board.title_size,
        height: this.state.board.title_size,
        borderRadius: this.state.board.border_radius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BEE1D2',
      },
      letter: {
        color: '#333',
        fontSize: this.state.board.letter_size,
        backgroundColor: 'transparent',
        fontFamily: 'NukamisoLite', // <= custom font name
      }
    }
  }
}

const styles = StyleSheet.create({

});
