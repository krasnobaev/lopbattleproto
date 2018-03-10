import React from 'react'
import Header from './Header'
import MainBlock from './MainBlock'
import VisibleGame from '../containers/VisibleGame'
import PanelBar from './PanelBar'

const App = () => (
  <div>
    <Header />
    <MainBlock>
      <VisibleGame />
      <PanelBar />
    </MainBlock>
  </div>
)

export default App
