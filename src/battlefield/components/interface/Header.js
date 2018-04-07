import React from 'react'
import './Header.sass';
import { VisibleBattlerstring } from '../../containers/BattleContainer'

class Header extends React.Component {

  // TODO use external function
  getBattlersOrder() {
    const { whoIsNext } = this.props.state;
    let battlers = this.props.state.battlers.slice();

    return battlers
    .splice(whoIsNext).concat(battlers)
    .filter(battler=>battler.HP>0)
    .map((battler = {}, i) => (
      <VisibleBattlerstring
        key={battler.ID}
        ID={battler.ID}
      >
        {(battler || {}).name}
      </VisibleBattlerstring>
    ));
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-buttons">
          <span>
            Menu:
          </span>
          <span>
            <button onClick={this.props.onInitButonClick}>rand battle room</button>
          </span>
        </div>
        <div className="Header-info">
          <span className="Header-info-field">
            Battle state: {this.props.state.battleState}
          </span>
          <span className="Header-info-field">
            Current Decision: {this.props.state.decisionMode}
          </span>
        </div>
        <div className="Header-info">
          <span className="Header-info-field">
            Order: {this.getBattlersOrder()}
          </span>
        </div>
      </div>
    );
  }
}

export default Header
