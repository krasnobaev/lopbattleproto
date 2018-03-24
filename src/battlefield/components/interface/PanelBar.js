import React from 'react'
import './PanelBar.sass'
import { VisibleBattlerstring } from '../../containers/BattleContainer'

class PanelBar extends React.Component {
  render() {
    const moves = this.props.state.history.slice().map((step, move) => {
      return (
        <li key={move}>
          <button onClick={this.props.onHistoryClick.bind(this, move)}>
            {move ? `Go #${move}` : 'Go start'}
          </button>
          <span>{step.whatHappens}</span>
        </li>
      );
    }).reverse();

    const enemybattlers = this.props.state.battlers.slice()
    .filter(el=>el.party === 'enemy')
    .map((battler) => {
      return (
        <VisibleBattlerstring
          key={battler.ID}
          ID={battler.ID}
          party={battler.party}
          HP={battler.HP}
        />
      );
    });

    const playerbattlers = this.props.state.battlers.slice()
    .filter(el=>el.party === 'player')
    .map((battler) => {
      return (
        <VisibleBattlerstring
          key={battler.ID}
          ID={battler.ID}
          party={battler.party}
          HP={battler.HP}
        />
      );
    });

    return (
      <div className="panelbar">
        <div className="panelbar-pane history">
          <span>History</span>
          <span className="panelbar-moves">{moves}</span>
        </div>
        <div className="panelbar-pane battlersinfo">
          <span>Enemy Battlers Info</span>
          <span className="panelbar-enemybattlers">{enemybattlers}</span>
        </div>
        <div className="panelbar-pane playeractions">
          <div>Actions</div>
          <button>Attack</button>
          <button disabled>Move</button>
          <button disabled>Spell</button>
          <button disabled>Item</button>
          <button disabled>Flee</button>
        </div>
        <div className="panelbar-pane battlersinfo">
          <span>Player Battlers Info</span>
          <span className="panelbar-playerbattlers">{playerbattlers}</span>
        </div>
      </div>
    );
  }
}

export default PanelBar
