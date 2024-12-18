import React from 'react';
import { ButtonProps } from './ButtonTypes';

const Button:React.FC<ButtonProps> = ({type, buttonName, ariaLabel, style, onClick, children}) => {

  return (
    <button aria-label={buttonName ? buttonName : ariaLabel} type={type} onClick={onClick} className={`styled-button rounded-lg border border-primary-500 accent-background px-5 py-2.5 text-center text-sm font-medium white-text shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300 box-shadow ${style}`}>{buttonName}{children}</button>
  )
}

export default Button