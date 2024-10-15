import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Container from '../components/Container/Container'
import FiltersBar from '../components/FiltersBar/FiltersBar'
import Catalog from '../components/Catalog/Catalog'

const HomePage:React.FC = () => {

  return (
    <>
    <Header />
    <main className="flex-1 secondary-background secondary-text p-4">
      <Container addStyles='flex gap-[30px]'>
        <FiltersBar/>
        <Catalog />
      </Container>
    </main>
    <Footer />
    </>
  )
}

export default HomePage