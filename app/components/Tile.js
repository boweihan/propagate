import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

function Tile(props) {
    return (
        <Animated.View
          style={props.style}
          onStartShouldSetResponder={() => props.clickTile(props.id)}
        />
    );
}

Tile.propTypes = {
    style: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    clickTile: PropTypes.func.isRequired,
};

export default Tile;
