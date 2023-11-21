import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
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

function SideBar() {
  return (
    <div className='sidebar-container'>
      <div className="admin-sidebar">
        <ul>
        <li><Link to="/admin/view-dashboard">Dashboard</Link></li>
        <li><Link to="/admin/view-booking">Bookings</Link></li>
        <li><Link to="/admin/view-cinema">Cinemas</Link></li>
        <li><Link to="/admin/view-movie">Movies</Link></li>
        <li><Link to="/admin/scan-qr">Scan QR</Link></li>
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
          <Route path="detail-booking" element={<BookingDetails/>} />

          <Route path="scan-qr" element={<ScanQr/>} />


        </Routes>
      </div>
    </div>
  )
}

export default SideBar