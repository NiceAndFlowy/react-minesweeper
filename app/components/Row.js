import React, { Component } from 'react';
import Square from './Square';

class Row extends Component {
  render() {
    let squares = [];
    for (let i=0; i<this.props.numCols; i++) {
      let squareNum = (this.props.rowNum * this.props.numCols) + (i*1) + 1;
      squares.push(<Square value={squareNum} />);
    }

    return (
      <tr>{squares}</tr>
    );
  }
}

export default Row;