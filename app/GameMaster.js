import React from 'react';
import { StyleSheet,
         View } from 'react-native';
import Board from './Board';

export default class GameMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      level : 0
    }
    this.levelUp = this.levelUp.bind(this);
  }

  levelUp() {
    console.log('leveling up');
    let newLevel = this.state.level + 1;
    this.setState({
      level : newLevel
    });
  }

  render() {
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
    return (
      <Board size={size} key={this.state.level} level={this.state.level} levelUp={this.levelUp}/>
    );
  }
}

const styles = StyleSheet.create({});
