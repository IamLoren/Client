import React from 'react'
import Button from '../Button/Button'

const LogoutForm:React.FC = () => {
  return (
    <div>
      <p>Do you really want to close your profile?</p>
      <Button type="button" buttonName='Logout'></Button>
    </div>
  )
}

export default LogoutForm