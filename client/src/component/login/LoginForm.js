import React from 'react'

const LoginForm = () => {
 const [formData, setFormData]=useState({
    email:"",password:""
 })

 function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  

  return (
    <form>
        <label>
            <p>
                Email Address<sup>*</sup>
            </p>
            <input
            required
            type='text'
            value={FormData.email}
            onChange={changeHandler}
            placeholder='Enter Email id'
            />
        </label>
    </form>

  )
}

export default LoginForm
