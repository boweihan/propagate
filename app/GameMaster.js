import React from 'react';
import { StyleSheet,
         View } from 'react-native';
import Board from './Board';
import Menu from './Menu';
import LeaderBoard from './LeaderBoard';

export default class GameMaster extends React.Component {
  constructor() {
    super();
    this.state = {
      route : {
        menu : true,
        game : false,
        leaderboard : false
      },
      level : 1,
      score : 0,
      firstLoad : true,
      boardStateCache : null
    }
    this.levelUp = this.levelUp.bind(this);
    this.setRoute = this.setRoute.bind(this);
  }

  levelUp() {
    let newLevel = this.state.level + 1;
    let newScore = (this.state.score + 10) + this.state.level;
    this.setState({
      level : newLevel,
      score : newScore
    });
  }

  /**
  * Poor man's router
  * @param {String} route - route name
  * @param {Object} boardState - boardState if cached (OPTIONAL)
  */
  setRoute(route, boardState) {
    switch (route) {
      case 'game':
        this.setState({
          route: { menu : false, game : true, leaderboard : false },
          firstLoad : false
        }); break;
      case 'menu':
        let boardStateCache = boardState ? boardState : null;
        this.setState({
          route : { menu : true, game : false, leaderboard : false },
          boardStateCache : boardStateCache
        }); break;
      case 'leaderboard':
        this.setState({
          route : { menu : false, game: false, leaderboard : true }
        }); break;
      case 'gameOver':
        this.setState({
          route : { menu : true, game : false, leaderboard : false },
          level : 1,
          score : 0,
          firstLoad : true,
          boardStateCache : null
        }); break;
      case 'newGame':
        this.setState({
          route : { menu : false, game : true, leaderboard : false },
          level : 1,
          score : 0,
          firstLoad : false,
          boardStateCache : null
        }); break;
    }
  }

  getStateForLevel() { // TODO: better way to do levels
    let state = {};
    if (this.state.level < 6) {
      state.size = 3; state.moves = 15
    } else if (this.state.level >= 6 && this.state.level < 11) {
      state.size = 4; state.moves = 20
    } else if (this.state.level >= 11 && this.state.level < 16) {
      state.size = 5; state.moves = 25
    } else {
      state.size = 6; state.moves = 30
    }
    return state;
  }

  render() {
    let levelState = this.getStateForLevel();
    let menu = this.state.route.menu ?
      <Menu setRoute={this.setRoute} firstLoad={this.state.firstLoad} /> : null;
    let board = this.state.route.game ?
      <Board size={levelState.size} moves={levelState.moves}
        key={this.state.level} level={this.state.level} levelUp={this.levelUp}
        score={this.state.score} setRoute={this.setRoute}
        boardStateCache={this.state.boardStateCache} /> : null
    let leaderboard = this.state.route.leaderboard ?
      <LeaderBoard setRoute={this.setRoute} /> : null

    return (
      <View style={styles.gameMaster}>
        {menu}
        {board}
        {leaderboard}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameMaster: {
    flex: 1
  }
});
