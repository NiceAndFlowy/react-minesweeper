import React, { Component } from 'react';
import Board from './Board';

class Minesweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numRows: 9,
      numCols: 9,
      numMines: 10,
      numFlagsRemaining: 10,
      numSquaresRevealed: 0,
      timeElapsed: 0,
      difficulty: 'easy',
      gameStatus: 'playing'
    }
  }


  reset = () => {
    switch (this.state.difficulty) {
      case 'easy': 
        this.setEasy();
        break;
      case 'medium': 
        this.setMedium();
        break;
      case 'hard': 
        this.setHard();
        break;
    }
  }

  incrementRevealedSquareCount = () => {
    if (this.state.numSquaresRevealed === 0) {
      console.log("yes it is 0 revealed");
      this.updateTimeElapsed();
    }
    this.setState((prevState) => ({
      numSquaresRevealed: prevState.numSquaresRevealed + 1
    }));    
  }

  gameOver = () => {
    this.setState({gameStatus: 'gameOver'});
    clearInterval(this.interval);
    this.timer = false;
  }

  setEasy = () => {
    clearInterval(this.interval);
    this.timer = false;
    this.setState(() => {
      return ({
        difficulty: 'easy',
        numRows: 9,
        numCols: 9,
        numMines: 10,
        numFlagsRemaining: 10,
        timeElapsed: 0,
        numSquaresRevealed: 0,
        gameStatus: 'playing'
      })
    });
    console.log('seteasy');
  }

  setMedium = () => {
    clearInterval(this.interval);
    this.timer = false;
    this.setState(() => {
      return ({
        difficulty: 'medium',
        numRows: 16,
        numCols: 16,
        numMines: 40,
        numFlagsRemaining: 40,
        numSquaresRevealed: 0,
        timeElapsed: 0,
        gameStatus: 'playing'
      })
    });
    console.log('setmed');
  }

  setHard = () => {
    clearInterval(this.interval);
    this.timer = false;
    this.setState(() => {
      return ({
        difficulty: 'hard',
        numRows: 20,
        numCols: 20,
        numMines: 100,
        numFlagsRemaining: 100,
        numSquaresRevealed: 0,
        timeElapsed: 0,
        gameStatus: 'playing'
      })
    });
    console.log('sethard');
  }

  tick = () => {
    this.setState({timeElapsed: this.state.timeElapsed + 1});
  }
  updateTimeElapsed = ()=> {
    if (this.timer) {
      return;
    }
    this.interval = setInterval(this.tick, 1000);
    this.timer = true;
  }
  // Radio button onChange only fires once if checkedproperty isnt defined
  render() {
    return (
      <div>
        <button onClick={this.reset}>Reset</button>
        <div>Time elapsed: {this.state.timeElapsed}</div>
        <div className="difficulty-menu">
          <label htmlFor="easy">Easy</label>
         <input 
            type="radio" 
            name="difficulty" 
            value="easy"
            checked={this.state.difficulty === 'easy'}
            onChange={this.setEasy}
          />
          
          <label htmlFor="medium">Medium</label>
          <input 
            type="radio" 
            name="difficulty" 
            value="medium"
            checked={this.state.difficulty === 'medium'}
            onChange={this.setMedium}
          />
          
          <label htmlFor="hard">Hard</label>
          <input 
            type="radio" 
            name="difficulty" 
            value="hard"
            checked={this.state.difficulty === 'hard'}
            onChange={this.setHard}
          />
        </div>
        <Board 
          numRows={this.state.numRows} 
          numCols={this.state.numCols} 
          numMines={this.state.numMines} 
          numFlagsRemaining={this.state.numFlagsRemaining}
          numSquaresRevealed={this.state.numSquaresRevealed}
          timeElapsed={this.state.timeElapsed}
          difficulty={this.state.difficulty}
          incrementRevealedSquareCount={this.incrementRevealedSquareCount}
          setGameOver={this.gameOver}
        />
      </div>
      
    );
  }
}

export default Minesweeper;

