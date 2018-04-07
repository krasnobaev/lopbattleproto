import React from 'react'
import { ToastContainer } from 'react-toastify';

import MainBlock from './interface/MainBlock'
import { VisibleMainBlock, VisibleHeader, VisiblePanelBar } from '../containers/ControlsContainer'
import { VisibleBattleField } from '../containers/BattleContainer'

const App = () => (
  <div>
    <VisibleHeader />
    <VisibleMainBlock>
      <VisibleBattleField />
      <VisiblePanelBar />
    </VisibleMainBlock>
    <ToastContainer />
  </div>
)

export default App
