import React,{useState} from 'react'
import "../../assets/quantityinput.css"

function QuantityInput({onQuantityChange,type,remainingSeats,setIsModalVisible,setModalMessage}) {

  
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
      if(quantity<remainingSeats[type]){
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity,type);
      }else{
        setIsModalVisible(true);
        setModalMessage(`No more ${type} seats are available at this moment`)
      }
    };
  
    const handleDecrement = () => {
      if (quantity > 0) {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity,type);
      }
    };
  
    return (
      <div className="quantityInput">
        <button onClick={handleDecrement} className="quantityButton">-</button>
        <input 
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="quantityField"
          readOnly
          disabled 
        />
        <button onClick={handleIncrement} className="quantityButton">+</button>
      </div>
    );
}

export default QuantityInput