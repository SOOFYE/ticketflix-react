import { userIcon } from '../assets/svg'
import React, { useState,useContext } from 'react';
import weblogo from '../assets/weblogo.png'
import '../assets/navbar.css'
import { Link } from 'react-router-dom';

import MyContext from '../MyContext';
import LoginSignupPopup from '../views/SignInUp/LoginSignupPopup';

import { useNavigate } from 'react-router-dom';



function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();




  const handleClick = () => {

      if(!context.isLoggedin){
            setIsPopupVisible(true);
            return;
      }

      navigate('/ticket-history');


  };

  return (
      <nav>
      
      <LoginSignupPopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
          <Link to='/'><div className='imageContainer'>
              <img className='navbarLogo' src={weblogo} alt="Website Logo"/>
          </div></Link>
          
          <div className='userIcon' onClick={handleClick}>
              {userIcon()}
              {/* {isDropdownVisible && (
                  <div className="dropdown">
                      <ul>
                          <li>Purchase History</li>
                      </ul>
                  </div>
              )} */}
          </div>
      </nav>
  );
}
export default Navbar