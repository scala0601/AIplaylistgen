//import React from 'react';
import './Modal.css';

interface ModalProps {
  message: string;
  onClose: () => void;
}

function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Modal; 