import logo from './logo.svg';
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

function App() {
  return (
    <div className="App">
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

          <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/movie-info/:movieName" element={ <SingleMovie/> } />
              <Route path="/ticket-selection" element={ <TicketsSelection/> } />
              <Route path="/seat-selection" element={   <SeatSelection/>   } />
          </Routes>

  {/* <Home/>  */}
      {/* <SingleMovie/>
    <TicketsSelection/>
    <SeatSelection/>  
    {/* <AdminNavbar/> */}

    {/* <AddMovies/> */}
            
    
    </div>
  );
}

export default App;
