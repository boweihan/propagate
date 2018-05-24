import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class FadeInView extends React.Component {
  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    };
  }

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 250, // Make it take a while
      },
    ).start(); // Starts the animation
  }

  componentWillUnmount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 2000, // Make it take a while
      },
    ).start(); // Starts the animation
  }

  render() {
    const { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

FadeInView.propTypes = {
  style: PropTypes.object,
  children: PropTypes.array,
};

FadeInView.defaultProps = {
  style: {},
  children: null,
};

export default FadeInView;
