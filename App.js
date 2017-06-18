import React from 'react';
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
    return this.state.fontLoaded ? <GameMaster /> : null;
  }
}
