import React from 'react'
import Template from './Template'

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
    formtype="login"
    setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Login
