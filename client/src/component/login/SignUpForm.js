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
    <div >
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <NavLink to="/Login">Log In</NavLink>
          </p>
        </section>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <p ref={errRef} className={errMsg ? "errmsg" : "hidden"}>
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              <p className="font-semibold	">
                Name <sup>*</sup>
              </p>
              <input
                required
                type="text"
                id="name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter name"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="w-[100%] rounded-lg m-2 text-black p-1"
              />
              <div
                className={`flex bg-[#3A6944]/10 w-[50%] ${
                  userFocus && user && !validName ? "" : "hidden"
                }`}
              >
                <p>
                  <FaCircleInfo />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters allowed only.
                </p>
              </div>
            </label>
            <label>
              <p  className="font-semibold	">
                Phone Number <sup>*</sup>
              </p>
              <input
                required
                type="tel"
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone number"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
                className="w-[100%] rounded-lg m-2 text-black p-1"
              />
              <div
                className={`flex bg-[#3A6944]/10 w-[50%] ${
                  phoneNumberFocus && phoneNumber && !validPhoneNumber
                    ? ""
                    : "hidden"
                }`}
              >
                <p>
                  <FaCircleInfo />
                  10 numbers only.
                </p>
              </div>
            </label>
            <label>
              <p className="font-semibold	">
                Email Address <sup>*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="w-[100%] rounded-lg m-2 text-black p-1"
              />
              <div
                className={`flex bg-[#3A6944]/10 w-[50%] ${
                  emailFocus && email && !validEmail ? "" : "hidden"
                }`}
              >
                <p>
                  <FaCircleInfo />
                  Format: xyz@domain.com
                </p>
              </div>
            </label>

            <div>
              <label htmlFor="password">
                <p className="font-semibold	">
                  Create Password <sup>*</sup>
                </p>
                <input
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="Enter Password"
                  className="w-[100%] rounded-lg m-2 text-black p-1"
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>
                <div
                  className={`flex bg-[#3A6944]/10 w-[50%] ${
                    pwdFocus && !validPwd ? "" : "hidden"
                  }`}
                >
                  <p>
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
                </div>
              </label>
              <label>
                <p className="font-semibold	">
                  Confirm Password <sup>*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  placeholder="Confirm Password"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="w-[100%] rounded-lg m-2 text-black p-1"
                />
                <span onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>
                <div
                  className={`flex bg-[#3A6944]/10 w-[50%] ${
                    matchFocus && !validMatch ? "" : "hidden"
                  }`}
                >
                  <p>
                    <FaCircleInfo />
                    Must match the first password input field.
                  </p>
                </div>
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
