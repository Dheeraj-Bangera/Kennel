import React from 'react'
import Template from './Template'
import Navbar from "../pages/home/Navbar"

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>

      <Navbar/>
      <Template
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}

export default Signup
