import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Board from './Board';
import './Game.sass';

class Game extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.winner !== this.props.winner) {
      this.setState({ winner: nextProps.state.winner });
    }
  }

  render() {
    const moves = this.props.state.history.map((step, move) => {
      return (
        <li key={move}>
          <button onClick={this.props.onHistoryClick.bind(this, move)}>
            {move ? `Go to move #${move}` : 'Go to game start'}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            boardPositions={this.props.state.history[this.props.state.stepNumber].boardPositions}
            onClick={this.props.onBoardClick}
          />
        </div>
        <div className="game-info">
          <div>{(this.props.state.winner) ?
            `Winner: ${this.props.state.winner}` :
            `Next player: ${this.props.state.xIsNext ? 'X' : 'O'}`
          }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onBoardClick: PropTypes.func.isRequired,
  onHistoryClick: PropTypes.func.isRequired,

  history: PropTypes.arrayOf(
    PropTypes.shape({
      boardPositions: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  stepNumber: PropTypes.number.isRequired,
  winner: PropTypes.string.isRequired,
  xIsNext: PropTypes.bool.isRequired
}

export default Game
