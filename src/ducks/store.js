import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { rootEpic, rootReducer } from './tictacboard';

const state = {
  boardState: {
    history: [{
      boardPositions: Array(9).fill('')
    }],
    stepNumber: 0,
    winner: null,
    xIsNext: true
  }
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
