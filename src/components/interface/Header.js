import React from 'react'
import './Header.sass';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-buttons">
          <span>
            Menu:
          </span>
          <span>
            <button onClick={this.props.onInitButonClick}>rand battle room</button>
            <button
              onClick={this.props.onNextRoomButtonClick}
              disabled={!this.props.isPlayerBattlersAlive || !this.props.isBattleFinished}
            >proceed to next room</button>
          </span>
        </div>
        <div className="Header-info">
          <span className="Header-info-field">
            Next move: {this.props.actioner}
          </span>
          <span className="Header-info-field">
            Battle state: {this.props.state.battleState}
          </span>
        </div>
      </div>
    );
  }
}

export default Header
