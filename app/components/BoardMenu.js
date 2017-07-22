import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/BoardMenuStyles';

function BoardMenu(props) {
    return (
        <View>
            <View style={styles.boardMenu}>
                <View style={styles.innerMainMenu}>
                    <View style={styles.btn1}>
                        <View style={styles.flex1}>
                            <TouchableHighlight
                              underlayColor="#CECDCD"
                              activeOpacity={0.5}
                              onPress={() => props.setCompleteRoute('menu', props.board)}
                            >
                                <View style={styles.backToMenu}>
                                    <Text style={styles.menuText}>MENU</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.flex1}>
                            <TouchableHighlight
                              style={styles.btn3_col2}
                              underlayColor="#CECDCD"
                              activeOpacity={0.5}
                              onPress={() => props.setCompleteRoute('leaderboard', props.board)}
                            >
                                <View style={styles.backToLeaderboard}>
                                    <Text style={[styles.menuText, { fontSize: 12 }]}>TOP{'\n'}SCORES</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.btn2}>
                        <View style={styles.movesLeft}>
                            <View style={styles.flex1}>
                                <Text style={styles.menuText}>MOVES LEFT</Text>
                                <Text style={[styles.menuText, { fontSize: 30 }]}>{props.movesLeft}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.btn3}>
                        <View style={styles.flex1}>
                            <View style={styles.score}>
                                <Text style={[styles.menuText, { fontSize: 12 }]}>SCORE</Text>
                                <Text style={styles.menuText}>{props.score}</Text>
                            </View>
                        </View>
                        <View style={styles.flex1}>
                            <View style={styles.level}>
                                <Text style={[styles.menuText, { fontSize: 12 }]}>LEVEL</Text>
                                <Text style={styles.menuText}>{props.level}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.subBoardMenu}>
                <View style={styles.help}>
                    <Text style={styles.helpText}>Flip the tiles to red!</Text>
                </View>
            </View>
        </View>
    );
}

BoardMenu.propTypes = {
    board: PropTypes.object.isRequired,
    setCompleteRoute: PropTypes.func.isRequired,
    movesLeft: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
};

export default BoardMenu;

