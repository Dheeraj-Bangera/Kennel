import React from "react";
import LoginImg from "../../assets/login.png";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm"

const Template = ({ image, formtype, setIsLoggedIn }) => {
  return (
    <div>
      {formtype === "signup" ? <SignUpForm /> : <LoginForm />}

      <div></div>

      <div></div>
      <p>OR</p>
      <div></div>

      <button>
        <p>Sign Up with Google</p>
      </button>

      <div>
        <img src={LoginImg} alt="logo" loading="lazy" />
      </div>
    </div>
  );
};

export default Template;
