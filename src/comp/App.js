import React from 'react'
import Header from './Header'
import MainBlock from './MainBlock'
import VisibleBattleField from '../containers/VisibleBattleField'
import VisibleTicTacToeGame from '../containers/VisibleTicTacToeGame'
import PanelBar from './PanelBar'

const App = () => (
  <div>
    <Header />
    <MainBlock>
      <VisibleBattleField />
      {/* <VisibleTicTacToeGame /> */}
      <PanelBar />
    </MainBlock>
  </div>
)

export default App
