import React from 'react';
import { StyleSheet,
         View } from 'react-native';
import Board from './Board';

export default class GameMaster extends React.Component {
  constructor() {
    super();
  }

  _setMode
  render() {
    return (
      <Board size={6} />
    );
  }
}

const styles = StyleSheet.create({});
