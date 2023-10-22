import React,{useState} from 'react'
import "../../assets/quantityinput.css"

function QuantityInput({onQuantityChange,type}) {

  
    const [quantity, setQuantity] = useState(0);

    const handleIncrement = () => {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity,type);
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
        />
        <button onClick={handleIncrement} className="quantityButton">+</button>
      </div>
    );
}

export default QuantityInput