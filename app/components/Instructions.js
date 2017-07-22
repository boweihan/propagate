import React from 'react';
import { Text, View, TouchableHighlight, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/InstructionsStyles';
import { ActionCreators } from '../actions';

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
                    <Text style={styles.stepInfoText}>Start a new game!</Text>
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
                    <Text style={styles.stepInfoText}>Select a flipping pattern (default: square).
                        Tapping a tile will flip your tile and surrounding tiles in the
                        shape of the selected flipping pattern.</Text>
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
                    <Text style={styles.stepInfoText}>Try to get all the tiles to be red!
                        You might need to experiment with different strategies and flipping modes.</Text>
                    <View style={{ height: 250, width: '80%' }}>
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
                    <Text style={styles.stepInfoText}>Level up! Keep going. How high can you climb?</Text>
                    <View style={{ height: 100, width: '80%' }}>
                        <Image style={styles.stepImage} source={imgStep4} />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.instructions}>
                <View style={styles.instructions_header}>
                    <TouchableHighlight
                      style={styles.menuButton}
                      underlayColor="#CECDCD"
                      activeOpacity={0.5}
                      onPress={() => this.props.setCompleteRoute('menu')}
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
                        <View style={{ marginBottom: 50 }} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

Instructions.propTypes = {
    setCompleteRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
