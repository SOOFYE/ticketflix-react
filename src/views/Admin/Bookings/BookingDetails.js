import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import "../../../assets/viewbookings.css"

import Loading from '../../../components/Loading';

function BookingDetails() {


    const [booking,setBooking] = useState([]);
    const { bookingid } = useParams()
    const navigate = useNavigate();
    const [load,setLoad] = useState(true)


    const fetchData = async()=>{
      setLoad(true)
        try{
            const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/${bookingid}`);
            setBooking(response.data);
            console.log(response);
            setLoad(false);
        }catch(error){
            toast.error("Error Fetching Booking Record")
            console.log(error)
            navigate("/admin/dashboard")
        }
    }

    useEffect(()=>{
        fetchData();
    },[])
    return !load?(
        <div className="booking-details-container">
          <div className="card">
            <h3>User ID</h3>
            <p>{booking.userId}</p>
          </div>
          <div className="card">
            <h3>Movie Name</h3>
            <p>{booking.movieName}</p>
          </div>
          <div className="card">
            <h3>Movie Date</h3>
            <p>{booking.movieDate}</p>
          </div>
          <div className="card">
            <h3>Movie Time</h3>
            <p>{booking.movieTime}</p>
          </div>
          <div className="card">
            <h3>Cinema Name</h3>
            <p>{booking.cinemaName}</p>
          </div>
          <div className="card">
            <h3>Number of Tickets</h3>
            <p>{booking.numOfTickets}</p>
          </div>
          <div className="card">
            <h3>Total Price</h3>
            <p>{booking.totalPrice}</p>
          </div>
          <div className="card">
            <h3>Seats Booked</h3>
            <ul>
              {booking.seatsBooked.map((seat, index) => (
                <li key={index}>{seat}</li>
              ))}
            </ul>
            
          </div>
        </div>
      ):(<Loading/>);
}

export default BookingDetails