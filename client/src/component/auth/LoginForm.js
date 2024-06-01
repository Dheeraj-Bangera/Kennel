import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [FormData, setFormData] = useState({
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
          className="sm:w-40 md:w-52 lg:w-64  rounded-lg m-2 text-black p-1"
        />
      </label>

      <label className="relative">
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
          className="sm:w-40 md:w-52 lg:w-64  rounded-lg m-2 text-black p-1"
        />
        <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer absolute   right-0  bottom-9	  flex items-center 
                        justify-center w-10 text-black rounded-r-sm"
                >
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

        <Link to="#">
          <div className="">

          <p className="ml-36 text-sm underline hover:no-underline cursor-pointer">
            Forgot password?
          </p>
          </div>
        </Link>
      </label>

      <button className="bg-[#3A6944]/20 sm:w-40 md:w-52 lg:w-64   p-1 rounded-lg
               font-medium mx-auto flex items-center justify-center mt-4 mb-2">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
