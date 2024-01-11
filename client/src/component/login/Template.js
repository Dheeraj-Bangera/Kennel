import React from "react";
import LoginImg from "../../assets/login.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Template = ({ image, formtype, setIsLoggedIn }) => {
  return (
    <div className="grid grid-cols-1  sm: grid-cols-2 h-screen w-screen">
      <div className=" h-full w-1/2 hidden sm:block ">
        <img
          src={LoginImg}
          alt="logo"
          loading="lazy"
          className="h-[600px] w object-cover


"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        {formtype === "signup" ? <SignUpForm /> : <LoginForm />}

        <div></div>

        <div></div>

        <p>OR</p>
        <div></div>

        <button>
          <p>Sign Up with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Template;
