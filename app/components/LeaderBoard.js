import React from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './styles/LeaderBoardStyles';
import { ActionCreators } from '../actions';

class Leaderboard extends React.Component {
    static formatTriColor(triColor) {
        if (triColor) { return triColor; }
        return 'OFF';
    }
    getLeaderboardRow(score, key) {
        return (
            <View key={key} style={styles.leaderboard_score}>
                <View style={styles.leaderboard_score_flex}>
                    <Text style={styles.leaderboard_score_text_1}>{score.date}</Text>
                    <Text style={styles.leaderboard_score_text_2}>Tricolor: {this.formatTriColor(score.triColor)}</Text>
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
                      underlayColor="#CECDCD"
                      activeOpacity={0.5}
                      onPress={() => this.props.setRoute('menu')}
                    >
                        <View style={styles.backToMenu}>
                            <Text style={styles.menuText}>Menu</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.scoreElement}>
                        <View style={styles.scoreBox}>
                            <Text style={[styles.menuText, styles.scoreText]}>
                                High{'\n'}Scores
                            </Text>
                        </View>
                    </View>
                    <View style={styles.emptyElement} />
                </View>
                <View style={{ flex: 5, marginBottom: 30 }}>
                    <ScrollView>
                        {this.props.leaderboard.map((score, key) => this.getLeaderboardRow(score, key))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

Leaderboard.propTypes = {
    setRoute: PropTypes.func.isRequired,
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
