import React from 'react';
import { StyleSheet,
         Text,
         View,
         TouchableOpacity } from 'react-native';
import GameMaster from './app/GameMaster';
import { Font } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
        fontLoaded : false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'NukamisoLite': require('./app/assets/fonts/NukamisoLite.ttf'),
    });
    this.setState({ fontLoaded : true });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.fontLoaded ? (
            <GameMaster />
          ) : null
        }
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
});
