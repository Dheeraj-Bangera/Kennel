import React from "react";
import LoginImg from "../../assets/login.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Template = ({  formtype, setIsLoggedIn }) => {
  return (
    <div className="  flex justify-center items-center m-3">
      <div className="grid grid-cols-1  sm: grid-cols-2 bg-[#3A6944]/30 rounded-xl w-[50%] m-4">
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

          <p>OR</p>
          <div></div>

          <button>
            <p>Sign Up with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template;
