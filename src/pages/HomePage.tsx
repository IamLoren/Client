import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage:React.FC = () => {
  return (
    <>
    <Header />
    <main className="h-96 flex-1 secondary-background secondary-text p-4">
    Main content
    </main>
    <Footer />
    </>
  )
}

export default HomePage