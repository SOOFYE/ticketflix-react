import React,{useEffect, useState} from 'react'
import "../../assets/singlemovie.css"
import { calendar, clock, play } from '../../assets/svg'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

function SingleMovie() {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const { movieName } = useParams();
  const [movieDetails,setmovieDetails] = useState(null);

  const [cinemaDetails,setCinemaDetails] = useState([])
  const [showDates,setshowDates] = useState([]);
  const [showTimes,setShowTimes] = useState([]);

  const [selectedCinema,setSelectedCinema]= useState();
  const [selectedDate,setSelectedDate] = useState();
  const [selectedTime,setSelectedTime] = useState();

  const [load,setload] = useState(true);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  // months are 0-based in JS
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function convertTo12Hour(timeStr) {
    const [hours24, minutes] = timeStr.split(':');
    const hours = ((hours24 % 12) || 12).toString();
    const period = hours24 < 12 || hours24 === '24' ? 'AM' : 'PM';
    return `${hours.padStart(2, '0')}:${minutes} ${period}`;
  }


  


  const fetchData = async () => {
    setload(true);
    try {
      const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/${movieName}`);
      const movieData = response.data[0];
      setmovieDetails(movieData);
  
      // New transformation code
      const today = getCurrentDate();
      const cinemasWithDates = Object.entries(movieData.showTimings).reduce((acc, [cinemaName, dates]) => {
        Object.entries(dates).forEach(([date, times]) => {
          if (date >= today) {
            if (!acc[date]) acc[date] = [];
            acc[date].push({ cinema: cinemaName, times });
          }
        });
        return acc;
      }, {});
  
      setCinemaDetails(cinemasWithDates);
  
      // Setup initial states
      const initialDates = Object.keys(cinemasWithDates);
      if (initialDates.length > 0) {
        const sortedDates = initialDates.sort(); // Sort dates to get the nearest date first
        setshowDates(sortedDates);
        setSelectedDate(sortedDates[0]);
        setShowTimes(cinemasWithDates[sortedDates[0]]);
      }
  
      setload(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTimeSelection = async(time,cinema)=>{
    setSelectedTime(time);

    const object ={
      movie: movieDetails.movieName,
      cinema: cinema,
      date: selectedDate,
      time: time,
    } 

    console.log(object)
    
    navigate('/ticket-selection', {
      state: { movieSelection: object }
    });

  }


  const handleDateChanges = (date) => {
    setSelectedDate(date);
    // Update the showTimes to the showtimes for all cinemas on the selected date
    setShowTimes(cinemaDetails[date] || []);
  };

  // const handleCinemaSelection = (cinema) => {
  //   setSelectedCinema(cinema);
  //   // Optionally, you can filter showtimes for the selected cinema here
  // };


  useEffect(()=>{
      fetchData()
      console.log(showTimes)
  },[])


  return !load?(
        <div className='page'>
        
        <div className="infoColumn">

        <div className='titleSection'>

        <h1>{movieDetails.movieName}</h1>
        <p className='language'>English <span>| {movieDetails.certificate}</span></p>
        
        <div className='Genre_date'>
        <span className="whitespace-nowrap rounded-full bg-black px-2.5 py-0.5 text-sm mr-2 text-white">
        {movieDetails.genre.join(' | ')}
        </span>
        <span className='release'>{calendar()}05 Oct,2023</span>
        </div>

        <div className='duration'>
        <span >{clock()}{movieDetails.runtime}</span>
        </div>

        </div>

        <div className='Synopsis'>
        <h3>Synopsis</h3>
        <p className='synopsisInfo'>{movieDetails.overview}</p>
       
        </div>
        
        
        </div>

        <div className="mediaColumn">

      <div className="posterContainer">
        <img src={movieDetails.posterLink} alt="Movie Poster" />
        <button
          className="trailerButton"
          onClick={() => setShowPopup(true)}
        >
          {play()}Watch Trailer
        </button>
      </div>
      
      {showPopup && (
        <div className="popup">
          <iframe 
            title="YouTube Trailer" 
            src={movieDetails.trailer} 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          ></iframe>
          <button
            className="closeButton"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
      )}

      <div className='date_tabs'>
        {showDates.map((date, index) => (
          <React.Fragment key={index}>
            <button onClick={() => handleDateChanges(date)} className='date_buttons'>
              <p className='date'>{date === getCurrentDate() ? 'TODAY' : date}</p>
              <p className='day'>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLocaleUpperCase()}</p>
            </button>
            <div className='separator'></div>
          </React.Fragment>
        ))}
      </div>

      <div className='timediv'>
  {/* <h1>SHOW TIMINGS</h1> */}
  {showTimes.length > 0 ? (
    showTimes.map(({ cinema, times }) => (
      <div key={cinema} className="cinema-timings">
        <h1>{cinema}</h1>
        <div className="timings">
          {times.map((time) => (
            <button key={time} onClick={() => handleTimeSelection(time, cinema)} className='timingContainer'>
              <p className='timeP'>{convertTo12Hour(time)}</p>
            </button>
          ))}
        </div>
      </div>
    ))
  ) : (
    <div className='text-white'>No showtimes available for this date.</div>
  )}
</div>

      </div>
</div>


  ):(<Loading/>)
}

export default SingleMovie