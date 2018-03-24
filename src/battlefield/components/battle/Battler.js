import React from 'react';
import PropTypes from 'prop-types';

import './Battler.sass';

class BattlerName extends React.Component {
  render() {
    const oBattler = this.props.thisBattler;

    const tooltip = `
      name:${oBattler.name}
      LVL:${oBattler.LVL}
      pos:${oBattler.position}

      HP:${oBattler.HP} \t/ MHP:${oBattler.MHP}
      MP:${oBattler.MP} \t/ MMP:${oBattler.MMP}

      ATK:${oBattler.ATK}
      DEF:${oBattler.DEF}
    `;

    return (
      ((this.props.short)) ? (
        <span title={tooltip}>{oBattler.name}</span>
      ) : (
        <h5 className="name" title={tooltip}>
          {oBattler.name} (LVL{oBattler.LVL})
        </h5>
      )
    );
  }
}

class ActionButton extends React.Component {
  render() {
    return (
      <button
        className="btn-action"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.value}
      </button>
    );
  }
}

export class Battlerstring extends React.Component {
  render() {
    const oBattler = this.props.thisBattler;

    return (
      <div classNAme="battlerString">
        <BattlerName thisBattler={oBattler} short={true} />
        <ActionButton
          value="Attack"
          onClick={this.props.onAttackClick}
          disabled={!this.props.isAlive || this.props.isMoving || !this.props.isBattleActive}
        />
      </div>
    );
  }
}

export class Battler extends React.Component {
  render() {
    const oBattler = this.props.thisBattler;
    return (
      <div
        className={`
          battler battler-${
            (this.props.isMoving ? 'currentmove' : 'currentwait')
          }
          ${(!this.props.isAlive ? 'battler-dead' : '')}
        `}
      >
        <BattlerName thisBattler={oBattler} short={false} />
        <ActionButton
          value="Attack"
          onClick={this.props.onAttackClick}
          disabled={!this.props.isAlive || this.props.isMoving || !this.props.isBattleActive}
        />
        <div className="indHP">
          HP: {oBattler.HP>0?oBattler.HP:0}/{oBattler.MHP}
        </div>
        <div className="indMP">
          MP: {oBattler.MP}/{oBattler.MMP}
        </div>
        <div className="indATK">
          ATK: {oBattler.ATK}
        </div>
        <div className="indDEF">
          DEF: {oBattler.DEF}
        </div>
      </div>
    );
  }
}
