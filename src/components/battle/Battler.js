import React from 'react';
import PropTypes from 'prop-types';

import './Battler.sass';

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
      <div>
        <span>{oBattler.name}</span>
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
        <h5 className="name">{oBattler.name}</h5>
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
      </div>
    );
  }
}
