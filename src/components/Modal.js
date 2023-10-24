import React from 'react';
import '../assets/modal.css';

function Modal({ message, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button className='modalCloseButton' onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
