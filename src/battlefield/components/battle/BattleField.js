import React from 'react';
import PropTypes from 'prop-types';

import {
  ROWS_NUM, BTLFLD_MAX_ENMY_POS, BTLFLD_MAX_PLYR_POS,
  BTLFLD_CELL_EMPTY, BTLFLD_CELL_ENEMY, BTLFLD_CELL_PLAYR, BTLFLD_ROW
} from '../../lib/constants';
import { VisibleBattler } from '../../containers/BattleContainer'
import './BattleField.sass';

class BattlefieldCell extends React.Component {
  render() {
    // TODO: probably cell popping should be implemented through some generator fun
    let { cellOccupation, enemycells, playercells, curpos } = this.props;

    const whoisHere = cellOccupation === BTLFLD_CELL_PLAYR ? playercells.pop() : (
                      cellOccupation === BTLFLD_CELL_ENEMY ? enemycells.pop() :
                                                             '');

    return (
      <div
        title={cellOccupation > 0 ? curpos : undefined}
        className={`
          battlefield-${cellOccupation === BTLFLD_CELL_EMPTY ? 'cell' : 'slot'}
          ${cellOccupation === BTLFLD_CELL_PLAYR ? 'playercell' : ''}
          ${cellOccupation === BTLFLD_CELL_ENEMY ? 'enemycell' : ''}
          ${whoisHere ? 'battlefield-slow-filled' : ''}
        `}
        onClick={this.props.onCellClick}
      >{whoisHere}</div>
    );
  }
}

export class BattleField extends React.Component {

  componentDidMount() {
    this.props.onBattleFieldLoad();
  }

  render() {
    const battlers = this.props.state.battlers.map((battler) => {
      return (
        <VisibleBattler
          key={battler.ID}
          ID={battler.ID}
          party={battler.party}
          HP={battler.HP}
          pos={battler.position}
          hpDelta={battler.hpDelta}
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

    let enemycellnum  = BTLFLD_MAX_ENMY_POS - 1;
    let playercellnum = BTLFLD_MAX_PLYR_POS - 1;

    const rows = [].concat.apply([], Array(ROWS_NUM).fill(BTLFLD_ROW))
    .map((cellOccupation, i) => {
      let curpos = cellOccupation === BTLFLD_CELL_PLAYR ? playercellnum-- :
                   cellOccupation === BTLFLD_CELL_ENEMY ? enemycellnum--  :
                                                         '';

      return (
        <BattlefieldCell
          key={i}
          cellOccupation={cellOccupation}
          curpos={curpos}
          onCellClick={this.props.onCellClick.bind(this, curpos, cellOccupation)}
          enemycells={enemycells}
          playercells={playercells}
        />
      );
    });

    return (
      <div
        className={`
          battlefield-grid
          ${(this.props.state.isPlayerTurn) ? [
            this.props.state.decisionMode === 'DECISION_ATTACK' ? 'attackMode' : '',
            this.props.state.decisionMode === 'DECISION_MOVEMENT' ? 'movementMode' : '',
          ].join(' ') : ''}
          movingparty-${this.props.actioner.party}
        `}
      >{rows}</div>
    );
  }
}
