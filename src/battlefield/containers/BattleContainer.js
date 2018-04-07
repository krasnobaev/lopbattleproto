import { connect } from 'react-redux';
import { initializeBattlefield, perfrormPlayerAttack, battlefieldCellClick } from '../ducks/battlefield';
import { BattleField } from '../components/battle/BattleField.js';
import { Battler, Battlerstring } from '../components/battle/Battler.js';

const mapStateToProps = (state, own) => {
  let actioner = state.battleFieldState.battlers.find(battler => battler.ID == state.battleFieldState.whoIsNext) || {};
  let isMoving = own.ID == state.battleFieldState.whoIsNext;

  let isAlive  = (own || {}).HP > 0;
  let { isPlayerTurn, isEnemyTurn } = state.battleFieldState;
  let isBattleFinished   = state.battleFieldState.battleState    !== 'BATTLE_IS_FINISHED';
  let isDecisionAttack   = state.battleFieldState.decisionMode   === 'DECISION_ATTACK';
  let isDecisionMovement = state.battleFieldState.decisionMode   === 'DECISION_MOVEMENT';
  let isDecisionSpell    = state.battleFieldState.decisionMode   === 'DECISION_SPELL';
  let isDecisionItem     = state.battleFieldState.decisionMode   === 'DECISION_ITEM';
  let isDecisionFlee     = state.battleFieldState.decisionMode   === 'DECISION_FLEE';

  return {
    state: state.battleFieldState,
    thisBattler: state.battleFieldState.battlers.find(el=>el.ID == own.ID),
    actioner,

    isMoving,
    isAlive,
    isBattleFinished,
    isDecisionAttack,
    isDecisionMovement,
    isDecisionSpell,
    isDecisionItem,
    isDecisionFlee,
    // TODO move derived properties as epics
    isAttackButtonDisabled:   !isDecisionAttack   || !isAlive || isMoving || !isBattleFinished || !isPlayerTurn,
    isMovementButtonDisabled: !isDecisionMovement || !isAlive || isMoving || !isBattleFinished || !isPlayerTurn,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onBattleFieldLoad: () => {
      dispatch(initializeBattlefield());
    },
    onAttackClick: () => {
      dispatch(perfrormPlayerAttack(own.ID))
    },
    onCellClick: (iCell, cellOccupation) => {
      dispatch(battlefieldCellClick(iCell, cellOccupation))
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
