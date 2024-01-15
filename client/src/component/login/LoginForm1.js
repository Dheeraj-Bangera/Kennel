import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';

const LoginForm1 = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


  return (
    <section>
       <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form>
            <label htmlFor=''>
            <p>
                Email Address <sup>*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailNote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />


            </label>
          </form>
    </section>
  )
}

export default LoginForm1
