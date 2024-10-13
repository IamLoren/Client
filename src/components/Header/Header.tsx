import React from 'react'
import { useAppDispatch } from '../../hooks'
import { openModal, openSignUpForm } from '../../redux/modalSlice/modalSlice'

const Header:React.FC = () => {
  const dispatch = useAppDispatch()
  const handleClick = ()=> {
    dispatch(openModal())
    dispatch(openSignUpForm())
  }
  return (
    <header className="sticky top-0 primary-background p-4 primary-text">
    <button onClick={handleClick}>зареєструватися</button>
    </header>
  )
}

export default Header