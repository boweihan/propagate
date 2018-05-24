import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import styles from './styles/InstructionsStyles';
import { ActionCreators } from '../actions';
import FadeInView from './wrappers/FadeInView';
import Colors from '../constants/colors';

const imgStep1 = require('../assets/images/step1.png');
const imgStep2 = require('../assets/images/step2.png');
const imgStep3 = require('../assets/images/step3.png');
const imgStep4 = require('../assets/images/step4.png');

const Width = Dimensions.get('window').width;

class Instructions extends React.Component {
  static getEntries() {
    return [
      {
        imgSource: imgStep1,
        text: 'Dive in by opening up the level selector.',
      },
      {
        imgSource: imgStep2,
        text: 'Choose a level. Levels will become available as you level up.',
      },
      {
        imgSource: imgStep3,
        text:
          'Select a pattern. Tapping a tile will flip that tile and' +
          ' surrounding tiles in the shape of the selected flipping mode.',
      },
      {
        imgSource: imgStep4,
        text:
          'Level up by flipping all the board tiles to red. You may need to' +
          ' experiment with different flipping patterns.',
      },
    ];
  }

  static renderCarouselItem({ item, index }) {
    return (
      <View style={styles.step}>
        <Text style={styles.stepNumberText}>
          {index + 1}. {item.text}
        </Text>
        <Image style={styles.stepImage} source={item.imgSource} />
      </View>
    );
  }

  render() {
    return (
      <FadeInView style={styles.instructions}>
        <Animatable.View
          animation="bounceIn"
          style={styles.instructions_header}
        >
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
              <View style={styles.instructionsBox}>
                <Text style={[styles.menuText, styles.instructionsText]}>
                  INSTRUCTIONS
                </Text>
              </View>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          style={{
            flex: 7,
            marginBottom: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Carousel
            ref={c => {
              this.carousel = c;
            }}
            data={Instructions.getEntries()}
            renderItem={Instructions.renderCarouselItem}
            sliderWidth={Width}
            itemWidth={Width}
          />
        </Animatable.View>
        <Text style={styles.swipe}>...</Text>
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
