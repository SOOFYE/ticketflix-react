import React from 'react'
import '../assets/modal.css';
import { useNavigate } from 'react-router-dom';


function SessionExpireModal({setExpireModal}) {
    const navigate = useNavigate()
    const handleClick = ()=>{
        setExpireModal(false);
        navigate('/');
    }
  return (
    <div className="modal">
    <div className="modal-content">
        <p>"Session Expired. Please book within the time frame!"</p>
        <button className='modalCloseButton' onClick={handleClick}>Go Back</button>
    </div>
</div>
  )
}

export default SessionExpireModal