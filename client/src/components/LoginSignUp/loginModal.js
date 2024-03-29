import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from 'react';

const Modal = ({ isOpen, message, onClose }) => {
    // const [inputValue, setInputValue] = useState('')
    // withReactContent(Swal).fire({
    //     title: <i>Input something</i>,
    //     input: 'text',
    //     inputValue,
    //     preConfirm: () => {
    //       setInputValue(Swal.getInput()?.value || '')
    //     },
    //   })
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {/* <p>{withReactContent}</p> */}
      </div>
    </div>
  );
};

export default Modal;
