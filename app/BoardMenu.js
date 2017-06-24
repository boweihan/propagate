import React from 'react';
import { StyleSheet, Text, View, Animated,
         Easing, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

export default class BoardMenu extends React.Component {
  render() {
    return (
      <View style={styles.boardMenu}>
        <View style={styles.innerMainMenu}>
          <View style={styles.btn1}>
            <TouchableHighlight underlayColor='#CECDCD' activeOpacity={0.5}
              onPress={() => this.props.setRoute('menu', this.props.board)}>
              <View style={styles.backToMenu}>
                <Text style={styles.menuText}>Menu</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.btn3_col2}>
              <View style={styles.backToLeaderboard}>
                <Text style={[styles.menuText, {fontSize:12}]}>Top{'\n'}Scores</Text>
              </View>
            </View>
          </View>
          <View style={styles.btn2}>
            <View style={styles.movesLeft}>
              <Text style={styles.menuText}>Moves Left</Text>
              <Text style={[styles.menuText, {fontSize:30}]}>{this.props.movesLeft}</Text>
            </View>
          </View>
          <View style={styles.btn3}>
            <View style={styles.btn3_col1}>
              <View style={styles.score}>
                <Text style={styles.menuText}>Score</Text>
                <Text style={styles.menuText}>{this.props.score}</Text>
              </View>
            </View>
            <View style={styles.btn3_col2}>
              <View style={styles.level}>
                <Text style={styles.menuText}>Level</Text>
                <Text style={styles.menuText}>{this.props.level}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({
  boardMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  innerMainMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: width*0.9
  },
  backToMenu: {
    backgroundColor: '#BE3E2C',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  backToLeaderboard: {
    backgroundColor: '#ff9900',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  movesLeft: {
    backgroundColor: '#1E6576',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    width: '90%'
  },
  score: {
    backgroundColor: '#7AAF29',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  level: {
    backgroundColor: 'gray',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  btn1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  btn2: {
    flex: 2.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn3: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  btn3_col2: {
    marginTop: 5
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  }
});
