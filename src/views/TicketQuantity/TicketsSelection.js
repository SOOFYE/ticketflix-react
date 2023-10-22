import React, {useState} from 'react';
import "../../assets/ticketselection.css";
import QuantityInput from './QuantityInput';

function TicketsSelection() {

  const [seatPrices,setSeatPrices] = useState({
    standard:0,
    silver:0,
    gold:0
  });

  const handleQuantityChange = (newQuantity,type) => {
    console.log('New Quantity: ', newQuantity,type);
    setSeatPrices(prevSeatPrices => {
      let updatedSeatPrices = { ...prevSeatPrices };
  
      if(type==='standard'){
        updatedSeatPrices['standard'] = newQuantity * 1000; 
      }
  
      if(type==='silver'){
        updatedSeatPrices['silver'] = newQuantity * 2000;
      }
      
      if(type==='gold'){
        updatedSeatPrices['gold'] = newQuantity * 3000;
      }
  
      // Return the updated seatPrices object to update the state
      return updatedSeatPrices;
    });
  

    
  };


  const calculateTotal = () => {
    return seatPrices.standard + seatPrices.silver + seatPrices.gold;
  };



  return (
    <div className="ticketPage">

      <h1 className='choose'>Choose your Seat Type</h1>

      <div className="ticketHeadings">
      <h1>TICKET TYPE</h1>
      <h1>QUANTITY</h1>
      <h1>PRICE (PKR)</h1>
      </div>

      <div className="ticketRows">
      <h1>STANDARD</h1>
      <QuantityInput onQuantityChange={handleQuantityChange} type='standard' />
      <h1>{seatPrices['standard']}</h1>
      </div>
      <div className="ticketRows">
      <h1>SILVER</h1>
      <QuantityInput onQuantityChange={handleQuantityChange} type='silver' />
      <h1>{seatPrices['silver']}</h1>
      </div>
      <div className="ticketRows">
      <h1>GOLD</h1>
      <QuantityInput onQuantityChange={handleQuantityChange} type='gold' />
      <h1>{seatPrices['gold']}</h1>
      </div>


    <div className='confirmTickets'>
    <div className='priceShow'><p id='totalText'>TOTAL</p><p id="priceText">PKR {calculateTotal()}</p></div>
    <button className='confirmButton'>CONFIRM TICKETS</button>
    </div>



    </div>
  )
}

export default TicketsSelection;
