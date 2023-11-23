import React, {useEffect, useState,useContext} from 'react';
import "../../assets/ticketselection.css";
import QuantityInput from './QuantityInput';
import Modal from '../../components/Modal';
import axios from 'axios';



import { useLocation,useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import LoginSignupPopup from '../SignInUp/LoginSignupPopup';
import MyContext from '../../MyContext';


const STANDARD_PRICES = 1000;
const SILVER_PRICES = 2000;
const GOLD_PRICES = 3000;

function TicketsSelection() {

  const location = useLocation();
  const navigation = useNavigate();
  const context = useContext(MyContext);

  const [seatPrices,setSeatPrices] = useState({
    standard:0,
    silver:0,
    gold:0
  });

  const [remainingSeats,setRemainingSeats] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [load,setload] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);


  

  const handleQuantityChange = (newQuantity,type) => {
    console.log('New Quantity: ', newQuantity,type);
    setSeatPrices(prevSeatPrices => {
      let updatedSeatPrices = { ...prevSeatPrices };
  
      if(type==='standard'){
        updatedSeatPrices['standard'] = newQuantity * STANDARD_PRICES; 
      }
  
      if(type==='silver'){
        updatedSeatPrices['silver'] = newQuantity * SILVER_PRICES;
      }
      
      if(type==='gold'){
        updatedSeatPrices['gold'] = newQuantity * GOLD_PRICES;
      }
  
      // Return the updated seatPrices object to update the state
      return updatedSeatPrices;
    });
  

    
  };


  const calculateTotal = () => {
    return seatPrices.standard + seatPrices.silver + seatPrices.gold;
  };


  const getQuantity = async (movieInfo)=>{
    setload(true);
    try{
      const response = await axios.get(`https://cinemareservationsystemapi.azurewebsites.net/api/Booking/bookedSeats?movieName=${movieInfo.movie}&movieDate=${movieInfo.date}&movieTime=${movieInfo.time}&cinemaName=${movieInfo.cinema}`)
      console.log(response.data.remainingSeats)
      setRemainingSeats(response.data.remainingSeats)
      setload(false)
    }catch(error){
      console.log(error)
    }
  }


  const confirmSeats = async()=>{

    if(!context.isLoggedin){
      setIsPopupVisible(true);
      return
    }

    const seatQuantity = {
      standard: seatPrices['standard'] / STANDARD_PRICES,
      silver: seatPrices['silver'] / SILVER_PRICES,
      gold: seatPrices['gold'] / GOLD_PRICES,
    }

    if(seatQuantity['standard']===0&&seatQuantity['silver']===0&&seatQuantity['gold']===0){
      setModalMessage('Please select ticket quantity.')
      setIsModalVisible(true);
      return;
    }

    const TOTAL_PRICE = calculateTotal()

    navigation('/seat-selection', {
      state: { seatQntySelection: seatQuantity, movieSelection:location.state.movieSelection, totalPrice:TOTAL_PRICE }
    });
  }



  useEffect(()=>{
    if(!location.state?.movieSelection){
      navigation('/')
      return;
    }

    getQuantity(location.state.movieSelection)



  },[])



  return !load? (
    <div className="ticketPage">


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

      <h1 className='choose'>Choose your Seat Type</h1>

      <div className="ticketHeadings">
      <h1>TICKET TYPE</h1>
      <h1>QUANTITY</h1>
      <h1>PRICE (PKR)</h1>
      </div>

      <div className="ticketRows">
      <h1>STANDARD</h1>
      <QuantityInput setIsModalVisible={setIsModalVisible} setModalMessage={setModalMessage}   remainingSeats={remainingSeats} onQuantityChange={handleQuantityChange} type='standard' />
      <h1>{seatPrices['standard']}</h1>
      </div>
      <div className="ticketRows">
      <h1>SILVER</h1>
      <QuantityInput  setIsModalVisible={setIsModalVisible} setModalMessage={setModalMessage} remainingSeats={remainingSeats}  onQuantityChange={handleQuantityChange} type='silver' />
      <h1>{seatPrices['silver']}</h1>
      </div>
      <div className="ticketRows">
      <h1>GOLD</h1>
      <QuantityInput  setIsModalVisible={setIsModalVisible} setModalMessage={setModalMessage} remainingSeats={remainingSeats} onQuantityChange={handleQuantityChange} type='gold' />
      <h1>{seatPrices['gold']}</h1>
      </div>


    <div className='confirmTickets'>
    <div className='priceShow'><p id='totalText'>TOTAL</p><p id="priceText">PKR {calculateTotal()}</p></div>
    <button onClick={()=>confirmSeats()} className='confirmButton'>CONFIRM TICKETS</button>
    </div>



    </div>
  ):(<Loading/>)
}

export default TicketsSelection;
