
import React, { useState } from 'react';
import '../../assets/seatselection.css'
import Modal from './Modal';
import LoginSignupPopup from '../SignInUp/LoginSignupPopup';



function SeatSelection() {

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [selectedSeats, setSelectedSeats] = useState([]);
    // Maximum selectable seats per type
    const [seatsToSelect, setSeatsToSelect] = useState([
        {type:"Standard", qnty:3},
        {type:"Silver", qnty:4},
        {type:"Gold", qnty:0}
    ]);

    const handleNextClick = () => {
        let isSelectionValid = true;
        let invalidSelectionMessage = '';
    
        // Validate the selected seats
        seatsToSelect.forEach(({type, qnty}) => {
            const selectedOfType = selectedSeats.filter(seat => seat.startsWith(type)).length;
            if (selectedOfType !== qnty) {
                isSelectionValid = false;
                invalidSelectionMessage += `Please select exactly ${qnty} ${type} seats.`;
            }
        });
    
        // Display a message in a modal if the selection is invalid
        if (!isSelectionValid) {
            setModalMessage(invalidSelectionMessage);
            setIsModalVisible(true);
            return;
        }
    
        // Proceed to the next step
        console.log('Proceed to the next step...');

        setIsPopupVisible(true)


    };

    const handleSeatClick = (seatType, rowIndex, seatIndex) => {
        const seatId = `${seatType}-${rowIndex}-${seatIndex}`;

        // Check if the seatType is within the allowed selection
        const seatTypeToSelect = seatsToSelect.find(s => s.type === seatType);
        const selectedOfType = selectedSeats.filter(s => s.startsWith(seatType)).length;

        
            if (!selectedSeats.includes(seatId)) {
                if (selectedOfType < seatTypeToSelect.qnty) {
                setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatId]);
                } else {
                    setModalMessage(`Sorry, you cannot select more than ${seatTypeToSelect.qnty} seat in ${seatType}.`);
                    setIsModalVisible(true);
                }
            } else {
                setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatId));
            }
    };

    return (
        <>
        
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
      <div className="seatSelectionWrapper">
        <div className="seatSelectionHeader">
            <h1 id="selectedMovieTitle">SAW (2020) <span id='lang'>English</span></h1>
            <p  id='selectedDate'>08 OCT SUN</p>
            <p id='selectedTime'>12:00 PM</p>
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
            
            <h2 id='seleSheading'>Selected Seats:</h2>
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
            {[{ type: "Standard", se: 6 }, { type: "Silver", se: 3 }, { type: "Gold", se: 2 }].map(({ type, se }) => (
                <div key={type} className={`${type.toLowerCase()}Seats`}>
                    <h2 className='SeattypeHeader'>{type} Seats</h2>
                    <div className="seatGrid">
                        {Array(se).fill(null).map((_, rowIndex) => (
                            <div key={rowIndex} className="seatRow">
                                <span className="rowLabel">{rowIndex + 1}</span>
                                {Array(20).fill(null).map((_, seatIndex) => (
                                    <button 
                                      key={seatIndex} 
                                      className={`seat ${selectedSeats.includes(`${type}-${rowIndex+1}-${seatIndex+1}`) ? 'selected' : ''}`} 
                                      onClick={() => handleSeatClick(type, rowIndex+1, seatIndex+1)}
                                    ></button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>





      </div>
      </>
    );
  }

  
export default SeatSelection