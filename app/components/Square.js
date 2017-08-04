import React, { Component } from 'react';

class Square extends Component {
  revealSquare = (e)=> {
    this.props.onClick(e, this.props.square);
  }
  flagSquare = (e)=> {
    this.props.onContextMenu(e, this.props.square);
  }
  render() {
    return (
      <button 
        className={"square" + (this.props.square.isShown ? ` shown value${this.props.square.numMinesNearby}` : "") + (this.props.square.isMine ? " mine" : "") + 
        (this.props.square.isFlagged ? " flag" : "")} 
        type="button"
        onClick={this.revealSquare}
        onContextMenu={this.flagSquare}
      >
        {!this.props.square.isMine &&  !this.props.square.isFlagged && this.props.square.isShown &&this.props.value}
      </button>
    );
  }
}

export default Square;
