import React, { useState, useEffect,useContext } from 'react';
import '../../assets/seatselection.css';
import Modal from '../../components/Modal';
import LoginSignupPopup from '../SignInUp/LoginSignupPopup';
import Loading from '../../components/Loading';
import MyContext from '../../MyContext';

import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Timer from './Timer';
import SessionExpireModal from '../../components/SessionExpireModal';
import BookingLoader from '../../components/BookingLoader';

function SeatSelection() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [showExpireModal, setExpireModal] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  // Maximum selectable seats per type
  const [seatsQntyToSelect, setQntySeatsToSelect] = useState({
    standard: 0,
    silver: 0,
    gold: 0,
  });

  const [alreadyBooked,setAlreadyBooked] = useState([])

  const [load,setload] = useState(true);
  const [bookload,setbookload] = useState(false);

  const location = useLocation();
  const navigation = useNavigate();
  const context = useContext(MyContext);

  const handleNextClick = async () => {
    let isSelectionValid = true;
    let invalidSelectionMessage = '';

    for (let key in seatsQntyToSelect) {
      const selectedOfType = selectedSeats.filter((seat) =>
        seat.toLowerCase().startsWith(key)
      ).length;
      if (selectedOfType !== seatsQntyToSelect[key]) {
        isSelectionValid = false;
        invalidSelectionMessage += `Please select exactly ${seatsQntyToSelect[key]} ${key} seats.`;
      }
    }
    // // Validate the selected seats
    // seatsQntyToSelect.forEach(({ type, qnty }) => {
    //   const selectedOfType = selectedSeats.filter((seat) =>
    //     seat.startsWith(type)
    //   ).length;
    //   if (selectedOfType !== qnty) {
    //     isSelectionValid = false;
    //     invalidSelectionMessage += `Please select exactly ${qnty} ${type} seats.`;
    //   }
    // });

    // Display a message in a modal if the selection is invalid
    if (!isSelectionValid) {
      setModalMessage(invalidSelectionMessage);
      setIsModalVisible(true);
      return;
    }
    try{
      setbookload(true);
        const objectToSend = {
            // userId: context.userName,
            cinemaName: location.state.movieSelection.cinema,
            movieName: location.state.movieSelection.movie,
            movieDate: location.state.movieSelection.date,
            movieTime: location.state.movieSelection.time,
            numOfTickets: selectedSeats.length,
            totalPrice: location.state.totalPrice,
            seatsBooked: selectedSeats
        }
        console.log(objectToSend)
        const response = await axios.post(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking`,objectToSend,{
          withCredentials: true
        });
        console.log(response);
        setbookload(false);
        toast.success("Successfully Booked")
        navigation('ticket-history')
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message);
        navigation('/')
    }
  };

  const handleSeatClick = (seatType, rowIndex, seatIndex) => {
    const seatId = `${seatType}-${rowIndex}-${seatIndex}`;

    // Check if the seatType is within the allowed selection
    // const seatTypeToSelect = seatsQntyToSelect.find((s) => s.type === seatType);
    const seatQnty = seatsQntyToSelect[seatType.toLowerCase()]
    const selectedOfType = selectedSeats.filter((s) =>
      s.startsWith(seatType)
    ).length;

    if (!selectedSeats.includes(seatId)) {
      if (selectedOfType < seatQnty) {
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
      } else {
        setModalMessage(
          `Sorry, you cannot select more than ${seatQnty} seat in ${seatType}.`
        );
        setIsModalVisible(true);
      }
    } else {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((seat) => seat !== seatId)
      );
    }
  };

  const getAlreadyBookedSeats = async (movieInfo)=>{
    setload(true);
    try{
        const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/bookedSeats?movieName=${movieInfo.movie}&movieDate=${movieInfo.date}&movieTime=${movieInfo.time}&cinemaName=${movieInfo.cinema}`);
        console.log(response)
        setAlreadyBooked(response.data.bookedSeats)
        setload(false);
        
    }catch(error){
        
    }
  }


  function convertTo12Hour(timeStr) {
    const [hours24, minutes] = timeStr.split(':');
    const hours = ((hours24 % 12) || 12).toString();
    const period = hours24 < 12 || hours24 === '24' ? 'AM' : 'PM';
    return `${hours.padStart(2, '0')}:${minutes} ${period}`;
  }

  useEffect(() => {
    if (!location.state?.seatQntySelection || !location.state?.movieSelection ) {
      navigation('/');
      return;
    }
    setQntySeatsToSelect(location.state.seatQntySelection);
    getAlreadyBookedSeats(location.state.movieSelection);


  }, []);

  return !load && !bookload? (
    <div className='selectionBody'>
      <LoginSignupPopup
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />

      {isModalVisible && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
      )}

      {showExpireModal &&(<SessionExpireModal setExpireModal={setExpireModal}/>)}

      <div className='seatSelectionTimer'><Timer setExpireModal={setExpireModal}/></div>

      <div className="seatSelectionWrapper">
        
        <div className="seatSelectionHeader">
          <h1 id="selectedMovieTitle">
            {location.state?.movieSelection.movie} <span id="lang">English</span>
          </h1>
          <h3 id="selectedDate">{location.state?.movieSelection.cinema}</h3>
          <p id="selectedDate">{location.state?.movieSelection.date}</p>
          <p id="selectedTime">{convertTo12Hour(location.state?.movieSelection.time)}</p>
        </div>
        
       

        <div className="seatsKey">
          <>
            <button className="seat key-available "></button>
            <p>Available</p>
          </>

          <>
            <button className="seat key-occupied "></button>
            <p>Occupied</p>
          </>

          <>
            <button className="seat key-selected "></button>
            <p>Selected</p>
          </>
        </div>

        {/* Selected Seats Display */}
        <div className="selectedSeatsDisplay">
          <>
            <h2 id="seleSheading">Selected Seats:</h2>
            <p id="selectedSeatShow">{selectedSeats.join(' ▪️ ')}</p>
          </>

          <>
            {/* Conditional Rendering of the NEXT Button */}
            {selectedSeats.length > 0 && (
              <button className="nextButton" onClick={handleNextClick}>
                NEXT
              </button>
            )}
          </>
        </div>

        <div className="screen">
          {/* Visually represent the screen here */}
          <p>SCREEN</p>
        </div>

        <div className="seatSelection">
          {[
            { type: 'Standard', se: 6 },
            { type: 'Silver', se: 3 },
            { type: 'Gold', se: 2 },
          ].map(({ type, se }) => (
            <div key={type} className={`${type.toLowerCase()}Seats`}>
              <h2 className="SeattypeHeader">{type} Seats</h2>
              <div className="seatGrid">
                {Array(se)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <div key={rowIndex} className="seatRow">
                      <span className="rowLabel">{rowIndex + 1}</span>
                      {Array(20)
                        .fill(null)
                        .map((_, seatIndex) => (
                          <button
                            key={seatIndex}
                            className={`seat ${
                              selectedSeats.includes(
                                `${type}-${rowIndex + 1}-${seatIndex + 1}`
                              )
                                ? 'selected'
                                : alreadyBooked.includes(
                                `${type}-${rowIndex + 1}-${seatIndex + 1}`
                              )
                                ? 'occupied'
                                : ''
                            }`}
                            onClick={() =>
                              handleSeatClick(type, rowIndex + 1, seatIndex + 1)
                            }
                          ></button>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ):bookload?(<BookingLoader/>):(<Loading/>)
}

export default SeatSelection;
