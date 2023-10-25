import React, { useContext, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home/Home';
import SingleMovie from './views/Single/SingleMovie';
import { Ticket } from './assets/svg';
import TicketsSelection from './views/TicketQuantity/TicketsSelection';
import SeatSelection from './views/SeatSelection/SeatSelection';
import AddMovies from './views/Admin/AddMovies';
import AdminNavbar from './views/Admin/AdminNavbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Route,Routes} from 'react-router-dom';
import Loading from './components/Loading';


import MyContext from './MyContext';
import TicketHistory from './views/TicketHistory/TicketHistory';


function App() {


  const [isLoggedin,setisLoggedIn] = useState(false);
  const [userName,setUserName] = useState('');




  return (
    <div className="App">
     <MyContext.Provider value={{isLoggedin,setisLoggedIn,userName,setUserName}}>
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
        />

          <Navbar/>
          {/* <Loading/> */}

          <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/movie-info/:movieName" element={ <SingleMovie/> } />
              <Route path="/ticket-selection" element={ <TicketsSelection/> } />
              <Route path="/seat-selection" element={   <SeatSelection/>   } />
              <Route path="/ticket-history" element={   <TicketHistory/>   } />
          </Routes>

  {/* <Home/>  */}
      {/* <SingleMovie/>
    <TicketsSelection/>
    <SeatSelection/>  
    {/* <AdminNavbar/> */}

    {/* <AddMovies/> */}
            
    </MyContext.Provider>
    </div>
  );
}

export default App;
