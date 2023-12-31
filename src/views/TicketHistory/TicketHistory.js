import React, { useState,useContext, useEffect } from 'react';
import '../../assets/ticketHistory.css';
import axios from 'axios';
import MyContext from '../../MyContext';
import Loading from '../../components/Loading';

import { logout } from '../../assets/svg';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function TicketHistory() {
    

      const context  = useContext(MyContext)
      const [load,setload] = useState(true);
      const [showDetails, setShowDetails] = useState(null);
      const [bookingDetails,setBookingDetails] = useState([]);
      const navigate = useNavigate();
      

      const getBooking = async()=>{
        try{
            setload(true)
            const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/user/${context.userName}`)
            console.log(response)
            setBookingDetails(response.data)
            setload(false)
        }catch(error){
            console.log(error)
        }
      }

      function convertTo12Hour(timeStr) {
        const [hours24, minutes] = timeStr.split(':');
        const hours = ((hours24 % 12) || 12).toString();
        const period = hours24 < 12 || hours24 === '24' ? 'AM' : 'PM';
        return `${hours.padStart(2, '0')}:${minutes} ${period}`;
      }
    
     


      useEffect(()=>{
        if(!context.userName){
            navigate('/')
            return;
        }
        getBooking();
      },[context.userName,navigate])


      const handleLogout = async ()=>{
        console.log(Cookies.get('token'))
       
                try{
                    await axios.post(
                        "https://cinemareservationsystemapi.azurewebsites.net/api/Users/logout", 
                        {}, // Data payload, if any, for the POST request
                        { withCredentials: true } // Axios request configuration
                      );
                    context.setisLoggedIn(false);
                    context.setUserName('')
                    context.setRole('')
                    context.setName('')
                    navigate('/')
                }catch(error){
                    console.log(error)
                }
      }




      return (
        !load ? (
            <div className="history-container">
            <div className='ticket-history-head'>Ticket History <button onClick={handleLogout}>Logout {logout()}</button></div>
                {
                    bookingDetails.length ? 
                    bookingDetails.map((value, index) => (
                        <div key={index} className="ticket-card" onClick={() => setShowDetails(showDetails === index ? null : index)}> 
                            <div className="ticket-header">
                                <span className="movie-title">{value.movieName}</span>
                                <span className="date">Screening On: {value.movieDate} {convertTo12Hour(value.movieTime)}</span>
                            </div>
                            {showDetails !== index ? (  // Change conditional logic to check for index
                                <div className="summary">
                                    <span>{value.numOfTickets} Tickets</span>
                                    <span>Total: PKR {value.totalPrice}</span>
                                </div>
                            ) : (
                                <div className="details">
                                    <p><span id='detailTHead'>Screening Time:</span> <span id='detailTDe'>{convertTo12Hour(value.movieTime)}</span></p>
                                    <p><span id='detailTHead'>Screening Date:</span> <span id='detailTDe'>{value.movieDate}</span></p>
                                    <p><span id='detailTHead'>Seats Booked:</span> <span id='detailTDe'>{value.seatsBooked.join(', ')}</span></p>
                                    <p><span id='detailTHead'>Price:</span> <span id='detailTDe'>PKR {value.totalPrice}</span></p>
                                    <p><span id='detailTHead'>Purchased On:</span> <span id='detailTDe'>{new Date(value.id.creationTime).toLocaleDateString()}</span></p>
                                </div>
                            )}
                        </div>
                    )) 
                    : 
                    <div className='no-booking-found'>No bookings found</div>
                }
            </div>
        ) : (
            <Loading />
        )
    );
}

export default TicketHistory