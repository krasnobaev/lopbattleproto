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
          showAttackButton={true}
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
          showAttackButton={true}
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
        <div className="panelbar-pane playerdecisions">
          <div>Actions</div>
          <button
            className={(this.props.isDecisionAttack)?'currentdecision':''}
            onClick={this.props.onAttackModeBtnClick}
            disabled={this.props.isAttackButtonDisabled}
          >Attack</button>
          <button
            className={(this.props.isDecisionMovement)?'currentdecision':''}
            onClick={this.props.onMoveModeBtnClick}
            disabled={this.props.isMovementButtonDisabled}
          >Move</button>
          <button
            className={(this.props.isDecisionSpell)?'currentdecision':''}
            onClick={()=>{}}
            disabled={true || this.props.isDecisionSpell}
          >Spell</button>
          <button
            className={(this.props.isDecisionItem)?'currentdecision':''}
            onClick={()=>{}}
            disabled={true || this.props.isDecisionItem}
          >Item</button>
          <button
            className={(this.props.isDecisionFlee)?'currentdecision':''}
            onClick={()=>{}}
            disabled={true || this.props.isDecisionFlee}
          >Flee</button>
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
