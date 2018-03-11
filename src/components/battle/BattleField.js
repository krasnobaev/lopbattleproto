import React from 'react';
import PropTypes from 'prop-types';

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
        />
      );
    });

    return (
      <div className="battlefield">
        <div className="battlers-left">
          {battlers.filter(el=>el.props.party === 'enemy')}
        </div>
        <div className="separator" />
        <div className="battlers-right">
          {battlers.filter(el=>el.props.party === 'player').slice().reverse()}
        </div>
      </div>
    );
  }
}

export default BattleField
