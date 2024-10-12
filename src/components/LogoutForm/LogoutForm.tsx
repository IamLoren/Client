import React from 'react'
import Button from '../Button/Button'

const LogoutForm:React.FC = () => {
  return (
    <div>
      <p className="mt-[10px] mb-[20px]">Do you really want to close your profile?</p>
      <Button type="button" buttonName='Logout' style="block ml-auto"></Button>
    </div>
  )
}

export default LogoutForm