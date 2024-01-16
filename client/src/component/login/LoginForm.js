import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
          type="text"
          value={FormData.password}
          onChange={changeHandler}
          placeholder="Enter Email id"
          name="email"
        />
      </label>

      <label>
        <p>
          Password<sup>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={FormData.email}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
        />
        <span onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
        </span>

        <Link to="#">
          <p>
            Forgot password
          </p>
        </Link>
      </label>

      <button>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
