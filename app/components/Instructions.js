import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
// import Carousel from 'react-native-snap-carousel';
import styles from './styles/InstructionsStyles';
import { ActionCreators } from '../actions';
import FadeInView from './wrappers/FadeInView';
import Colors from '../constants/colors';

const imgStep1 = require('../assets/images/step1.png');
const imgStep2 = require('../assets/images/step2.png');
const imgStep3 = require('../assets/images/step3.png');
const imgStep4 = require('../assets/images/step4.png');
const imgStep5 = require('../assets/images/step5.png');

class Instructions extends React.Component {
  static getEntries() {
    return [
      {
        imgSource: imgStep1,
        text: 'Tap to open the level selector.',
        style: { height: 90, width: '80%' },
      },
      {
        imgSource: imgStep2,
        text: 'Choose a level.',
        style: { height: 160, width: '80%' },
      },
      {
        imgSource: imgStep3,
        text: 'Choose a pattern.',
        style: { height: 130, width: '80%' },
      },
      {
        imgSource: imgStep4,
        text: 'Flip the tiles to red.',
        style: { height: 260, width: '80%' },
      },
      {
        imgSource: imgStep5,
        text: 'Level up! Can you beat all the levels?',
        style: { height: 160, width: '80%' },
      },
    ];
  }

  static renderCarouselItem({ item, index }) {
    return (
      <View style={styles.step} key={index}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.stepInfo}>
          {item.text && <Text style={styles.stepInfoText}>{item.text}</Text>}
          <View style={item.style}>
            <Image style={styles.stepImage} source={item.imgSource} />
          </View>
        </View>
      </View>
    );
  }

  static getItems() {
    return Instructions.getEntries().map((item, index) =>
      Instructions.renderCarouselItem({ item, index }),
    );
  }

  render() {
    return (
      <FadeInView style={styles.instructions}>
        <View style={styles.instructions_header}>
          <TouchableHighlight
            style={styles.menuButton}
            underlayColor={Colors.white}
            activeOpacity={0.5}
            onPress={() =>
              this.props.setCompleteRoute('menu', this.props.boardStateCache)
            }
          >
            <View style={styles.menuContainer}>
              <View style={styles.backToMenu}>
                <Text style={styles.menuText}>MENU</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.instructionsElement}>
            <View style={styles.menuContainer}>
              <Animatable.View
                animation="bounceIn"
                style={styles.instructionsBox}
              >
                <Text style={[styles.menuText, styles.instructionsText]}>
                  INSTRUCTIONS
                </Text>
              </Animatable.View>
            </View>
          </View>
        </View>
        <Animatable.View
          animation="fadeInUp"
          style={{ flex: 7, marginBottom: 30, width: '90%' }}
        >
          <ScrollView style={styles.stepsContainer}>
            {Instructions.getItems()}
            <View style={{ padding: 50 }} />
          </ScrollView>
        </Animatable.View>
      </FadeInView>
    );
  }
}

Instructions.propTypes = {
  setCompleteRoute: PropTypes.func.isRequired,
  boardStateCache: PropTypes.object,
};

Instructions.defaultProps = {
  boardStateCache: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { boardStateCache: state.boardStateCache };
}

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
