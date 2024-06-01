import React, { useState } from 'react'
import Template from './Template'
import Navbar from "../pages/home/Navbar"
import OTP from './OTP';

const Signup = ({setIsLoggedIn}) => {
  const [otpDisplay, setOtpDisplay] = useState(false);
  const [data,setData]=useState(null);
  if(otpDisplay){
    return(
      <OTP signupData={data}/>
    )
  }else{


  return (
    <div>
      <Navbar/>
      <Template
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
      setOtpDisplay={setOtpDisplay}
      setData={setData}
      />
    </div>
  )
}
}

export default Signup
