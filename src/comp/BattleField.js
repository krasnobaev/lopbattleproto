import React from 'react';
import PropTypes from 'prop-types';

import './BattleField.sass';

class ActionButton extends React.Component {
  render() {
    return (
      <button
        className="btn-action"
        onClick={this.props.onClick}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Battler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HP: 12
    };
  }

  render() {
    return (
      <div className="battler">
        <h5>{this.props.name}</h5>
        <ActionButton
          value="Attack"
          onClick={this.props.onAttackClick}
        />
        <div>HP: {this.props.HP}</div>
      </div>
    );
  }
}

class BattleField extends React.Component {

  render() {
    return (
      <div className="battlefield">
        <div className="battlers-row">
          <Battler
            ID="1"
            name="player"
            HP={this.props.state.battlers[0].HP}
            onAttackClick={this.props.onAttackClick}
          />
          <div className="separator" />
          <Battler
            ID="2"
            name="enemy"
            HP={this.props.state.battlers[1].HP}
            onAttackClick={this.props.onAttackClick}
          />
        </div>
        <div className="battlers-row">
          <Battler
            ID="3"
            name="player"
            HP={this.props.state.battlers[2].HP}
            onAttackClick={this.props.onAttackClick}
          />
          <div className="separator" />
          <Battler
            ID="4"
            name="enemy"
            HP={this.props.state.battlers[3].HP}
            onAttackClick={this.props.onAttackClick}
          />
        </div>
      </div>
    );
  }
}

export default BattleField
