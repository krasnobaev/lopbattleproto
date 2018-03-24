import { connect } from 'react-redux';
import Header from '../components/interface/Header.js';
import { initializeBattlefield } from '../ducks/battlefield.js'
import { store, proceedToNextRoom, getInitializedStore } from '../ducks/store.js'
import PanelBar from '../components/interface/PanelBar.js';

const mapStateToProps = (state, own) => {
  return {
    state: state.battleFieldState,
    // TODO showing string None is not work
    actioner: state.battleFieldState.battlers.find(battler => battler.ID == state.battleFieldState.whoIsNext).name || 'None',
    isPlayerBattlersAlive: state.battleFieldState.battlers.filter(el=>el.party === 'player')
    .some(battler => battler.HP > 0),
    isBattleFinished: state.battleFieldState.battleState === 'BATTLE_IS_FINISHED',
  }
}

const mapDispatchToProps = (dispatch, own) => {
  return {
    dispatch,
    onInitButonClick: () => {
      dispatch(initializeBattlefield(getInitializedStore().battleFieldState))
    },
    onNextRoomButtonClick: () => {
      dispatch(initializeBattlefield(proceedToNextRoom(store.getState()).battleFieldState))
    },
    onHistoryClick: () => {},
  }
}

export const VisibleHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export const VisiblePanelBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelBar)
