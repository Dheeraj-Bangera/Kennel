import React from "react";
import LoginImg from "../../assets/login.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Template = ({ formtype, setIsLoggedIn }) => {
  return (
    <div className="  flex justify-center items-center m-3">
      <div className="grid grid-cols-1  sm:grid-cols-2 bg-[#3A6944]/30 rounded-xl w-5/6 lg:w-[50%] m-4 ">
        <div className=" h-full  hidden sm:block ">
          <img
            src={LoginImg}
            alt="logo"
            loading="lazy"
            className="h-[600px] object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          {formtype === "signup" ? <SignUpForm /> : <LoginForm />}

          <div></div>

          <div></div>

          <p className="font-medium ">OR</p>
          <div></div>

          <button
            className="bg-[#3A6944]/20 sm:w-40 md:w-52 lg:w-64   p-1 rounded-lg
               font-medium mx-auto flex items-center justify-center mt-2"
          >
            <FcGoogle className="text-3xl m" />
            {formtype=="signup"?<p>Sign Up with Google</p>:<p>Sign in with Google</p>}
            
          </button>
          {formtype === "signup" ? (
            <p className="flex items-center font-medium flex-col mt-3 gap-1">
              Already registered?
              <br />
              <span className="line">
                <NavLink to="/Login" className="hover:underline">
                  Log In
                </NavLink>
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Template;
