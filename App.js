import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board : ["one", "two", "three"],
    };
  }

  renderBoard() {
    for (let i = 0; i < this.state.board.length; i++) {
        
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBoard()}
        {this.state.board.map(function(field, i) {
          return <Text key={i}>{field}</Text>
        })}
      </View>
      // <View style={styles.container}>
      //   <Text>Open up App.js to starterrrr working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
