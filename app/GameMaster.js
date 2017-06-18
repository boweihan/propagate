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
      level : 0
    }
    this.levelUp = this.levelUp.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  levelUp() {
    let newLevel = this.state.level + 1;
    this.setState({
      level : newLevel
    });
  }

  getSizeForLevel() {
    let size;
    if (this.state.level < 1) {
      size = 3;
    } else if (this.state.level >= 1 && this.state.level < 2) {
      size = 4;
    } else if (this.state.level >= 2 && this.state.level < 3) {
      size = 5;
    } else {
      size = 6;
    }
    return size;
  }

  startGame() {
    this.setState({
      route : {
        menu : false,
        game : true
      }
    })
  }

  render() {
    let menu = this.state.route.menu ?
      <Menu startGame={this.startGame}/> : null;
    let board = this.state.route.game ?
      <Board size={this.getSizeForLevel()} key={this.state.level}
        level={this.state.level} levelUp={this.levelUp}/> : null

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
