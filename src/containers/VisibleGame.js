import { connect } from 'react-redux';
import { chooseCell, chooseStep } from '../ducks/tictacboard';
import Game from '../components/Game.js';

const mapStateToProps = (state, own) => {
  const {
    winner,
    history,
    xIsNext,
    stepNumber
  } = state.boardState;

  return {
    state: (state || {}).boardState,
    history,
    stepNumber,
    winner,
    xIsNext,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onBoardClick: iCell => {
      dispatch(chooseCell(iCell))
    },
    onHistoryClick: iStep => {
      dispatch(chooseStep(iStep))
    },

    stepNumber: 0,
    winner: '',
    xIsNext: false,
    history: [{
      boardPositions: Array(9).fill('')
    }],
  }
}

const VisibleGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default VisibleGame
