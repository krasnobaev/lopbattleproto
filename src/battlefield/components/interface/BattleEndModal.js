import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    padding               : '0rem 1rem 1rem',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '300px',
    position              : 'absolute',
    border                : 'aqua 0.3rem solid',
    borderRadius          : '1rem',
    backgroundColor       : 'aliceblue',
  }
};

class BattleEndModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        className="battleEndModal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        closeTimeoutMS={500}
      >
        <button
            className="battleEndModal--CloseBtn"
            onClick={this.props.onClose}
        >❎</button>
        <h2>{
          this.props.battleExodus === 'WINNER_PLAYER' ? 'You wone!' :
          this.props.battleExodus === 'WINNER_ENEMY'  ? 'You Lose!' :
          this.props.battleExodus === 'BATTLE_FINISHED_OTHER_CONDITION'  ? 'Battle is over!' : ''
        }</h2>
          <button
              onClick={this.props.onNextRoomButtonClick}
              disabled={this.props.battleExodus !== 'WINNER_PLAYER'}
          >
            proceed to next room
          </button>
        <button onClick={this.props.onInitButonClick}>rand battle room</button>
      </Modal>
    );
  }
};

export default BattleEndModal;
