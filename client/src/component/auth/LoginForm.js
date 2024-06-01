import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useDispatch,useSelector } from "react-redux";
import { setUserInfo } from "../../redux/reducers/rootSlice";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.root);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const loginHandler = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/user/login", formData);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.user.token);
        dispatch(setUserInfo(res.data.user));
        toast.success("Login successful!");
        console.log("data inside redux ------>>>>>",userInfo)
        navigate("/feeds");


      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label>
        <p>
          Email Address<sup>*</sup>
        </p>
        <input
          required
          type="text"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email id"
          name="email"
          className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
        />
      </label>

      <label className="relative">
        <p>
          Password<sup>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="sm:w-40 md:w-52 lg:w-64 rounded-lg m-2 text-black p-1"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer absolute right-0 bottom-9 flex items-center 
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

      <button
        className={`bg-[#3A6944]/20 sm:w-40 md:w-52 lg:w-64 p-1 rounded-lg
                   font-medium mx-auto flex items-center justify-center mt-4 mb-2
                   ${loading ? "cursor-not-allowed" : ""}`}
        onClick={loginHandler}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default LoginForm;
