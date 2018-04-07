import React from 'react';

// import { VisibleBattleEndModal } from '../../containers/ControlsContainer';
import BattleEndModal from './BattleEndModal';
import './MainBlock.sass';

class MainBlock extends React.Component {
  render() {
    return (
      <footer className="app-footer">
        <BattleEndModal
          isOpen={this.props.state.openBattleEndDialog}
          battleExodus={this.props.state.battleExodus}

          onClose={this.props.onCloseBattleEndDialog}
          onNextRoomButtonClick={this.props.onNextRoomButtonClick}
          onInitButonClick={this.props.onInitButonClick}
        />
        {this.props.children}
        FooterMenu
      </footer>
    )
  }
}

export default MainBlock
