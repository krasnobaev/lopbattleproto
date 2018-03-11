import { connect } from 'react-redux';
import { attackBattler } from '../ducks/battlefield';
import BattleField from '../components/BattleField.js';

const mapStateToProps = (state, own) => {
  const {
    winner,
    history,
    battlers,
    xIsNext,
    stepNumber
  } = state.battleFieldState;

  return {
    state: (state || {}).battleFieldState,
    history,
    battlers,
    stepNumber,
    winner,
    xIsNext,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onAttackClick: iCell => {
      dispatch(attackBattler(iCell))
    },

    history: [{
      boardPositions: Array(9).fill('')
    }],
    battlers: [{
      ID: '',
      HP: 12,
      name: '_battlerTpl',
    }],
    stepNumber: 0,
    winner: '',
    xIsNext: false,
  }
}

const VisibleBattleField = connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleField)

export default VisibleBattleField
