import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing,
         TouchableHighlight } from 'react-native';

export default class Menu extends React.Component {
  render() {
    return (
      <View style={styles.menu}>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={styles.prop} numberOfLines={2}>PROP
            <Text style={styles.agate}>AGATE</Text>
          </Text>
        </View>
        {!this.props.firstLoad ?
          <TouchableHighlight underlayColor='white' activeOpacity={0.5}
            onPress={() => this.props.setRoute('game')}>
            <View style={styles.startButton}>
              <Text style={styles.startText}>CONTINUE</Text>
            </View>
          </TouchableHighlight>
        : null}
        <TouchableHighlight underlayColor='white' activeOpacity={0.5}
          onPress={() => this.props.newGame()}>
          <View style={styles.startButton}>
            <Text style={styles.startText}>NEW GAME</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

/* ----------------------------- static styling ------------------------------*/
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  prop : {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#403837",
    fontSize: 25,
    fontFamily: "NukamisoLite"
  },
  agate : {
    color: "#BE3E2C",
    fontFamily: "NukamisoLite"
  },
  startButton : {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6'
  },
  startText : {
    fontWeight: 'bold',
    fontSize: 15,
    color: "#7c6c6a",
    fontFamily: "NukamisoLite"
  }
});
