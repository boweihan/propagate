import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/LevelPickerStyles';
import { ActionCreators } from '../actions';
import { Ionicons } from '@expo/vector-icons'; // eslint-disable-line

class LevelPicker extends React.Component {
    static getRatingStar(rating, ratingKey) {
        let star;
        if (rating === 'filled') {
            star = <View key={ratingKey}><Ionicons style={styles.star} name="md-star" /></View>;
        } else if (rating === 'empty') {
            star = <View key={ratingKey}><Ionicons style={styles.star} name="md-star-outline" /></View>;
        }
        return star;
    }

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
        const rating = [];
        const levelRating = this.props.levelRatings[level];
        for (let i = 1; i <= 3; i += 1) {
            if (levelRating && i <= levelRating) {
                rating.push('filled');
            } else {
                rating.push('empty');
            }
        }

        return level <= this.props.highestLevel ?
        (
            <TouchableHighlight
              underlayColor="#CECDCD"
              activeOpacity={0.5}
              key={key}
              style={styles.cell}
              onPress={() => this.selectLevel(level)}
            >
                <View style={styles.innerCell}>
                    <Text style={styles.cellText}>{level}</Text>
                    <View style={styles.ratingBox}>
                        {rating.length > 0 ?
                            rating.map((elem, ratingKey) => LevelPicker.getRatingStar(elem, ratingKey)) : null}
                    </View>
                </View>
            </TouchableHighlight>
        ) : (
            <View key={key} style={styles.cellDisabled} >
                <View style={styles.innerCell}>
                    <Text style={styles.cellText}>{level}</Text>
                </View>
            </View>
        );
    }

    selectLevel(level) {
        if (this.props.level !== level) {
            this.props.setBoardStateCache(null);
        }
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
                                    LEVELS
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
    setBoardStateCache: PropTypes.func.isRequired,
    level: PropTypes.number,
    levelRatings: PropTypes.object.isRequired,
};

LevelPicker.defaultProps = {
    level: null,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        level: state.level,
        highestLevel: state.highestLevel,
        levelRatings: state.levelRatings,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelPicker);
