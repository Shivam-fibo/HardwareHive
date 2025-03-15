import React from 'react'
import NavigationBar from './NavigationBar'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import Products from './Product'
import Navbar from './Navbar'
const Home = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
        <Hero/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default Home