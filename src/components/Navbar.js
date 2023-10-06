import { userIcon } from '../assets/svg'
import React, { useState } from 'react';
import weblogo from '../assets/weblogo.png'
import '../assets/navbar.css'





function Navbar() {
  return (
   <nav>
      <div className='imageContainer'><img className='navbarLogo' src={weblogo}/></div>
      
      <div className='userIcon'>{userIcon()}</div>

</nav>
  )
}

export default Navbar