import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const ClientPage:React.FC = () => {
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

export default ClientPage;