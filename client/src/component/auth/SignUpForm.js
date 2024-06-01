import React, { useState, useRef, useEffect } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const USER_REGEX = /^[a-zA-Z\s.'-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const CONTACT_REGEX = /^[1-9][0-9]{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SIGNUP_URL = process.env.REACT_APP_BACKEND_BASE_URL + "/user/signup";

const SignUpForm = ({ setOtpDisplay, setData }) => {
  const userRef = useRef();
  const errRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumber(CONTACT_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  const otpClickHandler = async () => {
    if (!user || !validName) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!email || !validEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!phoneNumber || !validPhoneNumber) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    if (!pwd || !validPwd) {
      toast.error("Please enter a valid password.");
      return;
    }

    if (!matchPwd || !validMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    const otpData = { email };

    try {
      const signupData = { email, password: pwd, name: user, phoneNumber };
      await axios.post("http://localhost:8080/user/sendOtp", otpData);
      toast.success("OTP sent successfully");
      setOtpDisplay(true);
      setData(signupData);
    } catch (error) {
      const errorMessage =
        error.response?.status === 400 ? "Invalid Entry" : error.message;
      toast.error(errorMessage);
      setErrMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-9">
      <p ref={errRef} className={errMsg ? "errmsg" : "hidden"}>
        {errMsg}
      </p>
      <div>
        <label htmlFor="name">
          <p className="font-semibold">
            Name <sup>*</sup>
          </p>
          <input
            type="text"
            id="name"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter name"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
          />
          {userFocus && user && !validName && (
            <div className="flex bg-[#3A6944]/10 sm:w-40 md:w-52 lg:w-64">
              <p>
                <FaCircleInfo />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters allowed only.
              </p>
            </div>
          )}
        </label>
        <label>
          <p className="font-semibold">
            Phone Number <sup>*</sup>
          </p>
          <input
            type="tel"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone number"
            onFocus={() => setPhoneNumberFocus(true)}
            onBlur={() => setPhoneNumberFocus(false)}
            className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
          />
          {phoneNumberFocus && phoneNumber && !validPhoneNumber && (
            <div className="flex bg-[#3A6944]/10 sm:w-40 md:w-52 lg:w-64">
              <p>
                <FaCircleInfo />
                Format: +CountryCode PhoneNumber (e.g., +1234567890)
              </p>
            </div>
          )}
        </label>
        <label>
          <p className="font-semibold">
            Email Address <sup>*</sup>
          </p>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
          />
          {emailFocus && email && !validEmail && (
            <div className="flex bg-[#3A6944]/10 sm:w-40 md:w-52 lg:w-64">
              <p>
                <FaCircleInfo />
                Format: xyz@domain.com
              </p>
            </div>
          )}
        </label>
        <div>
          <label htmlFor="password" className="flex flex-col relative">
            <p className="font-semibold">
              Create Password <sup>*</sup>
            </p>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Enter Password"
              className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute right-0 top-8 flex items-center justify-center w-10 text-black rounded-r-sm"
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
            {pwdFocus && !validPwd && (
              <div className="flex bg-[#3A6944]/10 sm:w-40 md:w-52 lg:w-64">
                <p>
                  <FaCircleInfo />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number, and a
                  special character.
                </p>
              </div>
            )}
          </label>
        </div>
        <div>
          <label htmlFor="confirm_pwd" className="flex flex-col relative">
            <p className="font-semibold">
              Confirm Password <sup>*</sup>
            </p>
            <input
              id="confirm_pwd"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Confirm Password"
              className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="cursor-pointer absolute right-0 top-8 flex items-center justify-center w-10 text-black rounded-r-sm"
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
            {matchFocus && !validMatch && (
              <div className="flex bg-[#3A6944]/10 sm:w-40 md:w-52 lg:w-64">
                <p>
                  <FaCircleInfo />
                  Must match the first password input field.
                </p>
              </div>
            )}
          </label>
        </div>
        <button
          className={`bg-[#3A6944]/30 lg:w-64 w-[90%] p-1 rounded-lg font-bold m-2 
              transition-transform transform hover:scale-95 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }
              `}
          onClick={otpClickHandler}
          disabled={loading} 
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
