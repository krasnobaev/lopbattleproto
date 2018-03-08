import React from 'react'
import './MainBlock.sass';
 
const MainBlock = ({children}) => (
  <footer className="app-footer">
    {children}
    FooterMenu
  </footer>
)

export default MainBlock
