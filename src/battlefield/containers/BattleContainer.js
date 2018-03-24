import { connect } from 'react-redux';
import { attackBattler } from '../ducks/battlefield';
import BattleField from '../components/battle/BattleField.js';
import { Battler, Battlerstring } from '../components/battle/Battler.js';

const mapStateToProps = (state, own) => {
  return {
    state: state.battleFieldState,
    thisBattler: state.battleFieldState.battlers.find(el=>el.ID == own.ID),
    isMoving: own.ID == state.battleFieldState.whoIsNext,
    isAlive: own.HP > 0,
    isBattleActive: state.battleFieldState.battleState !== 'BATTLE_IS_FINISHED',
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onAttackClick: () => {
      dispatch(attackBattler(own.ID))
    },
  }
}

export const VisibleBattleField = connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleField)

export const VisibleBattler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Battler)

export const VisibleBattlerstring = connect(
  mapStateToProps,
  mapDispatchToProps
)(Battlerstring)
