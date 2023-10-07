import React,{useState} from 'react'
import "../../assets/singlemovie.css"
import { calendar, clock, play } from '../../assets/svg'

function SingleMovie() {

  const [showPopup, setShowPopup] = useState(false);


  return (
        <div className='page'>
        
        <div className="infoColumn">

        <div className='titleSection'>

        <h1>Movie Title </h1>
        <p className='language'>English <span>| 18+</span></p>
        
        <div className='Genre_date'>
        <span className="whitespace-nowrap rounded-full bg-black px-2.5 py-0.5 text-sm mr-2 text-white">
          Horror | Thriller | homo
        </span>
        <span className='release'>{calendar()}05 Oct,2023</span>
        </div>

        <div className='duration'>
        <span >{clock()}2hr</span>
        </div>

        </div>

        <div className='Synopsis'>
        <h3>Synopsis</h3>
        <p className='synopsisInfo'>John Kramer (Tobin Bell) is back. 
        The most chilling installment of the SAW franchise yet explores 
        the untold chapter of Jigsaw’s most personal game. 
        Set between the events of SAW I and II, a 
        sick and desperate John travels to Mexico for a 
        risky and experimental medical procedure in hopes of a 
        miracle cure for his cancer – only to discover the entire 
        operation is a scam to defraud the most vulnerable. Armed with a 
        newfound purpose, John returns to his work, turning the tables on the con 
        artists in his signature visceral way through a series of ingenious and
         terrifying traps.</p>
       
        </div>
        
        
        </div>

        <div className="mediaColumn">

      <div className="posterContainer">
        <img src="https://source.unsplash.com/atsUqIm3wxo" alt="Movie Poster" />
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
            src="https://www.youtube.com/embed/AcJUYGD8zjk" 
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
    <button className='date_buttons'>
      <p className='date'>TODAY</p>
      <p className='day'>SAT</p>
    </button>
    <div className='separator'></div>
    <button className='date_buttons'>
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
    </button>
</div>


<div className='timediv'>
<h1>SHOW TIMINGS</h1>
<div className="timings">
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
  <div className='timingContainer'>
  <p className='time'>12:00 PM</p>
  <p className='ticketType'>2D</p>
  </div>
</div>

      </div>
    </div>



        
        </div> 
  )
}

export default SingleMovie