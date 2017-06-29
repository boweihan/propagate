import React from 'react';
import GameMaster from './app/GameMaster';
import { Audio, Font } from 'expo';
import Store from 'react-native-simple-store';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard : null
    }
        console.log('constructed');
  }

  async componentDidMount() {
    // todo: make a loading screen
    let leaderboard;
    await Font.loadAsync({
      'NukamisoLite': require('./app/assets/fonts/NukamisoLite.ttf'),
    });
    await Store.get("leaderboard").then( //initialize store to array if need be
      scores => {
        leaderboard = scores;
        if (!leaderboard) {
          leaderboard = [];
          Store.save("leaderboard", leaderboard);
        };
      });
    this.setState({ leaderboard : leaderboard });
  }

  render() {
    return this.state.leaderboard ? <GameMaster leaderboard={this.state.leaderboard} /> : null;
  }
}
