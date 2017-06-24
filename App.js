import React from 'react';
import GameMaster from './app/GameMaster';
import { Audio, Font } from 'expo';
import Store from 'react-native-simple-store';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded : false
    }
    Store.get("leaderboard").then( //initialize store to array if need be
      leaderboard => {
        if (!leaderboard) {
          Store.save("leaderboard", []);
        };
      });
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
