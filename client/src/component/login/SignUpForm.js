import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div>
      <div>
        <button></button>
      </div>
      <form>
        <label>
          <p>
            Name <sup>*</sup>
          </p>
          <input
            required
            type="text"
            name="name"
            onChange={changeHandler}
            placeholder="Enter name"
            value={FormData.name}
          />
        </label>
        <label>
          <p>
            Phone Number <sup>*</sup>
          </p>
          <input
            required
            type="tel"
            name="phoneNumber"
            onChange={changeHandler}
            placeholder="Enter Phone number"
            value={FormData.phoneNumber}
          />
        </label>
        <label>
          <p>
            Email Address <sup>*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email Address"
            value={FormData.email}
          />
        </label>

        {/* create and confirm password */}
        <div>
          <label>
            <p>
              Create Password <sup>*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={FormData.password}
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
          </label>
          <label>
            <p>
              Confirm Password <sup>*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={FormData.confirmPassword}
            />
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </span>
          </label>
        </div>

        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignUpForm;
