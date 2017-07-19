import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableHighlight, ScrollView } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

class Leaderboard extends React.Component {
  constructor(props) {
    super();
    this.screenWidth = Dimensions.get('window').width;
  }

  render() {
    let dynamicStyles = this.getDynamicStyles();
    return (
      <View style={dynamicStyles.leaderboard}>
        <View style={dynamicStyles.leaderboard_header}>
          <TouchableHighlight style={dynamicStyles.menuButton} underlayColor='#CECDCD' activeOpacity={0.5}
            onPress={() => this.props.setRoute('menu')}>
            <View style={dynamicStyles.backToMenu}>
              <Text style={dynamicStyles.menuText}>Menu</Text>
            </View>
          </TouchableHighlight>
          <View style={dynamicStyles.scoreElement}>
            <View style={dynamicStyles.scoreBox}>
              <Text style={[dynamicStyles.menuText, dynamicStyles.scoreText]}>
                High{'\n'}Scores
              </Text>
            </View>
          </View>
          <View style={dynamicStyles.emptyElement}></View>
        </View>
        <View style={{flex:5, marginBottom: 30}}>
          <ScrollView>
            {this.props.leaderboard.map(function(score, key){
              return (
                <View key={key} style={dynamicStyles.leaderboard_score}>
                  <View style={dynamicStyles.leaderboard_score_flex}>
                    <Text style={dynamicStyles.leaderboard_score_text_1}>{score.date}</Text>
                    <Text style={dynamicStyles.leaderboard_score_text_2}>Tricolor: {this.formatTriColor(score.triColor)}</Text>
                    <Text style={dynamicStyles.leaderboard_score_text_3}>{score.score}</Text>
                  </View>
                </View>
              )
            }, this)}
          </ScrollView>
        </View>
      </View>
    );
  }

  formatTriColor(triColor) {
    if (triColor) {
      return triColor;
    } else {
      return "OFF";
    }
  }

  getDynamicStyles() {
    return {
      leaderboard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECDCD'
      },
      leaderboard_header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: this.screenWidth*0.9,
        marginTop: 30
      },
      leaderboard_score: {
        width: this.screenWidth*0.8,
        height: 45,
        padding: 10,
        margin: 2,
        backgroundColor: '#403837',
        borderRadius: 5,
      },
      leaderboard_score_flex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      leaderboard_score_text_1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        marginLeft: 5,
        color: 'white',
        fontSize: 12
      },
      leaderboard_score_text_2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 10
      },
      leaderboard_score_text_3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'right',
        marginRight: 5,
        color: 'white',
        fontSize: 18
      },
      menuButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      backToMenu: {
        backgroundColor: '#BE3E2C',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5
      },
      menuText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
      },
      scoreText: {
        fontSize:20,
        padding:5,
        paddingLeft:8,
        paddingRight:8
      },
      emptyElement: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      scoreElement: {
        flex: 2.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      scoreBox: {
        backgroundColor: '#ff9900',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 5,
        width: '90%',
      }
    }
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        leaderboard: state.leaderboard
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);