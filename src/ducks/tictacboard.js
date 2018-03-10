import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'

/* actions */

export const CHOOSE_CELL = 'CHOOSE_CELL'
export const CHOOSE_STEP = 'CHOOSE_STEP'
const MAKE_A_STEP = 'MAKE_A_STEP'
const PREPARE_NEXT_STEP = 'PREPARE_NEXT_STEP'
const WARP_TO_STEP = 'WARP_TO_STEP'

/* action creators */

export const chooseCell = iCell => {
  return { type: 'CHOOSE_CELL', iCell };
}

export const chooseStep = iStep => {
  return { type: 'CHOOSE_STEP', iStep };
}

const makeAStep = iCell => {
  return { type: 'MAKE_A_STEP', iCell };
}

const prepareNextStep = () => {
  return { type: 'PREPARE_NEXT_STEP' };
}

const warpToStep = iStep => {
  return { type: 'WARP_TO_STEP', iStep };
}

/* epics */

const boardCellsManipulationEpic = (action$, store) => action$
  .ofType(CHOOSE_CELL)
  .filter(action => {
    let state = store.getState().boardState;
    let currentState = state.history.slice(state.stepNumber, state.stepNumber+1)[0].boardPositions.slice();
    return !currentState[action.iCell] &&                        // cell is empty
      ['X','O'].indexOf(_calculateWinner(currentState)) === -1;  // winner for new state is not known
  })
  .mergeMap(action => [
    makeAStep(action.iCell),
    prepareNextStep()
  ]);

const historyEpic = (action$, store) => action$
  .ofType(CHOOSE_STEP)
  .filter(action => action.iStep >= 0 && action.iStep < store.getState().boardState.history.length)
  .mergeMap(action => [
    warpToStep(action.iStep),
    prepareNextStep()
  ]);

export const rootEpic = combineEpics(
  boardCellsManipulationEpic,
  historyEpic
);

/* reducers */

function _calculateWinner(aBoardPoss = []) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (aBoardPoss[a] && aBoardPoss[a] === aBoardPoss[b] && aBoardPoss[a] === aBoardPoss[c]) {
      return aBoardPoss[a];
    }
  }
  return (aBoardPoss.indexOf('') === -1) ? 'Draw' : '';
}

const initialState = {
  history: [{
    boardPositions: Array(9).fill('')
  }],
  stepNumber: 0,
  winner: '',
  xIsNext: true
}

const boardState = (state = initialState, { type, iCell, iStep, aSquares } = action) => {
  let currentState = state.history.slice(state.stepNumber, state.stepNumber+1)[0].boardPositions.slice();

  switch (type) {
    case MAKE_A_STEP:
      currentState[iCell] = ((state.stepNumber%2) === 0) ? 'X' : 'O';

      return {
        history: state.history.slice(0, state.stepNumber+1).concat([{
          boardPositions: currentState
        }]),
        stepNumber: state.stepNumber+1,
      };
    case WARP_TO_STEP:
      return Object.assign({}, state, {
        stepNumber: iStep,
      });
    case PREPARE_NEXT_STEP:
      return Object.assign({}, state, {
        winner: _calculateWinner(currentState),
        xIsNext: (state.stepNumber % 2) === 0,
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  boardState
})
