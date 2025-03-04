import React from 'react'
import NavigationBar from './NavigationBar'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import Products from './Product'
const Home = () => {
  return (
    <div>
        <NavigationBar/>
        <Header/>
        <Hero/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default Home