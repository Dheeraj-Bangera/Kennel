import React, { useState, useRef, useEffect } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z\s.'-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CONTACT_REGEX = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SIGNUP_URL = "/user/signup";

const SignupForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = CONTACT_REGEX.test(phoneNumber);
    setValidPhoneNumber(result);
  }, [phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          name: user,
          password: pwd,
          email: email,
          phoneNumber: phoneNumber,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      console.error("Registration error:", err);

      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg("Registration Failed");
        }
      } else {
        setErrMsg("An unexpected error occurred during registration");
      }

      errRef.current.focus();
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
          <NavLink to="/Login">Log In</NavLink>
          </p>
        </section>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <p>
                Name <sup>*</sup>
              </p>
              <input
                required
                type="text"
                id="name"
                ref={userRef}
                autoComplete="off"
                name="name"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter name"
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FaCircleInfo />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters allowed only.
              </p>
            </label>
            <label>
              <p>
                Phone Number <sup>*</sup>
              </p>
              <input
                required
                type="tel"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone number"
                aria-invalid={validPhoneNumber ? "false" : "true"}
                aria-describedby="phoneNote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
              />

              <p
                id="phoneNote"
                className={
                  phoneNumberFocus && phoneNumber && !validPhoneNumber
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FaCircleInfo />
                10 numbers only.
              </p>
            </label>
            <label>
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

              <p
                id="emailNote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                {emailFocus && email && !validEmail && (
                  <>
                    <FaCircleInfo />
                    Format: xyz@domain.com
                  </>
                )}
              </p>
            </label>


            <div>
              <label htmlFor="password">
                <p>
                  Create Password <sup>*</sup>
                </p>
                <input
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Enter Password"
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FaCircleInfo />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </label>
              <label>
                <p>
                  Confirm Password <sup>*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  placeholder="Confirm Password"
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FaCircleInfo />
                  Must match the first password input field.
                </p>
              </label>
            </div>

            <button>Sign Up</button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <NavLink to="/Login">Log In</NavLink>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
