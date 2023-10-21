import { userIcon } from '../assets/svg'
import React, { useState } from 'react';
import weblogo from '../assets/weblogo.png'
import '../assets/navbar.css'





function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleClick = () => {
      setDropdownVisible(!isDropdownVisible);
  };

  return (
      <nav>
          <div className='imageContainer'>
              <img className='navbarLogo' src={weblogo} alt="Website Logo"/>
          </div>
          
          <div className='userIcon' onClick={handleClick}>
              {userIcon()}
              {isDropdownVisible && (
                  <div className="dropdown">
                      <ul>
                          <li>Purchase History</li>
                          {/* Add more list items as needed */}
                      </ul>
                  </div>
              )}
          </div>
      </nav>
  );
}
export default Navbar