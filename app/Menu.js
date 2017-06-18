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
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.prop} numberOfLines={2}>PROP
            <Text style={styles.agate}>AGATE</Text>
          </Text>
        </View>
        <TouchableHighlight underlayColor='white' activeOpacity={0.5}
          onPress={() => this.props.startGame()}>
          <View style={styles.startButton}>
            <Text style={styles.startText}>START</Text>
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
    marginTop: 20,
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  startText : {
    fontWeight: 'bold',
    fontSize: 20
  }
});
