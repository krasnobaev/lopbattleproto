import React from 'react'
import MainBlock from './interface/MainBlock'
import { VisibleHeader, VisiblePanelBar } from '../containers/ControlsContainer'
import { VisibleBattleField } from '../containers/BattleContainer'

const App = () => (
  <div>
    <VisibleHeader />
    <MainBlock>
      <VisibleBattleField />
      <VisiblePanelBar />
    </MainBlock>
  </div>
)

export default App
