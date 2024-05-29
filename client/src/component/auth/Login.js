import React from 'react'
import Template from './Template'
import Navbar from '../pages/home/Navbar'

const Login = ({setIsLoggedIn}) => {
  return (
    <div>

      <Navbar/>
      <Template
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}

export default Login
