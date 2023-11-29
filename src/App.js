import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home/Home';
import SingleMovie from './views/Single/SingleMovie';
import { Ticket } from './assets/svg';
import TicketsSelection from './views/TicketQuantity/TicketsSelection';
import SeatSelection from './views/SeatSelection/SeatSelection';
import AddMovies from './views/Admin/Movie/AddMovies';
import AdminNavbar from './views/Admin/AdminNavbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Route,Routes} from 'react-router-dom';
import Loading from './components/Loading';


import MyContext from './MyContext';
import TicketHistory from './views/TicketHistory/TicketHistory';
import MovieView from './views/Admin/Movie/MovieView';
import EditMovie from './views/Admin/Movie/EditMovie';
import SideBar from './views/Admin/SideBar';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';


function App() {


  const [isLoggedin,setisLoggedIn] = useState(false);
  const [userName,setUserName] = useState('');
  const [role,setRole] = useState('');
  const [email,setEmail] = useState();
  const [name,setName] = useState('');


  const checkLogin = async ()=>{
    try{
      const response = await axios.get('https://cinemareservationsystemapi.azurewebsites.net/api/Users/IsLoggedIn',{
        withCredentials: true
      });
      setisLoggedIn(true);
      setUserName(response.data.id)
      setRole(response.data.role)
      setEmail(response.data.email)
      setName(response.data.name)
      console.log(response)

    }catch(error){
      setisLoggedIn(false)
    }
  }


  useEffect(()=>{
    checkLogin();

  },[])




  return (
    <div className="App">
     <MyContext.Provider value={{isLoggedin,setisLoggedIn,userName,setUserName,role,setRole,email,name,setName}}>
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

          <CookiesProvider>
          <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/movie-info/:movieName" element={ <SingleMovie/> } />
              <Route path="/ticket-selection" element={ <TicketsSelection/> } />
              <Route path="/seat-selection" element={   <SeatSelection/>   } />
              
              <Route path="/ticket-history" element={   <TicketHistory/>   } />
         
              <Route path="/admin/*" element={   <SideBar/>   } />
              
              {/* <Route path="admin/add-new-movie" element={   <AddMovies/>   } />
              <Route path="admin/edit-movie/:movieName" element={   <EditMovie/>   } /> */}
          </Routes>
          </CookiesProvider>

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
