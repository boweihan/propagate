import React from 'react';
import { StyleSheet,
         View } from 'react-native';
import Board from './Board';

export default class GameMaster extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Board size={6}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CECDCD',
  }
});
