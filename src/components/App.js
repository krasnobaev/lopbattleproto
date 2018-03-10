import React from 'react'
import Header from './Header'
import MainBlock from './MainBlock'
import VisibleTicTacToeGame from '../containers/VisibleTicTacToeGame'
import PanelBar from './PanelBar'

const App = () => (
  <div>
    <Header />
    <MainBlock>
      <VisibleTicTacToeGame />
      <PanelBar />
    </MainBlock>
  </div>
)

export default App
