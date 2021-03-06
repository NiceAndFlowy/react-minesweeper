import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.createTable(props),
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.difficulty !== nextProps.difficulty || (this.props.numSquaresRevealed > nextProps.numSquaresRevealed)) {
      this.setState(() => {
        return ({table: this.createTable(nextProps)});
      });
    }
  }

  createTable(props) {
    // fill table with empty squares
    const table = [];
    for (let row=0; row<props.numRows; row++) {
      table.push([]);
      for (let col=0; col<props.numCols; col++) {
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
    for (let i=0; i<props.numMines; i++) {
      const randomRow = Math.floor(Math.random() * props.numRows);
      const randomCol = Math.floor(Math.random() * props.numCols);
      
      if (table[randomRow][randomCol].isMine) {
        i--;
      } else {
        table[randomRow][randomCol].isMine = true;
      }
    }
    return table;
  }

  handleClick = (event, square) => {
    if (square.isFlagged || square.isShown) return;
    
    const numMines = this.countNumMines(square);
    this.updateSquare(square);
    this.props.incrementRevealedSquareCount();

    if (square.numMinesNearby === 0) {
      this.revealSurroundingSquares(square);
    }

    if (square.isMine) {
      this.props.setGameOver();
    }
    this.props.setIfGameWon();
    
  }
  
  handleFlagClick = (event, square) => {
    event.preventDefault();
    
    if (square.isShown) return;
    

    // Toggle flag
    const tableCopy = this.state.table.slice();
    tableCopy[square.row][square.col].isFlagged = !tableCopy[square.row][square.col].isFlagged;
    this.setState(() => { ({table: tableCopy}) });
    this.props.updateFlagCount(tableCopy[square.row][square.col].isFlagged);
    this.props.setIfGameWon();
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
          this.handleClick(null, this.state.table[square.row + row][square.col + col]);
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
          onContextMenu={this.handleFlagClick}       
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

Board.propTypes = {
  difficulty: PropTypes.string.isRequired,
  numSquaresRevealed: PropTypes.number.isRequired,
  incrementRevealedSquareCount: PropTypes.func.isRequired,
  setGameOver: PropTypes.func.isRequired,
  setIfGameWon: PropTypes.func.isRequired,
  updateFlagCount: PropTypes.func.isRequired,
};

export default Board;
