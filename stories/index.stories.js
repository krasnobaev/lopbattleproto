import React from 'react';
import { Provider } from 'react-redux';
import 'rxjs';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Battler } from '../src/battlefield/components/battle/Battler.js';
import { VisibleBattleField } from '../src/battlefield/containers/BattleContainer.js';
import BattleEndModal from '../src/battlefield/components/interface/BattleEndModal.js';

import { configureStore } from '../src/battlefield/ducks/store.js'
const store = configureStore();

let { battlers } = store.getState().battleFieldState;
const getRandomBattler = () => battlers[
  Math.floor(Math.random() * Math.floor(battlers.length))
];

const hpdeltabattler = (<Battler
  thisBattler=""
  onAttackClick={action('clicked')}
  isAttackButtonDisabled=""
  isMoving={true}
  isAlive={true}
  thisBattler={Object.assign({}, getRandomBattler(), {
    hpDelta: 40
  })}
/>);

const eventbattler = (<Battler
  thisBattler=""
  onAttackClick={action('clicked')}
  isAttackButtonDisabled=""
  isMoving={true}
  isAlive={true}
  thisBattler={Object.assign({}, getRandomBattler(), {
    event: 'EVADE'
  })}
/>);

storiesOf('Battler', module)
  .add('HP Delta popup', () => hpdeltabattler)
  .add('Event popup', () => eventbattler)
  .add('both popups', () => <div>
    {hpdeltabattler}
    <hr/>
    {eventbattler}
  </div>);

storiesOf('VisibleBattleField', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Simple', () => (
    <VisibleBattleField />
  ));

storiesOf('BattleEndModal', module)
  .add('WINNER_PLAYER', () => <div>
    <BattleEndModal
      isOpen
      onClose={action('onClose')}
      battleExodus="WINNER_PLAYER"
    />
  </div>)
  .add('WINNER_ENEMY', () => <div>
    <BattleEndModal
      isOpen
      onClose={action('onClose')}
      battleExodus="WINNER_ENEMY"
    />
  </div>)
  .add('BATTLE_FINISHED_OTHER_CONDITION', () => <div>
    <BattleEndModal
      isOpen
      onClose={action('onClose')}
      battleExodus="BATTLE_FINISHED_OTHER_CONDITION"
    />
  </div>)
  .add('NO_EXODUS', () => <div>
    <BattleEndModal
      isOpen
      onClose={action('onClose')}
    />
  </div>);
