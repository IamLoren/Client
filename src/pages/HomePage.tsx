import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardsList from '../components/CardsList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { changeTheme } from '../redux/authSlice/authSlice'
import Modal from '../components/Modal'
import { isModalOpen } from '../redux/selectors'

const HomePage:React.FC = () => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(isModalOpen);

  useEffect(()=> {
    dispatch(changeTheme('dark'))
  },[dispatch])

  return (
    <>
    <Header />
    <main className="flex-1 secondary-background secondary-text p-4">
    <CardsList/>
    </main>
    <Footer />
    {isModal && <Modal/>}
    </>
  )
}

export default HomePage