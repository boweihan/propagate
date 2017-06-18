import React from 'react';
import { StyleSheet,
         View } from 'react-native';
import Board from './Board';
import Menu from './Menu';

export default class GameMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      route : {
        menu : true,
        game : false
      },
      level : 0,
      firstLoad : true
    }
    this.levelUp = this.levelUp.bind(this);
    this.setRoute = this.setRoute.bind(this);
    this.newGame = this.newGame.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
  }

  levelUp() {
    let newLevel = this.state.level + 1;
    this.setState({
      level : newLevel
    });
  }

  newGame() {
    this.setState({
      route : { menu : false, game : true },
      level : 0,
      firstLoad : false
    });
  }

  handleGameOver() {
    this.setState({
      route : { menu : true, game : false },
      firstLoad : true
    });
  }

  setRoute(route) {
    switch (route) {
      case 'game':
        // set firstLoad to false as soon as you get into the game
        this.setState({ route : { menu : false, game : true }, firstLoad : false}); break;
      case 'menu':
        this.setState({ route : { menu : true, game : false }}); break;
    }
  }

  getStateForLevel() {
    let state = {};
    if (this.state.level < 1) { state.size = 3; state.moves = 5 }
    else if (this.state.level >= 1 && this.state.level < 2) { state.size = 4; state.moves = 10 }
    else if (this.state.level >= 2 && this.state.level < 3) { state.size = 5; state.moves = 15 }
    else { state.size = 6; state.moves = 20}
    return state;
  }

  render() {
    let levelState = this.getStateForLevel();
    let menu = this.state.route.menu ?
      <Menu setRoute={this.setRoute} newGame={this.newGame}
        firstLoad={this.state.firstLoad}/> : null;
    let board = this.state.route.game ?
      <Board size={levelState.size} moves={levelState.moves} newGame={this.newGame}
        key={this.state.level} level={this.state.level} levelUp={this.levelUp}
        gameOver={this.handleGameOver} setRoute={this.setRoute} /> : null

    return (
      <View style={styles.gameMaster}>
        {menu}
        {board}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameMaster: {
    flex: 1
  }
});
