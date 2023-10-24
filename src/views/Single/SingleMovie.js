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

  const [showDates,setshowDates] = useState([]);
  const [showTimes,setShowTimes] = useState([]);

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


  


  const fetchData = async()=>{
    setload(true);
    try{
      const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Movies/${movieName}`)
      setmovieDetails(response.data[0])
      console.log(response)

      let temparray = []

      for (let key in response.data[0].showTimings) {
        if (key>=getCurrentDate()){
         
          temparray.push(key)
      }
    }
    setshowDates(temparray)

    setSelectedDate(temparray[0]);
    setShowTimes(response.data[0].showTimings[temparray[0]])

    console.log(temparray)
    console.log(response.data[0].showTimings[temparray[0]])

    setload(false);

    }catch(error){
      console.log(error);
    }

    

  }


  const handleDateChanges = async (date)=>{
    setSelectedDate(date);
    console.log(date)
    setShowTimes(movieDetails.showTimings[date])
  }

  const handleTimeSelection = async(time)=>{
    setSelectedTime(time);

    const object ={
      movie: movieDetails.movieName,
      date: selectedDate,
      time: time,
    } 

    console.log(object)
    
    navigate('/ticket-selection', {
      state: { movieSelection: object }
    });

  }


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
    <button onClick={()=>handleDateChanges(date)} className='date_buttons'>
      <p className='date'>{date===getCurrentDate()?'TODAY':date}</p>
      <p className='day'>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toLocaleUpperCase()}</p>
    </button>
    <div className='separator'></div>
  </React.Fragment>
))}
    {/* <button className='date_buttons'>
    <p className='date'>8/10</p>
    <p className='day'>SUN</p>
    </button>
    <div className='separator'></div>
    <button className='date_buttons'>
    <p className='date'>9/10</p>
    <p className='day'>MON</p>
    </button>
    <div className='separator'></div>
    <button className='date_buttons'>
    <p className='date'>10/10</p>
    <p className='day'>TUE</p>
    </button>
    <div className='separator'></div>
    <button className='date_buttons'>
    <p className='date'>11/10</p>
    <p className='day'>WED</p>
    </button> */}
</div>


<div className='timediv'>
<h1>SHOW TIMINGS</h1>
<div className="timings">
  {(showTimes)?showTimes.map((time)=>(<button onClick={()=>handleTimeSelection(time)} className='timingContainer'>
  <p className='timeP'>{convertTo12Hour(time)}</p>
  </button>)):<div className='text-white'>No time slots</div>}
  {/* <div className='timingContainer'>
  <p className='timeP'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='timeP'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='timeP'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div> */}
</div>

      </div>
    </div>



        
        </div> 
  ):(<Loading/>)
}

export default SingleMovie