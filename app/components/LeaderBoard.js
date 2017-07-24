import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/LeaderBoardStyles';
import { ActionCreators } from '../actions';
import HelperUtils from './utils/HelperUtils';

class Leaderboard extends React.Component {
    static getLeaderboardRow(score, key) {
        return (
            <View key={key} style={styles.leaderboard_score}>
                <View style={styles.leaderboard_score_flex}>
                    <Text style={styles.leaderboard_score_text_1}>{score.date}</Text>
                    <Text style={styles.leaderboard_score_text_2}>Tricolor: {HelperUtils.formatTriColor(score.triColor)}</Text>
                    <Text style={styles.leaderboard_score_text_3}>{score.score}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.leaderboard}>
                <View style={styles.leaderboard_header}>
                    <TouchableHighlight
                      style={styles.menuButton}
                      underlayColor="#f2f2f2"
                      activeOpacity={0.5}
                      onPress={() => this.props.setCompleteRoute('menu')}
                    >
                        <View style={styles.menuContainer}>
                            <View style={styles.backToMenu}>
                                <Text style={styles.menuText}>MENU</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.scoreElement}>
                        <View style={styles.menuContainer}>
                            <View style={styles.scoreBox}>
                                <Text style={[styles.menuText, styles.scoreText]}>
                                    HIGH SCORES
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, marginBottom: 30 }}>
                    <ScrollView>
                        {this.props.leaderboard.map((score, key) => Leaderboard.getLeaderboardRow(score, key))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

Leaderboard.propTypes = {
    setCompleteRoute: PropTypes.func.isRequired,
    leaderboard: PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
