import { connect } from 'react-redux';

import Header from '../components/interface/Header.js';
import MainBlock from '../components/interface/MainBlock.js';
import PanelBar from '../components/interface/PanelBar.js';

import {
  initializeBattlefield, changeDecisionMode, actionCloseBattleEndDialogSafely, actionProceedToNextRoom
} from '../ducks/battlefield.js'

const mapStateToProps = (state, own) => {
  let ID = state.battleFieldState.whoIsNext;
  let actioner = state.battleFieldState.battlers.find(battler => battler.ID == state.battleFieldState.whoIsNext) || {};
  let isMoving = true;

  let isPlayerBattlersAlive = state.battleFieldState.battlers
  .filter(el=>el.party === 'player')
  .some(battler => battler.HP > 0);

  let isAlive            = actioner.HP > 0;
  let { isPlayerTurn, isEnemyTurn } = state.battleFieldState;
  let isBattleFinished   = state.battleFieldState.battleState    !== 'BATTLE_IS_FINISHED';
  let isDecisionAttack   = state.battleFieldState.decisionMode   === 'DECISION_ATTACK';
  let isDecisionMovement = state.battleFieldState.decisionMode   === 'DECISION_MOVEMENT';
  let isDecisionSpell    = state.battleFieldState.decisionMode   === 'DECISION_SPELL';
  let isDecisionItem     = state.battleFieldState.decisionMode   === 'DECISION_ITEM';
  let isDecisionFlee     = state.battleFieldState.decisionMode   === 'DECISION_FLEE';

  return {
    state: state.battleFieldState,
    // TODO showing string None is not work
    actioner: actioner.name || 'None',
    isPlayerBattlersAlive,

    isMoving,
    isAlive,
    isBattleFinished,
    isDecisionAttack,
    isDecisionMovement,
    isDecisionSpell,
    isDecisionItem,
    isDecisionFlee,
    // TODO move derived properties as epics
    isAttackButtonDisabled:   !isAlive || !isMoving || !isBattleFinished || !isPlayerTurn,
    isMovementButtonDisabled: !isAlive || !isMoving || !isBattleFinished || !isPlayerTurn,
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onInitButonClick: () => {
      dispatch(initializeBattlefield())
    },
    onNextRoomButtonClick: () => {
      dispatch(actionProceedToNextRoom());
    },
    onHistoryClick: () => {},
    onAttackModeBtnClick: () => {
      dispatch(changeDecisionMode('DECISION_ATTACK'))
    },
    onMoveModeBtnClick: () => {
      dispatch(changeDecisionMode('DECISION_MOVEMENT'))
    },

    onCloseBattleEndDialog: () => {
      dispatch(actionCloseBattleEndDialogSafely());
    },
  }
}

export const VisibleMainBlock = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBlock)

export const VisibleHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export const VisiblePanelBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelBar)
