import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing } from 'react-native';

export default class Tile extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Animated.View style={this.props.style}
             onStartShouldSetResponder={() => this.props.clickTile(this.props.id)}>
       </Animated.View>
    );
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({

});
