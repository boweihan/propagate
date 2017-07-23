import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/LevelPickerStyles';
import { ActionCreators } from '../actions';

class LevelPicker extends React.Component {
    getLevelRow(value, key) {
        const startingLevel = value * 4;
        const levels = [startingLevel + 1, startingLevel + 2, startingLevel + 3, startingLevel + 4];
        return (
            <View key={key} style={styles.columns}>
                {levels.map((lvl, innerKey) => this.getLevelCell(lvl, innerKey))}
            </View>
        );
    }

    getLevelCell(level, key) {
        return level <= this.props.highestLevel ?
        (
            <TouchableHighlight
              underlayColor="#CECDCD"
              activeOpacity={0.5}
              key={key}
              style={styles.cell}
              onPress={() => this.selectLevel(level)}
            >
                <Text style={styles.cellText}>{level}</Text>
            </TouchableHighlight>
        ) : (
            <View key={key} style={styles.cellDisabled} >
                <Text style={styles.cellText}>{level}</Text>
            </View>
        );
    }

    selectLevel(level) {
        this.props.setLevel(level);
        this.props.setCompleteRoute('game');
    }

    render() {
        const levelRows = Array.from(Array(10).keys());
        return (
            <View style={styles.levelPicker}>
                <View style={styles.levelPickerHeader}>
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
                    <View style={styles.levelPickerElement}>
                        <View style={styles.menuContainer}>
                            <View style={styles.levelPickerBox}>
                                <Text style={[styles.menuText, styles.levelPickerText]}>
                                    CHOOSE A LEVEL
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, marginBottom: 30, width: '80%' }}>
                    <ScrollView>
                        <View style={styles.rows}>
                            {levelRows.map((value, key) => this.getLevelRow(value, key))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

LevelPicker.propTypes = {
    setCompleteRoute: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
    highestLevel: PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        level: state.level,
        highestLevel: state.highestLevel,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelPicker);
