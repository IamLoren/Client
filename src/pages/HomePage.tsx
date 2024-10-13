import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CardsList from '../components/CardList/CardsList'
import { useAppDispatch} from '../hooks'
import { changeTheme } from '../redux/authSlice/authSlice'

const HomePage:React.FC = () => {
  const dispatch = useAppDispatch()

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
    </>
  )
}

export default HomePage