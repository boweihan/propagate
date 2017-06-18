import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity,
         Animated,
         Easing,
         TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

export default class BoardMenu extends React.Component {
  render() {
    return (
      <View style={styles.boardMenu}>
        <View style={styles.innerMainMenu}>
          <TouchableHighlight underlayColor='white' activeOpacity={0.5}
            onPress={() => this.props.setRoute('menu')}>
            <View style={styles.backToMenu}>
              <Text style={styles.backToMenuText}>Menu</Text>
            </View>
          </TouchableHighlight>
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
    alignItems: 'center'
  },
  innerMainMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width*0.9
  },
  backToMenu: {
    backgroundColor: '#BE3E2C',
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3
  },
  backToMenuText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  }
});
