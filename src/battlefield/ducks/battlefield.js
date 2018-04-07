import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { toast } from 'react-toastify';

import { getRandomRoom, getNextRoom } from '../lib/battlefield.js'

import {
  checkWhetherTotalHitIsHappen, checkWhetherLuckyHitIsHappen, checkWhetherEvadeIsHappen, checkWhetherLuckyEvadeIsHappen, checkWhetherMissIsHappen
} from '../lib/formulaes'

/* actions */

const INITIALIZE_BATTLEFIELD = 'INITIALIZE_BATTLEFIELD';
const INITIALIZE_ROOM = 'INITIALIZE_ROOM';
const NOTIFY = 'NOTIFY';
const NOTIFY_HP_LOOSE = 'NOTIFY_HP_LOOSE';
const PLAYER_ATTACK_BATTLER = 'PLAYER_ATTACK_BATTLER';
const ENEMY_MAKE_DECISION = 'ENEMY_MAKE_DECISION';

const CHANGE_DECISION_MODE = 'CHANGE_DECISION_MODE';

/* attack actions */

const ATTACK_BATTLER = 'ATTACK_BATTLER'; // TODO merge with BATTLEFIELD_CELL_CLICK
const TOTAL_HIT_IS_HAPPEN = 'TOTAL_HIT_IS_HAPPEN';
const LUCKY_HIT_IS_HAPPEN = 'LUCKY_HIT_IS_HAPPEN';
const EVADE_IS_HAPPEN = 'EVADE_IS_HAPPEN';
const LUCKY_EVADE_IS_HAPPEN = 'LUCKY_EVADE_IS_HAPPEN';
const MISS_IS_HAPPEN = 'MISS_IS_HAPPEN';
const NO_BONUS_ATTACK = 'NO_BONUS_ATTACK';
const NO_BONUS_HIT_IS_HAPPEN = 'NO_BONUS_HIT_IS_HAPPEN';
const MAKE_THE_ATTACK = 'MAKE_THE_ATTACK';

/* movement actions */

const BATTLEFIELD_CELL_CLICK = 'BATTLEFIELD_CELL_CLICK'; // TODO merge with ATTACK_BATTLER
const CHANGE_BATTLER_POSITION = 'CHANGE_BATTLER_POSITION';

/* ending actions */

const PREPARE_NEXT_STEP = 'PREPARE_NEXT_STEP';
const FINISH_CURRENT_STEP = 'FINISH_CURRENT_STEP';
const BATTLE_IS_COMPLETED = 'BATTLE_IS_COMPLETED';
const BATTLE_END_DIALOG = 'BATTLE_END_DIALOG';
const CLOSE_BATTLE_END_DIALOG_SAFELY = 'CLOSE_BATTLE_END_DIALOG_SAFELY';
const PROCEED_NEXT_ROOM = 'PROCEED_NEXT_ROOM';

/* action creators */

export const initializeBattlefield = (oInitialState) => {
  return { type: 'INITIALIZE_BATTLEFIELD', oInitialState };
}
export const actionInitializeRoom = (oInitialState) => {
  return { type: INITIALIZE_ROOM, oInitialState };
}
const SAME_PLAYER_BATTLERS = 'SAME_PLAYER_BATTLERS';
const RAND_PLAYER_BATTLERS = 'RAND_PLAYER_BATTLERS';
const actionInitializeBattlefield = (fromState = RAND_PLAYER_BATTLERS) => {
  return { type: 'INITIALIZE_BATTLEFIELD2', fromState };
}
const actionNotify = (what) => {
  return { type: 'NOTIFY', what };
}
const actionNotifyHpLoose = () => {
  return { type: 'NOTIFY_HP_LOOSE' };
}
const actionEnemyMakeDecision = () => {
  return { type: ENEMY_MAKE_DECISION };
}
const actionDispatchEnemyMove = ({ decision, params: {subj, iNewPosition} }) => {
  return { type: decision, subj, iNewPosition };
}

export const changeDecisionMode = decisionMode => {
  return { type: 'CHANGE_DECISION_MODE', decisionMode };
}

/* attack action creatrors */

export const perfrormPlayerAttack = (subj) => {
  return { type: 'PLAYER_ATTACK_BATTLER', subj };
}
const attackBattler = (subj) => {
  return { type: 'ATTACK_BATTLER', subj };
}

const actionTotalHitIsHappen = (subj) => {
  return { type: 'TOTAL_HIT_IS_HAPPEN', subj };
}
const actionLuckyHitIsHappen = (subj) => {
  return { type: 'LUCKY_HIT_IS_HAPPEN', subj };
}
const actionEvadeIsHappen = (subj) => {
  return { type: 'EVADE_IS_HAPPEN', subj };
}
const actionLuckyEvadeIsHappen = (subj) => {
  return { type: 'LUCKY_EVADE_IS_HAPPEN', subj };
}
const actionMissIsHappen = (subj) => {
  return { type: 'MISS_IS_HAPPEN', subj };
}
const actionNoBonusAttack = (subj) => {
  return { type: 'NO_BONUS_ATTACK', subj };
}
const actionNoBonusHit = (subj) => {
  return { type: 'NO_BONUS_HIT_IS_HAPPEN', subj };
}

const makeTheAttack = (obj, subj) => {
  return { type: 'MAKE_THE_ATTACK', obj, subj };
}

/* movement action creatrors */

export const battlefieldCellClick = (iCell, cellOccupation) => {
  return { type: 'BATTLEFIELD_CELL_CLICK', iCell, cellOccupation };
}
const changeBattlerPosition = iNewPosition => {
  return { type: 'CHANGE_BATTLER_POSITION', iNewPosition };
}

/* ending action creators */

const prepareNextStep = () => {
  return { type: 'PREPARE_NEXT_STEP' };
}
const finishCurrentStep = () => {
  return { type: 'FINISH_CURRENT_STEP' };
}
const actionBattleIsCompleted = (bIsCompleted) => {
  return { type: 'BATTLE_IS_COMPLETED', bIsCompleted };
}
export const actionBattleEndDialog = (isOpen) => {
  return { type: 'BATTLE_END_DIALOG', isOpen };
}
export const actionCloseBattleEndDialogSafely = () => {
  return { type: 'CLOSE_BATTLE_END_DIALOG_SAFELY' };
}
export const actionProceedToNextRoom = () => {
  return { type: 'PROCEED_NEXT_ROOM' };
}

/* epics */

const initializeEpic = (action$, store) => action$
  .ofType(INITIALIZE_BATTLEFIELD)
  .delay(1000)
  .concatMap(action => [
    actionInitializeRoom(
      getRandomRoom(store.getState().battleFieldState).battleFieldState
    ),
    prepareNextStep(),
  ]);

const notificationEpic = (action$, store) => action$
  .ofType(
    BATTLE_IS_COMPLETED
  )
  .mergeMap(action => [
    actionNotify()
  ]);
const hpNotificationEpic = (action$, store) => action$
  .ofType(MAKE_THE_ATTACK)
  .mergeMap(action => [
    actionNotifyHpLoose()
  ]);

const nextBattler = (store) => {
  let whoIsNext = store.getState().battleFieldState.whoIsNext;
  let battlers = store.getState().battleFieldState.battlers;
  return (battlers.find(el=>el.ID === whoIsNext) || {});
}
const playerAttackEpic = (action$, store) => action$
  .ofType(PLAYER_ATTACK_BATTLER)
  .filter(() => nextBattler(store).party === 'player')
  .concatMap(action => [
    attackBattler(action.subj),
  ]);
const enemyMakeDecisionEpic = (action$, store) => action$
  .ofType(PREPARE_NEXT_STEP)
  .filter(() => nextBattler(store).party === 'enemy')
  .delay(1000)
  .concatMap(action => [
    actionEnemyMakeDecision(),
  ]);

// TODO combine with enemyMakeDecisionEpic
const enemyPerformDecisionEpic = (action$, store) => action$
  .ofType(ENEMY_MAKE_DECISION)
  .map(action =>
    actionDispatchEnemyMove(store.getState().battleFieldState.enemyDecision)
  );

/* attack epics */

const _getAttacker = (store) => store.getState().battleFieldState.whoIsNext;
const _getBattlerById = (store, id) => store.getState().battleFieldState.battlers
  .find(battler => battler.ID === id);

const checkBonusHitEpic = (action$, store) => action$
  .ofType(ATTACK_BATTLER)
  .filter(action =>
    _getBattlerById(store, action.subj).HP > 0 &&      // disallow attack deaders
    _getAttacker(store) !== action.subj                // disallow self attack
  )
  .map(action =>
    checkWhetherTotalHitIsHappen(           _getAttacker(store), action.subj ) ?
      actionTotalHitIsHappen(               action.subj                      ) :
      checkWhetherLuckyHitIsHappen(         _getAttacker(store), action.subj ) ?
        actionLuckyHitIsHappen(             action.subj                      ) :
        checkWhetherEvadeIsHappen(          _getAttacker(store), action.subj ) ?
          actionEvadeIsHappen(              action.subj                      ) :
          checkWhetherLuckyEvadeIsHappen(   _getAttacker(store), action.subj ) ?
            actionLuckyEvadeIsHappen(       action.subj                      ) :
            actionNoBonusAttack(            action.subj                      )
  );

const checkMissEpic = (action$, store) => action$
  .ofType(NO_BONUS_ATTACK)
  .map(action =>
    checkWhetherMissIsHappen(_getAttacker(store), action.subj) ?
      actionMissIsHappen(action.subj) :
      actionNoBonusHit(action.subj)
  );

const makeTheAttackEpic = (action$, store) => action$
  .ofType(TOTAL_HIT_IS_HAPPEN, LUCKY_HIT_IS_HAPPEN, NO_BONUS_HIT_IS_HAPPEN)
  .concatMap(action => [
    makeTheAttack(_getAttacker(store), action.subj)
  ]);

/* movement epics */

const movementEpic = (action$, store) => action$
  .ofType(BATTLEFIELD_CELL_CLICK)
  .filter(() => nextBattler(store).party === 'player')
  .filter((action) => {
    let state = store.getState().battleFieldState;
    let mover = state.battlers.find(el=>el.ID == state.whoIsNext);
    // TODO assertion what if mover.party is undefined?
    if (!(mover || {}).party) return false;
    let moverOccupation = ((mover).party === 'player') ? 2 : 1;

    let bOccupied = state.battlers.find(battler =>
      battler.party    === mover.party  && // same party
      battler.position === action.iCell    // is vacant
    );

    return state.decisionMode    === 'DECISION_MOVEMENT' &&
           action.iCell          !== mover.position      && // already here
           action.cellOccupation === moverOccupation     && // disallow moving to another party lands
           !bOccupied;
  })
  .mergeMap(action => [
    changeBattlerPosition(action.iCell)
  ]);

/* ending epics */

const _checkWhetherBattleIsCompleted = (state) => {
  return !(
    state.battlers.filter(battler => battler.party === 'player').some(battler => battler.HP>0) &&
    state.battlers.filter(battler => battler.party === 'enemy') .some(battler => battler.HP>0)
  );
};

const stepFinishEpic = (action$, store) => action$
  .ofType(
    MAKE_THE_ATTACK, EVADE_IS_HAPPEN, LUCKY_EVADE_IS_HAPPEN, MISS_IS_HAPPEN,
    CHANGE_BATTLER_POSITION
  )
  .map(action => finishCurrentStep());

const prepareNextStepEpic = (action$, store) => action$
.ofType(FINISH_CURRENT_STEP)
  .filter(() => !_checkWhetherBattleIsCompleted(store.getState().battleFieldState))
  .delay(1000)
  .map(action => prepareNextStep());

// TODO combine with prepareNextStepEpic
const battleCompletionEpic = (action$, store) => action$
  .ofType(FINISH_CURRENT_STEP)
  .filter(() => _checkWhetherBattleIsCompleted(store.getState().battleFieldState))
  .delay(1000)
  .mergeMap(action => [
    actionBattleEndDialog(true),
    actionBattleIsCompleted(true),
  ]);

// TODO combine with battleCompletionEpic
const closeBattleEndDialogEpic = (action$, store) => action$
  .ofType(CLOSE_BATTLE_END_DIALOG_SAFELY)
  .delay(1000)
  .mergeMap(action => [
    actionBattleEndDialog(false)
  ]);

const proceedNextRoomEpic = (action$, store) => action$
  .ofType(PROCEED_NEXT_ROOM)
  .mergeMap(action => [
    actionCloseBattleEndDialogSafely(),
    actionInitializeRoom(
      getNextRoom(store.getState()).battleFieldState
    ),
  ]);

export const rootEpic = combineEpics(
  initializeEpic,
  notificationEpic, hpNotificationEpic,
  /* attack */
  checkBonusHitEpic, checkMissEpic, makeTheAttackEpic,
  /* movement */
  movementEpic,
  /* ending */
  stepFinishEpic, prepareNextStepEpic, battleCompletionEpic, closeBattleEndDialogEpic, proceedNextRoomEpic,
  /* other */
  playerAttackEpic,
  enemyMakeDecisionEpic, enemyPerformDecisionEpic
);

/* reducers */

let whatHappens = '';
let hpDelta = null;
let _whoIsNext = null;

const battleFieldState = (state = {
  battlers: [],
  history: [],
  battleState: 'BATTLE_IS_INPROGRESS',
  moveid: 1,
  decisionMode: 'DECISION_ATTACK'
}, {
  type,
  oInitialState,
  iNewPosition,
  decisionMode,
  bIsCompleted,
  isOpen,

  iBattler,
  obj,
  subj
} = action) => {
  let battlers = state.battlers.slice();
  // let attacker = battlers.find(el=> el.ID == obj);
  // let attacked = battlers.find(el => el.ID == subj);
  let attacker = battlers.find(el => el.ID == state.whoIsNext || el.ID == obj );
  let attacked = battlers.find(el => el.ID == iBattler        || el.ID == subj);
  let checkres = false;

  switch (type) {
    case INITIALIZE_BATTLEFIELD:
      return Object.assign({}, state, oInitialState);
    case INITIALIZE_ROOM:
      return Object.assign({}, state, oInitialState);
    case NOTIFY:
      toast(
          whatHappens || NOTIFY,
          { autoClose: true }
      );

      return state;
    case NOTIFY_HP_LOOSE:
      // toast(
      //     hpDelta,
      //     { autoClose: true }
      // );

      return state;
    case ENEMY_MAKE_DECISION:
      let playerBattlers = battlers.filter(el => {
        return el.party === 'player' && el.HP > 0;
      });

      return Object.assign({}, state, {
        enemyDecision: {
          decision: 'ATTACK_BATTLER',
          params: {
            subj: playerBattlers[Math.random() * playerBattlers.length ^ 0].ID,
          }
        }
      });
    case CHANGE_DECISION_MODE:
      return Object.assign({}, state, {
        decisionMode,
      });

    /* battler attack */

    case TOTAL_HIT_IS_HAPPEN:
      whatHappens += 'TOTAL_HIT ';

      return Object.assign({}, state, {
        events: {
          totalhit: true,
        }
      });
    case LUCKY_HIT_IS_HAPPEN:
      whatHappens += 'LUCKY_HIT ';
      attacker.event = 'LUCKY_HIT';

      return Object.assign({}, state, {
        battlers,
        events: {
          luckyhit: true,
          subject: attacker.ID,
        }
      });
    case EVADE_IS_HAPPEN:
      whatHappens += `EVADE (${attacker.name} => ${attacked.name})`;
      attacked.event = 'EVADE';

      return Object.assign({}, state, {
        battlers,
        events: {
          evade: true,
          subject: attacked.ID,
        }
      });
    case LUCKY_EVADE_IS_HAPPEN:
      whatHappens += `LUCKY_EVADE (${attacker.name} => ${attacked.name})`;
      attacked.event = 'LUCKY_EVADE';

      return Object.assign({}, state, {
        battlers,
        events: {
          luckyevade: true,
          subject: attacked.ID,
        }
      });
    case MISS_IS_HAPPEN:
      whatHappens += `MISS (${attacker.name} => ${attacked.name})`;
      attacker.event = 'MISS';

      return Object.assign({}, state, {
        battlers,
        events: {
          miss: true,
          subject: attacker.ID,
        }
      });
    case MAKE_THE_ATTACK:
      hpDelta = Math.abs(attacker.ATK - attacked.DEF);
      attacked.hpDelta = hpDelta;
      attacked.HP -= hpDelta;

      whatHappens += `MAKE_THE_ATTACK (${attacker.name} => ${attacked.name}) -${hpDelta}HP = ${attacked.DEF}DEF - ${attacker.ATK}ATK`;

      return Object.assign({}, state, {
        battlers,
      });

    /* battler move */

    case CHANGE_BATTLER_POSITION:
      whatHappens += `CHANGE_BATTLER_POSITION (${attacker.name} [${attacker.position}] => [${iNewPosition}])`;

      attacker.position = iNewPosition;

      return Object.assign({}, state, {
        battlers
      });

    /* ending */

    case FINISH_CURRENT_STEP:
      let wh = whatHappens;
      whatHappens = '';
      hpDelta = null;
      _whoIsNext = state.whoIsNext;

      return Object.assign({}, state, {
        history: state.history.slice(0, state.moveid+1).concat([{
          battlers: state.battlers,
          whoIsNext: state.whoIsNext,
          battleState: state.battleState,
          moveid: state.moveid,
          whatHappens: wh,
          decisionMode: state.decisionMode,
          events: state.events,
        }]),
        moveid: state.moveid + 1,
        decisionMode: 'DECISION_ATTACK',
        enemyDecision: {},
        events: {},
        whoIsNext: -1,
        isPlayerTurn: false,
        isEnemyTurn: false,
      });
    case PREPARE_NEXT_STEP:
      battlers.forEach(battler => battler.hpDelta = '');
      let __battlers = battlers.slice();
      let next = __battlers
      .splice(_whoIsNext).concat(__battlers)
      .filter(battler=>battler.HP>0);
      let nextBattler = (next[1] || next[0] || {});
      let whoIsNext = nextBattler.ID;
      let isPlayerTurn = nextBattler.party === 'player';
      let isEnemyTurn = nextBattler.party === 'enemy';

      return Object.assign({}, state, {
        battlers,
        whoIsNext,
        isPlayerTurn,
        isEnemyTurn,
      });
    case BATTLE_IS_COMPLETED:
      return Object.assign({}, state, {
        battleState: bIsCompleted ? 'BATTLE_IS_FINISHED' : 'BATTLE_IS_INPROGRESS',
        battleExodus: (
          bIsCompleted && battlers.find(battler => battler.party === 'player' && battler.HP > 0)
        ) ? 'WINNER_PLAYER' : (
          bIsCompleted && battlers.find(battler => battler.party === 'enemy' && battler.HP > 0)
        ) ? 'WINNER_ENEMY' : (bIsCompleted) ? 'BATTLE_FINISHED_OTHER_CONDITION' : '',
        whoIsNext: bIsCompleted ? '' : state.whoIsNext,
      });
    case BATTLE_END_DIALOG:
      return Object.assign({}, state, {
        openBattleEndDialog: isOpen,
      });

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  battleFieldState
})
