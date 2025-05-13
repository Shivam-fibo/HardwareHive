import React from 'react'
import Navbar from './Nabar'
import ProductList from './ProductList'
import Footer from '../LandingPage/Module/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <ProductList/>
      <Footer/>
    </div>
  )
}

export default Home