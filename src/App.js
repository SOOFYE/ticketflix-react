import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home/Home';
import SingleMovie from './views/Single/SingleMovie';
import { Ticket } from './assets/svg';
import TicketsSelection from './views/TicketQuantity/TicketsSelection';
import SeatSelection from './views/SeatSelection/SeatSelection';

function App() {
  return (
    <div className="App">
    <Navbar/>
    {/* <Home/> */}
    {/* <SingleMovie/> */}
    {/* <TicketsSelection/> */}
    <SeatSelection/>
    </div>
  );
}

export default App;
