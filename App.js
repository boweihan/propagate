import React from 'react';
import { StyleSheet } from 'react-native';
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
    if (this.state.fontLoaded) {
      return <GameMaster />
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
});
