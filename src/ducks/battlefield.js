import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

/* actions */

const INITIALIZE_BATTLEFIELD = 'INITIALIZE_BATTLEFIELD'

const ATTACK_BATTLER = 'ATTACK_BATTLER'
const MAKE_THE_ATTACK = 'MAKE_THE_ATTACK'
const CHECK_WHETHER_BATTLE_IS_COMPLETED = 'CHECK_WHETHER_BATTLE_IS_COMPLETED'
const PREPARE_NEXT_STEP = 'PREPARE_NEXT_STEP'

/* action creators */

export const initializeBattlefield = oInitialState => {
  return { type: 'INITIALIZE_BATTLEFIELD', oInitialState };
}

export const attackBattler = iBattler => {
  return { type: 'ATTACK_BATTLER', iBattler };
}

const makeTheAttack = iBattler => {
  return { type: 'MAKE_THE_ATTACK', iBattler };
}

const checkWhetherBattleIsCompleted = iBattler => {
  return { type: 'CHECK_WHETHER_BATTLE_IS_COMPLETED', iBattler };
}

const prepareNextStep = () => {
  return { type: 'PREPARE_NEXT_STEP' };
}

/* epics */

const attackEpic = (action$, store) => action$
  .ofType(ATTACK_BATTLER)
  .mergeMap(action => [
    makeTheAttack(action.iBattler),
    checkWhetherBattleIsCompleted(), // TODO if not true not do next step
    prepareNextStep()
  ]);

export const rootEpic = combineEpics(
  attackEpic
);

/* reducers */

let whatHappens = '';

const battleFieldState = (state = {
  battlers: [],
  history: [],
  battleState: 'BATTLE_IS_INPROGRESS',
  moveid: 1,
}, {
  type,
  oInitialState,
  iBattler
} = action) => {
  let battlers = (state.battlers).slice();
  let attacker = state.battlers.find(el=>el.ID == state.whoIsNext);

  switch (type) {
    case INITIALIZE_BATTLEFIELD:
      return oInitialState;
    case MAKE_THE_ATTACK:
      battlers.find(el=>el.ID == iBattler).HP -= attacker.ATK;

      let attackerName = battlers.find(battler => battler.ID == attacker.ID).name;
      let attackedName = battlers.find(battler => battler.ID == iBattler).name;
      whatHappens = `MAKE_THE_ATTACK (${attackerName} => ${attackedName}) -${attacker.ATK}`;

      return Object.assign({}, state, {
        battlers,
      });
    case CHECK_WHETHER_BATTLE_IS_COMPLETED:
      let bInprogress = battlers
        .filter(battler => battler.party === 'player')
        .some(battler=>battler.HP>0) && battlers
        .filter(battler => battler.party === 'enemy')
        .some(battler=>battler.HP>0);

      return Object.assign({}, state, {
        battleState: bInprogress ? 'BATTLE_IS_INPROGRESS' : 'BATTLE_IS_FINISHED',
        whoIsNext: bInprogress ? state.whoIsNext : '',
      });
    case PREPARE_NEXT_STEP:
      let aliveBattlers = battlers.filter(el=>el.HP>0);
      let whoIsNext = aliveBattlers[Math.floor(Math.random() * aliveBattlers.length)].ID;
      let wh = whatHappens;
      whatHappens = '';

      return Object.assign({}, state, {
        history: state.history.slice(0, state.moveid+1).concat([{
          battlers: state.battlers,
          whoIsNext: (state.battleState === 'BATTLE_IS_INPROGRESS') ? whoIsNext : '',
          battleState: state.battleState,
          moveid: state.moveid,
          whatHappens: wh,
        }]),
        whoIsNext: (state.battleState === 'BATTLE_IS_INPROGRESS') ? whoIsNext : '',
        moveid: state.moveid + 1,
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  battleFieldState
})
