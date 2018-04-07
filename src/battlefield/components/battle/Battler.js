import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components'

import './Battler.sass';

class BattlerName extends React.Component {
  render() {
    const oBattler = this.props.thisBattler || {};

    const tooltip = `
      ${oBattler.name} (LVL:${oBattler.LVL})

      HP:${oBattler.HP} \t/ MHP:${oBattler.MHP}
      MP:${oBattler.MP} \t/ MMP:${oBattler.MMP}

      ATK:${oBattler.ATK} \tDEF:${oBattler.DEF}

      pos:${oBattler.position}
    `.split('\n')
    // .map((el,i)=>i>1?el.trim():`\t${el}`)
    .map((el,i)=>el.trim())
    .join('\n');

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

const ActionButton = ({ onClick, disabled, value }) => (
  <button
    className="btn-action"
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

export const Battlerstring = ({ thisBattler, showAttackButton, onAttackClick, isAttackButtonDisabled }) => (
  <div className="battlerString">
    <BattlerName thisBattler={thisBattler} short={true} />
    {(showAttackButton) ? (
      <ActionButton
        value="Attack"
        onClick={onAttackClick}
        disabled={isAttackButtonDisabled}
        visible={false}
      />
    ) : ''}
  </div>
);

const BattlerTag = styled.div`
  &.battler:before {
    ${props => props.hpDelta && css`
      content: "${props => props.hpDelta}";
      color: crimson;
    `}
  }
  &.battler-event:before {
    ${props => props.event && css`
      content: "${props => props.event}";
      color: green;
    `}
  }
`;

export const Battler = ({
  thisBattler, onAttackClick,
  isAttackButtonDisabled, isMoving, isAlive
}) => (<BattlerTag
    id={`battler${thisBattler.ID}`}
    battlerid={thisBattler.hpDelta}
    hpDelta={thisBattler.hpDelta}
    event={thisBattler.event}
    className={`
      battler battler-event battler-${
        (isMoving ? 'currentmove' : 'currentwait')
      }
      ${(!isAlive ? 'battler-dead' : '')}
    `}
    onClick={onAttackClick}
  >
    <BattlerName thisBattler={thisBattler} short={false} />
    <div className="indHP">
      HP: {thisBattler.HP>0?thisBattler.HP:0}/{thisBattler.MHP}
    </div>
    <div className="indMP">
      MP: {thisBattler.MP}/{thisBattler.MMP}
    </div>
    <div className="indATK">
      ATK: {thisBattler.ATK}
    </div>
    <div className="indDEF">
      DEF: {thisBattler.DEF}
    </div>
  </BattlerTag>
);
