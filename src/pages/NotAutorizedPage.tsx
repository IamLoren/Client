import React from 'react'
import { useAppDispatch } from '../hooks';
import { openModal, openSignInForm, openSignUpForm } from '../redux/modalSlice/modalSlice';
import Button from '../components/Button/Button';

const NotAutorizedPage:React.FC = () => {
const dispatch = useAppDispatch();

    const handleSignUp = () => {
        dispatch(openModal());
        dispatch(openSignUpForm());
      };
    
      const handleSignIn = () => {
        dispatch(openModal());
        dispatch(openSignInForm());
      };
  return (
    <div>
        OOOPS! It looks like you are not logged in...
        <Button buttonName="Sign Up" type="button" onClick={handleSignUp} />
        <Button buttonName="Sign In" type="button" onClick={handleSignIn} />
      </div>
  )
}

export default NotAutorizedPage