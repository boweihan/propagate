import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

export default class Tile extends React.Component {
  render() {
    return (
      <Animated.View style={this.props.style}
        onStartShouldSetResponder={() => this.props.clickTile(this.props.id)}>
      </Animated.View>
    );
  }
}