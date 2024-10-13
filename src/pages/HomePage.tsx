import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CardsList from '../components/CardList/CardsList'

const HomePage:React.FC = () => {

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