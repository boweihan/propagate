import React from 'react';
import { StyleSheet } from 'react-native';
import Board from './Board';

export default class GameMaster extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Board size={6}/>
    );
  }
}

const styles = StyleSheet.create({
});
