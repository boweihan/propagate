import React from 'react';
import { StyleSheet, Text, View, Animated,
         Easing, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';

export default class BoardMenu extends React.Component {
  constructor() {
    super();
    this.screenWidth = Dimensions.get('window').width;
  }
  render() {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View style={dynamicStyles.boardMenu}>
        <View style={dynamicStyles.innerMainMenu}>
          <View style={dynamicStyles.btn1}>
            <TouchableHighlight underlayColor='#CECDCD' activeOpacity={0.5}
              onPress={() => this.props.setRoute('menu', this.props.board)}>
              <View style={dynamicStyles.backToMenu}>
                <Text style={dynamicStyles.menuText}>Menu</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={dynamicStyles.btn3_col2} underlayColor='#CECDCD' activeOpacity={0.5}
              onPress={() => this.props.setRoute('leaderboard', this.props.board)}>
              <View style={dynamicStyles.backToLeaderboard}>
                <Text style={[dynamicStyles.menuText, {fontSize:12}]}>Top{'\n'}Scores</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={dynamicStyles.btn2}>
            <View style={dynamicStyles.movesLeft}>
              <Text style={dynamicStyles.menuText}>Moves Left</Text>
              <Text style={[dynamicStyles.menuText, {fontSize:30}]}>{this.props.movesLeft}</Text>
            </View>
          </View>
          <View style={dynamicStyles.btn3}>
            <View style={dynamicStyles.btn3_col1}>
              <View style={dynamicStyles.score}>
                <Text style={dynamicStyles.menuText}>Score</Text>
                <Text style={dynamicStyles.menuText}>{this.props.score}</Text>
              </View>
            </View>
            <View style={dynamicStyles.btn3_col2}>
              <View style={dynamicStyles.level}>
                <Text style={dynamicStyles.menuText}>Level</Text>
                <Text style={dynamicStyles.menuText}>{this.props.level}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  getDynamicStyles() {
    return {
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
        width: this.screenWidth*0.9
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
    }
  }
}
