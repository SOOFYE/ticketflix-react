import { userIcon } from '../assets/svg'
import React, { useState,useContext } from 'react';
import weblogo from '../assets/weblogo.png'
import '../assets/navbar.css'
import { Link } from 'react-router-dom';

import MyContext from '../MyContext';
import LoginSignupPopup from '../views/SignInUp/LoginSignupPopup';

import { useNavigate } from 'react-router-dom';



function Navbar() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();




  const handleClick = () => {

      if(!context.isLoggedin){
            setIsPopupVisible(true);
            return;
      }

      if(context.role==='user'){
        navigate('ticket-history')
        return;
    }

        if(context.role==='admin'){
            navigate('/admin')
            return;
            }


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
          {context.isLoggedin ? <h1>Welcome {context.name}</h1> : <></>}
              {userIcon()}
              
          </div>
      </nav>
  );
}
export default Navbar