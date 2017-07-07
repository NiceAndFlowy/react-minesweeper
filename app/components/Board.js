import React, { Component } from 'react';
import Square from './Square';
import Row from './Row';
const BOARD_ROWS = 9;
const BOARD_COLUMNS = 9;

class Board extends Component {
  render() {
    let board = [];
    for (let i=0; i<BOARD_ROWS; i++) {
      board.push(<Row numCols={BOARD_COLUMNS} rowNum={i}/>);
    }
    return (
      <table>
        {board};
      </table>
    );
  }
}

export default Board;