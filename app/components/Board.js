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
  
  // componentWillMount() {
  //   this.setState(() => {
  //     return ({
  //       table: this.createTable(this.props)
  //     })
  //   });
  // }
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
    const tableCopy = this.state.table.slice();
    tableCopy[square.row][square.col].numMinesNearby = this.countNumMines(square);
    this.setState(() => {
      return (
        {table: tableCopy}
      );
    })
    // showNumAdjacentMines()
    //  - countNumMines()
    //  
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
