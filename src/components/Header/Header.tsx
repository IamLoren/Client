import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { openLogoutForm, openModal, openSignInForm, openSignUpForm } from '../../redux/modalSlice/modalSlice'
import { selectIsLogged } from '../../redux/selectors';
import Navigation from '../Navigation/Navigation';

const Header:React.FC = () => {
  const dispatch = useAppDispatch();
const isLogged = useAppSelector(selectIsLogged);

  const handleClickREgister = ()=> {
    dispatch(openModal())
    dispatch(openSignUpForm())
  }

  const handleClickLogin = () => {
    dispatch(openModal())
    dispatch(openSignInForm())
  }

  const handleClickLogout = () => {
    dispatch(openModal())
    dispatch(openLogoutForm())
  }
  return (
    <header className="sticky top-0 primary-background p-4 primary-text">
      
    {!isLogged &&  <button onClick={handleClickREgister}>зареєструватися</button>} <br />
    {!isLogged && <button onClick={handleClickLogin}>залогінитися</button>}
    {isLogged && <Navigation />} 
    {isLogged && <button onClick={handleClickLogout}> вийти</button>}
    </header>
  )
}

export default Header