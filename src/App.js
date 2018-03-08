import React from 'react'
import Header from './Components/Header'
import MainBlock from './Components/MainBlock'
import Game from './Components/Game'
import PanelBar from './Components/PanelBar'
import './main.sass'

const App = () => (
  <div>
    <Header />
    <MainBlock>
      <Game />
      <PanelBar />
    </MainBlock>
  </div>
)

export default App
