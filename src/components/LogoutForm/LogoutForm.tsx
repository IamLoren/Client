import React from 'react'
import Button from '../Button/Button'
import { useAppDispatch } from '../../hooks'
import { logoutThunk } from '../../redux/authSlice/operations'
import { closeModal } from '../../redux/modalSlice/modalSlice'

const LogoutForm:React.FC = () => {
  const dispatch = useAppDispatch()

const onClickLogout = ()=> {
  dispatch(logoutThunk());
  dispatch(closeModal())
}

  return (
    <div data-cy="exit accepting">
      <p className="mt-[10px] mb-[20px]">Do you really want to close your profile?</p>
      <Button type="button" buttonName='Logout' style="block ml-auto" onClick={onClickLogout}></Button>
    </div>
  )
}

export default LogoutForm