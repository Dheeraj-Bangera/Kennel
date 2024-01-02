import React from 'react'
import LoginImg from "../../assets/login.png"

const Template = (image,formtype,setIsLoggedIn) => {
  return (
    <div>
      {formtype==="signup"?(<SignupForm/>):(<LoginForm/>)}

      <div>
        
    </div>

    <div></div>
    <p>OR</p>
    <div></div>

    <button>
        <p>Sign Up with Google </p>
    </button>

    <div>
      <img src={LoginImg}
      alt='logo'
      loading='lazy'/>

    </div>


    </div>

    
  )
}

export default Template
