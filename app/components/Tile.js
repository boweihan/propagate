import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

function Tile(props) {
  return (
    <Animatable.View animation="zoomIn">
      <Animated.View
        style={props.style}
        onStartShouldSetResponder={() => props.clickTile(props.id)}
      />
    </Animatable.View>
  );
}

Tile.propTypes = {
  style: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  clickTile: PropTypes.func.isRequired,
};

export default Tile;
