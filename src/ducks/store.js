import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
// import { rootEpic, rootReducer } from './tictacboard';
import { rootEpic, rootReducer } from './battlefield';

const state = {
  battleFieldState: {
    history: [{
      boardPositions: Array(9).fill('')
    }],
    battlers: [{
      ID: '',
      HP: 12,
      name: '_battlerTpl',
    }, {
      ID: '',
      HP: 12,
      name: '_battlerTpl',
    }, {
      ID: '',
      HP: 12,
      name: '_battlerTpl',
    }, {
      ID: '',
      HP: 12,
      name: '_battlerTpl',
    }],
    stepNumber: 0,
    winner: null,
    xIsNext: true
  },

  // boardState: {
  //   history: [{
  //     boardPositions: Array(9).fill('')
  //   }],
  //   stepNumber: 0,
  //   winner: null,
  //   xIsNext: true
  // }
};

const epicMiddleware = createEpicMiddleware(rootEpic);
export const store = ((initialState = state) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      epicMiddleware,
      logger
    )
  );
})();
