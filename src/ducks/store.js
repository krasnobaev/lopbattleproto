import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { rootEpic, rootReducer } from './battlefield';

const getPlayerBattlers = () => {
  return [{
    party: 'player',
    ATK: 20  + Math.random() * 30  ^ 0,
    HP:  1   + Math.random() * 100 ^ 0,
    MHP: 100 + Math.random() * 100 ^ 0,
    MP:  1   + Math.random() * 10  ^ 0,
    MMP: 10  + Math.random() * 100 ^ 0,
    name: 'Ayro',
  }, {
    party: 'player',
    ATK: 10  + Math.random() * 20  ^ 0,
    HP:  1   + Math.random() * 100 ^ 0,
    MHP: 100 + Math.random() * 100 ^ 0,
    MP:  1   + Math.random() * 10  ^ 0,
    MMP: 10  + Math.random() * 100 ^ 0,
    name: 'Branimir',
  }];
};

const getEnemyBattlers = () => {
  let iJelly = 0;
  const getRandomJelly = function () {
    return {
      party: 'enemy',
      ATK: 1   + Math.random() * 10  ^ 0,
      HP:  1   + Math.random() * 100 ^ 0,
      MHP: 100 + Math.random() * 100 ^ 0,
      MP:  0,
      MMP: 0,
      name: 'Jelly ' + ++iJelly,
    }
  };
  const getRandomEnemies = (num=2) => {
    let arr = [];
    while (num--) {
      arr.push(getRandomJelly());
    }
    return arr;
  };

  return getRandomEnemies(1+Math.random()*3^0);
}

const beginBattle = (state) => {
  state.battlers.forEach((battler, i) => {
    battler.ID = i;
  });

  const currentState = {
    battlers: state.battlers,
    whoIsNext: 0,
    battleState: 'BATTLE_IS_INPROGRESS',
    moveid: 0,
  };

  return {
    battleFieldState: {
      history: [currentState],
      // ...currentState,
      battlers: state.battlers,
      moveid: 1,
      whoIsNext: 0,
      battleState: 'BATTLE_IS_INPROGRESS'
    },
  };
}

/* export */

export const proceedToNextRoom = (state) => {
  return beginBattle({
    battlers: state.battleFieldState.battlers.slice()
      .filter(battler=>battler.party === 'player')
      .concat(getEnemyBattlers(1+Math.random()*3^0)),
  });
};

export const getInitializedStore = () => {
  return beginBattle({
    battlers: [].concat(
      getEnemyBattlers(1+Math.random()*3^0),
      getPlayerBattlers()
    ),
  });
};

/* init */

let state = getInitializedStore();

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
