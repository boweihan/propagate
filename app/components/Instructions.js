import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/InstructionsStyles';
import { ActionCreators } from '../actions';
import FadeInView from './wrappers/FadeInView';

const imgStep1 = require('../assets/images/step1.png');
const imgStep2 = require('../assets/images/step2.png');
const imgStep3 = require('../assets/images/step3.png');
const imgStep4 = require('../assets/images/step4.png');

class Instructions extends React.Component {
  static step1() {
    return (
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>1</Text>
        </View>
        <View style={styles.stepInfo}>
          <View style={{ height: 100, width: '80%' }}>
            <Image style={styles.stepImage} source={imgStep1} />
          </View>
        </View>
      </View>
    );
  }
  static step2() {
    return (
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>2</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepInfoText}>
            Choose a level. Levels will unlock as you level up.
          </Text>
          <View style={{ height: 150, width: '80%' }}>
            <Image style={styles.stepImage} source={imgStep2} />
          </View>
        </View>
      </View>
    );
  }

  static step3() {
    return (
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>3</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepInfoText}>
            Select a pattern. Tapping a tile will flip tiles on the board based
            on the shape of the selected pattern.
          </Text>
          <View style={{ height: 150, width: '80%' }}>
            <Image style={styles.stepImage} source={imgStep3} />
          </View>
        </View>
      </View>
    );
  }

  static step4() {
    return (
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>4</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepInfoText}>
            Turn all board tiles red! You may need to use various patterns to
            get there.
          </Text>
          <View style={{ height: 250, width: '80%' }}>
            <Image style={styles.stepImage} source={imgStep4} />
          </View>
        </View>
      </View>
    );
  }

  static step5() {
    return (
      <View style={styles.step}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>5</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={[styles.stepInfoText, { marginBottom: 10 }]}>
            Level up! Can you finish all the levels?
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <FadeInView style={styles.instructions}>
        <View style={styles.instructions_header}>
          <TouchableHighlight
            style={styles.menuButton}
            underlayColor="#f2f2f2"
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
        </View>
        <View style={{ flex: 7, marginBottom: 30, width: '90%' }}>
          <ScrollView style={styles.stepsContainer}>
            {Instructions.step1()}
            {Instructions.step2()}
            {Instructions.step3()}
            {Instructions.step4()}
            {Instructions.step5()}
            <View style={{ marginBottom: 20 }} />
          </ScrollView>
        </View>
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
