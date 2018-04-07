import {
  BTLFLD_ENMY_WIDTH, BTLFLD_PLYR_WIDTH, ROWS_NUM,
  BTLFLD_MAX_ENMY_POS, BTLFLD_MAX_PLYR_POS
} from './constants';

let getnextemptypos = function* (cells) {
  for (let cnt = 0; cnt < cells.length; cnt++) {
    let i = Math.random() * cells.length ^ 0;
    if (cells[i] === '') {
      cells[i] = i;
      yield { cell: cells[i], index: i }
    }
  }
}

let enemycells  = Array(BTLFLD_MAX_ENMY_POS).fill('');
let playercells = Array(BTLFLD_MAX_PLYR_POS).fill('');

const getPlayerBattlers = () => {
  let emptypos = getnextemptypos(playercells);

  return [{
    party: 'player',
    LVL: 7   + Math.random() * 7  ^ 0,
    ATK: 20  + Math.random() * 30  ^ 0,
    DEF: 0   + Math.random() * 10  ^ 0,
    HP:  1   + Math.random() * 100 ^ 0,
    MHP: 100 + Math.random() * 100 ^ 0,
    MP:  1   + Math.random() * 10  ^ 0,
    MMP: 10  + Math.random() * 100 ^ 0,
    name: 'Ayro',
    position: emptypos.next().value.cell,
  }, {
    party: 'player',
    LVL: 5   + Math.random() * 6   ^ 0,
    ATK: 10  + Math.random() * 20  ^ 0,
    DEF: 0   + Math.random() * 5   ^ 0,
    HP:  1   + Math.random() * 100 ^ 0,
    MHP: 100 + Math.random() * 100 ^ 0,
    MP:  1   + Math.random() * 10  ^ 0,
    MMP: 10  + Math.random() * 100 ^ 0,
    name: 'Branimir',
    position: emptypos.next().value.cell,
  }];
};

const getEnemyBattlers = () => {
  let emptypos = getnextemptypos(enemycells);

  let iJelly = 0;
  const getRandomJelly = function () {
    return {
      party: 'enemy',
      LVL: 1   + Math.random() * 3   ^ 0,
      ATK: 1   + Math.random() * 10  ^ 0,
      DEF: 0   + Math.random() * 3   ^ 0,
      HP:  1   + Math.random() * 100 ^ 0,
      MHP: 100 + Math.random() * 100 ^ 0,
      MP:  0,
      MMP: 0,
      name: 'Jelly ' + ++iJelly,
      position: emptypos.next().value.cell,
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
  let whoIsNext = ((state.battlers.find(el=>
    el.HP > 0 && el.party === 'player'
  ) || {}).ID || 0);

  const currentState = {
    battlers: state.battlers,
    battleState: 'BATTLE_IS_INPROGRESS',
    battleExodus: '',
    decisionMode: 'DECISION_ATTACK',
    whoIsNext,
    moveid: 0,
  };

  return {
    battleFieldState: {
      history: [currentState],
      // ...currentState,
      battlers: state.battlers,
      battleState: 'BATTLE_IS_INPROGRESS',
      decisionMode: 'DECISION_ATTACK',
      whoIsNext,
      moveid: 1,
      events: { // not used
        totalhit: false,
        luckyhit: false,
        evade: false,
        luckyevade: false,
        miss: false
      },
    },
  };
}

/* export */

export const getNextRoom = (state) => {
  enemycells = Array(enemycells.length).fill('');

  return beginBattle({
    battlers: state.battleFieldState.battlers.slice()
      .filter(battler=>battler.party === 'player')
      .concat(getEnemyBattlers(1+Math.random()*3^0)),
    openBattleEndDialog: false,
  });
};

export const getRandomRoom = (state) => {
  playercells = Array(playercells.length).fill('');
  enemycells = Array(enemycells.length).fill('');

  return beginBattle({
    battlers: [].concat(
      getEnemyBattlers(1+Math.random()*3^0),
      getPlayerBattlers(),
    ),
  });
};

export const getInitializedStore = () => {
  return {
    battleFieldState: {
      history: [],
      battlers: [],
      battleState: 'BATTLE_IS_COMPLETED',
      decisionMode: null,
      whoIsNext: null,
      moveid: null,
      events: {},
      battleworld: {
        BTLFLD_ENMY_WIDTH,
        BTLFLD_PLYR_WIDTH,
        ROWS_NUM,
      },
    },
  };
};
