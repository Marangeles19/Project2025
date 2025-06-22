import React from 'react'
import Navbar from '../components/public/Navbar'
import Header from '../components/public/Header'

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-b from-sky-500 to-blue-900">
      <Navbar />
      <Header />
    </div>
  )
}

export default Home
