import React from 'react';
import { Text, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import styles from './styles/MenuStyles';
import { ActionCreators } from '../actions';
import AnimationUtils from '../utils/AnimationUtils';
import FadeInView from './wrappers/FadeInView';
import MenuButton from './MenuButton';
import Colors from '../constants/colors';

class Menu extends React.Component {
  render() {
    AnimationUtils.startAnimation(this.props.pulseRed);
    AnimationUtils.startAnimation(this.props.pulseBlack);

    const red = this.props.pulseRed.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.lightBrown, Colors.darkRed],
    });
    const black = this.props.pulseBlack.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.darkRed, Colors.lightBrown],
    });

    return (
      <FadeInView style={styles.menu}>
        <View style={styles.title}>
          <Animated.Text
            style={[styles.prop, { color: red }]}
            numberOfLines={2}
          >
            PROP
            <Animated.Text style={[styles.agate, { color: black }]}>
              AGATE
            </Animated.Text>
          </Animated.Text>
        </View>
        {this.props.level ? (
          <MenuButton
            onPress={() =>
              this.props.setCompleteRoute('game', this.props.boardStateCache)
            }
            buttonText="CONTINUE"
          />
        ) : null}
        <MenuButton
          onPress={() =>
            this.props.setCompleteRoute('picker', this.props.boardStateCache)
          }
          buttonText="SELECT LEVEL"
        />
        <MenuButton
          onPress={() =>
            this.props.setCompleteRoute(
              'instructions',
              this.props.boardStateCache,
            )
          }
          buttonText="INSTRUCTIONS"
        />
        <MenuButton
          onPress={() =>
            this.props.setCompleteRoute('settings', this.props.boardStateCache)
          }
          buttonText="SETTINGS"
        />
        <View style={styles.highestLevel}>
          <Text style={styles.highestLevelText}>TOP LEVEL</Text>
          <Animatable.Text
            animation="rubberBand"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.highestLevelStatus}
          >
            {this.props.highestLevel}
          </Animatable.Text>
        </View>
      </FadeInView>
    );
  }
}

Menu.propTypes = {
  setCompleteRoute: PropTypes.func.isRequired,
  pulseRed: PropTypes.object.isRequired,
  pulseBlack: PropTypes.object.isRequired,
  highestLevel: PropTypes.number.isRequired,
  level: PropTypes.number,
  boardStateCache: PropTypes.object,
};

Menu.defaultProps = {
  level: null,
  boardStateCache: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    level: state.level,
    pulseRed: state.pulseRed,
    pulseBlack: state.pulseBlack,
    highestLevel: state.highestLevel,
    boardStateCache: state.boardStateCache,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
