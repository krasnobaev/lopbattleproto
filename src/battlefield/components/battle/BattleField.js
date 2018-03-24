import React from 'react';
import PropTypes from 'prop-types';

import {
  ROWS_NUM, BTLFLD_MAX_ENMY_POS, BTLFLD_MAX_PLYR_POS,
  BTLFLD_CELL_EMPTY, BTLFLD_CELL_ENEMY, BTLFLD_CELL_PLAYR, BTLFLD_ROW
} from '../../ducks/constants';
import { VisibleBattler } from '../../containers/BattleContainer'
import './BattleField.sass';

class BattleField extends React.Component {
  render() {
    const battlers = this.props.state.battlers.map((battler) => {
      return (
        <VisibleBattler
          key={battler.ID}
          ID={battler.ID}
          party={battler.party}
          HP={battler.HP}
          pos={battler.position}
        />
      );
    });

    /* place battlers on the battlefield */

    let enemycells = Array(BTLFLD_MAX_ENMY_POS).fill('');
    battlers.filter(el=>el.props.party === 'enemy').forEach(battler => {
      enemycells[battler.props.pos] = battler;
    });

    let playercells = Array(BTLFLD_MAX_PLYR_POS).fill('');
    battlers.filter(el=>el.props.party === 'player').forEach(battler => {
      playercells[battler.props.pos] = battler;
    });

    const rows = [].concat.apply([], Array(ROWS_NUM).fill(BTLFLD_ROW))
    .map((cell, i) => (
      <div key={i} className={`battlefield-${cell === BTLFLD_CELL_EMPTY ? 'cell' : 'slot'}`}>{
        cell === BTLFLD_CELL_PLAYR ? playercells.pop() : (
        cell === BTLFLD_CELL_ENEMY ? enemycells.pop() :
                                     ''
      )}</div>
    ));

    return (
      <div className="battlefield-grid">{rows}</div>
    );
  }
}

export default BattleField
