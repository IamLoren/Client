import React from 'react';

interface ModalProps {
    children:React.ReactNode;
}

const Modal:React.FC<ModalProps> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default Modal;