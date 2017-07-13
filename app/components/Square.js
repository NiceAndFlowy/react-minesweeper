import React, { Component } from 'react';

class Square extends Component {
  revealSquare = ()=> {
    this.props.onClick(this.props.square);
  }
  render() {
    return (
      <button 
        className="square" 
        type="button"
        onClick={this.revealSquare}
        >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
