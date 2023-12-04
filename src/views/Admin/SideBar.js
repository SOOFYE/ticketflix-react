import React, { useEffect,useContext,useState } from 'react'
import MyContext from '../../MyContext';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MovieView from './Movie/MovieView';
import AddMovies from './Movie/AddMovies';
import EditMovie from './Movie/EditMovie';

import "../../assets/sidebaradmin.css"
import CinemaView from './Cinema/CinemaView';
import AddCinema from './Cinema/AddCinema';
import EditCinema from './Cinema/EditCinema';
import BookingView from './Bookings/BookingView';
import BookingDetails from './Bookings/BookingDetails';
import ScanQr from './QRCode/ScanQr';
import Loading from '../../components/Loading';


import { logout } from '../../assets/svg';

import Cookies from 'js-cookie';
import NotFound404 from '../NotFound/NotFound404';

import axios from 'axios';




function SideBar() {

  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [load,setLoad] = useState(true);


  useEffect(()=>{
    
    setLoad(true)

    console.log(context)

    if(context.role!=="admin"){
      navigate('/')
    }

    setLoad(false)

  },[context,navigate])


  const handleLogout = async()=>{
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
  


  return ! load ?  (
    <div className='sidebar-container'>
      <div className="admin-sidebar">
        <ul>
        {/* <li><Link to="/admin/view-dashboard">Dashboard</Link></li> */}
        <li><Link to="/admin/view-booking">Bookings</Link></li>
        <li><Link to="/admin/view-cinema">Cinemas</Link></li>
        <li><Link to="/admin/view-movie">Movies</Link></li>
        <li><Link to="/admin/scan-qr">Scan QR</Link></li>
        <li><button className='logout-button' onClick={handleLogout}>Logout {logout()}</button></li>
        </ul>
      </div>
      <div className='admin-views'>
        <Routes>

          

          <Route path="view-movie" element={<MovieView/>} />
          <Route path="add-new-movie" element={<AddMovies/>} />
          <Route path="edit-movie/:movieName" element={<EditMovie/>} />

          <Route path="view-cinema" element={<CinemaView/>} />
          <Route path="add-new-cinema" element={<AddCinema/>} />
          <Route path="edit-cinema/:cinemaName" element={<EditCinema/>} />

          <Route path="view-booking" element={<BookingView/>} />
          <Route path="detail-booking/:bookingid" element={<BookingDetails/>} />

          <Route path="scan-qr" element={<ScanQr/>} />


          <Route path="*" element={<NotFound404/>} />


        </Routes>
        
      </div>
    </div>
  ):(<Loading/>)
}

export default SideBar