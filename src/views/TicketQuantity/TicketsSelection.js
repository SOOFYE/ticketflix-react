import React, {useState} from 'react';
import "../../assets/ticketselection.css";
import QuantityInput from './QuantityInput';

function TicketsSelection() {

  const handleQuantityChange = (newQuantity) => {
    console.log('New Quantity: ', newQuantity);
    // You can handle the quantity change here, e.g., update the total price
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
      <QuantityInput onQuantityChange={handleQuantityChange} />
      <h1>0</h1>
      </div>
      <div className="ticketRows">
      <h1>SILVER</h1>
      <QuantityInput onQuantityChange={handleQuantityChange} />
      <h1>0</h1>
      </div>
      <div className="ticketRows">
      <h1>GOLD</h1>
      <QuantityInput onQuantityChange={handleQuantityChange} />
      <h1>0</h1>
      </div>


    <div className='confirmTickets'>
    <div className='priceShow'><p id='totalText'>TOTAL</p><p id="priceText">PKR 0</p></div>
    <button className='confirmButton'>CONFIRM TICKETS</button>
    </div>



    </div>
  )
}

export default TicketsSelection;
