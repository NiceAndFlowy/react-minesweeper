import React, { Component } from 'react';
import Square from './Square';

class Row extends Component {
  render() {
    const squares = this.props.rowData.map((square, index) => {
      return (
        <Square 
          value={square.isMine ? 99 : square.numMinesNearby}
          key={this.props.rowNum * this.props.numCols + index}
          square={square}
          onClick={this.props.onClick}
          onContextMenu={this.props.onContextMenu}
        />
      );
    });

    return (
      <tr><td>{squares}</td></tr>
    );
  }
}

export default Row;
