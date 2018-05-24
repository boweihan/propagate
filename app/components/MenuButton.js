import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import styles from './styles/MenuButtonStyles';

class MenuButton extends React.PureComponent {
  render() {
    return (
      <Animatable.View
        animation="pulse"
        easing="ease-in"
        iterationCount="infinite"
      >
        <TouchableHighlight
          underlayColor={this.props.underlayColor}
          activeOpacity={0.5}
          style={styles.button}
          onPress={this.props.onPress}
        >
          <Text style={styles.text}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      </Animatable.View>
    );
  }
}

MenuButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  underlayColor: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
};

MenuButton.defaultProps = {
  underlayColor: 'gray',
};

export default MenuButton;
