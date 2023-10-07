import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home/Home';
import SingleMovie from './views/Single/SingleMovie';

function App() {
  return (
    <div className="App">
    <Navbar/>
    {/* <Home/> */}
    <SingleMovie/>
    </div>
  );
}

export default App;
