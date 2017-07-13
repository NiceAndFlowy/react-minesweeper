import React, { Component } from 'react';
import Board from './Board';

class Minesweeper extends Component {
  render() {
    return (
      <Board numRows={9} numCols={9} numMines={10} totalSquares={9*9}/>
    );
  }
}

export default Minesweeper;

