import React from 'react'
import Headroom from 'react-headroom'

import './header.scss'

const Header = ({ children }) => (
  <Headroom>
    <div className="header-container">{children}</div>
  </Headroom>
)

export default Header
