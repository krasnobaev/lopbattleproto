import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

/* actions */

export const ATTACK_BATTLER = 'ATTACK_BATTLER'
const MAKE_THE_ATTACK = 'MAKE_THE_ATTACK'
const PREPARE_NEXT_STEP = 'PREPARE_NEXT_STEP'

/* action creators */

export const attackBattler = iCell => {
  return { type: 'ATTACK_BATTLER', iCell };
}

const makeTheAttack = iCell => {
  return { type: 'MAKE_THE_ATTACK', iCell };
}

const prepareNextStep = () => {
  return { type: 'PREPARE_NEXT_STEP' };
}

/* epics */

const attackEpic = (action$, store) => action$
  .ofType(ATTACK_BATTLER)
  .mapTo({ type: 'MAKE_THE_ATTACK' });

export const rootEpic = combineEpics(
  attackEpic
);

/* reducers */

const initialState = {
  battlers: [{
    ID: '',
    HP: 12,
    name: '_battlerTpl',
  }],
  history: [{
    boardPositions: Array(9).fill('')
  }],
  stepNumber: 0,
  winner: '',
  xIsNext: true
}

const battleFieldState = (state = initialState, { type, iCell, iStep, aSquares } = action) => {

  switch (type) {
    case MAKE_THE_ATTACK:
      let battlers = state.battlers.slice();
      battlers[0].HP -= 1;

      return Object.assign({}, state, {
        battlers,
      });
    case PREPARE_NEXT_STEP:
      return Object.assign({}, state, {
        xIsNext: (state.stepNumber % 2) === 0,
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  battleFieldState
})
