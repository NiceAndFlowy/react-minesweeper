import React, { Component } from 'react';
import Row from './Row';
const BOARD_ROWS = 9;
const BOARD_COLUMNS = 9;
const NUM_MINES = 10;
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.createTable(props),
    }
    console.log('The table is filled');
  }
  
  createTable(props) {
    // fill table with empty squares
    const table = [];
    for (let row=0; row<this.props.numRows; row++) {
      table.push([]);
      for (let col=0; col<this.props.numCols; col++) {
        table[row].push({
          isMine: false,
          isFlagged: false,
          isShown: false,
          numMinesNearby: 0,
          col: col,
          row: row,
        })
      }
    } 
    // fill with mines
    for (let i=0; i<this.props.numMines; i++) {
      const randomRow = Math.floor(Math.random() * this.props.numRows);
      const randomCol = Math.floor(Math.random() * this.props.numCols);
      
      if (table[randomRow][randomCol].isMine) {
        i--;
      } else {
        table[randomRow][randomCol].isMine = true;
        console.log(`this row col isEgg ${randomRow} ${randomCol}`);
      }
    }
    return table;
  }

  handleClick = (square, event) => {
    // while the num of mines = 0 -> recursively display the surrounding mines
    // showNumAdjacentMines()
    //  - countNumMines()
    // keep recursively showing all the 0s until it reaches a mine or a number
    console.log("handleClick");
    // if (this.countNumMines(square) == 0) {
    //   while ()
    //   // if its a number or a mine it stops
    //   if (this.countNumMines(square) > 0 && this.countNumMines(square) < 99 ) {
    //     console.log('revealMine is called');
    //     return this.revealMine(square);
    //   }
      
    //   for (let row=-1; row<=1; row++) {
    //     for (let col=-1; col<=1; col++) {
    //       console.log(`this.handleClick([${square.row + row}][${square.col+col}])`);
    //       if ((square.row + row) >= 0 
    //       && (square.row + row) < this.state.table.length 
    //       && (square.col + col) >= 0 
    //       && (square.col + col) < this.state.table[0].length) {
    //         console.log("I'm looping");
    //         return this.handleClick(this.state.table[square.row + row][square.col + col], event);

    //       }
          
    //     }
    //   }
    // }
      
    // else {
    //   return this.revealMine(square);
    // }
    console.log(square);
    const numMines = this.countNumMines(square);
    this.updateSquare(square);

    if(square.numMinesNearby === 0) {
      this.revealSurroundingSquares(square);
    }
  }
  
  handleFlagClick = (index, event) => {
    // grab the clicked square and toggle isFlagged 
  }

  countNumMines = (square) => {
    // Check every square around "square"
    let numMines = 0;
    for (let row=-1; row<=1; row++) {
      for (let col=-1; col<=1; col++) {
        // Check if the currentSquare is out of bounds
        if ((square.row + row) >= 0 
        && (square.row + row) < this.state.table.length 
        && (square.col + col) >= 0 
        && (square.col + col) < this.state.table[0].length
        && (this.state.table[square.row + row][square.col + col].isMine)) numMines++;
      }
    }
    return numMines;
  }
  
  updateSquare = (square) => {
    if (square.isShown) return;

    const tableCopy = this.state.table.slice();
    tableCopy[square.row][square.col].numMinesNearby = this.countNumMines(square);
    tableCopy[square.row][square.col].isShown = true;
    this.setState(() => {
      return (
        {table: tableCopy}
      );
    });
  }

  revealSurroundingSquares = (square) => {
    for (let row=-1; row<=1; row++) {
      for (let col=-1; col<=1; col++) {
        if ((square.row + row) >= 0 
        && (square.row + row) < this.state.table.length 
        && (square.col + col) >= 0 
        && (square.col + col) < this.state.table[0].length
        && !(this.state.table[square.row + row][square.col + col].isMine)
        && !(this.state.table[square.row + row][square.col + col].isShown)) {
          this.handleClick(this.state.table[square.row + row][square.col + col], null);
        }
      }
    }
  }

  render() {
    const boardDisplay = this.state.table.map((row, index) => {
      return (
        <Row 
          numCols={this.props.numCols} 
          rowNum={index} 
          rowData={row} 
          key={index}
          onClick={this.handleClick}          
          />
      );
    });

    return (
      <table>
        <tbody>
          {boardDisplay}
        </tbody>
      </table>
    );
  }
}

export default Board;
