import React from 'react'
import Header from '../components/Header'
import Mid from '../components/Mid'
import BottomNav from '../components/BottomNav'
import Buttons from '../components/Buttons'
import Lectures from '../components/Lectures'

const Home = () => {
  return (
    <>    
          <Header />
          <Mid />
          <BottomNav />
          {/* <Buttons /> */}
          <Lectures />
    </>
  )
}

export default Home