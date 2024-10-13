import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { selectIsLogged, selectRole } from '../redux/selectors.js'
import React from 'react';
import { useAppSelector } from '../hooks.js';

const PrivateUserRoute:React.FC<{children:React.ReactNode}> = ({children}) => {
    const isLogedIn = useSelector(selectIsLogged);
    const role = useAppSelector(selectRole)

    if (isLogedIn && role === "user") {
        return (
    children
  )
    } else {
        return  <Navigate to='/'/>
    }
  
}

export default PrivateUserRoute;