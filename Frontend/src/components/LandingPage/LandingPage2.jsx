import React, {useEffect} from 'react'
import Header from './Module/Header'
import Hero from './Module/Hero'
import Container from './Module/Container'
import Branding from './Module/Branding'
import Footer from './Module/Footer'

const LandingPage2 = () => {

  useEffect(() =>{
    const user = localStorage.getItem('user')
    if (user) {
      localStorage.removeItem('user')
    }
  })

  return (
    <div>
        <Header/>
        <Hero/>
        <Branding/>
        <Container/>
        <Footer/>
    </div>
  )
}

export default LandingPage2