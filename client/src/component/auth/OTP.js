import React, { useState } from "react";
import { RiInboxArchiveFill } from "react-icons/ri";
import axios from "axios";
// import { useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../../../redux/userSlice';
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "sonner";
import { Button } from "../ui/button";
import dogWalker from "../../assets/dogwalker.png";
import { useNavigate } from "react-router-dom";

function OTP({ signupData }) {
  // const dispatch = useDispatch();
  // const router = useRouter();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  // const [timer, setTimer] = useState(60);
  console.log(signupData);
  const handleChange = (e) => {
    const value = e.target.value;
    const index = parseInt(e.target.dataset.index, 10);

    if (!isNaN(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;

      if (value === "" && index > 0) {
        document.getElementById(`otpInput_${index - 1}`).focus();
      } else if (index < otp.length - 1 && value !== "") {
        document.getElementById(`otpInput_${index + 1}`).focus();
      }

      setOtp(newOtp);
    }
  };

  function ConcatenateArr(arr, N) {
    // Convert the array of OTP digits to a string
    const strOtp = arr.join("");

    // Parse the string as an integer
    const numOtp = parseInt(strOtp, 10);

    return numOtp;
  }

  const submitOtp = async () => {
    setLoading(true);
    const numOtp = ConcatenateArr(otp, 6);
    console.log(numOtp);
    signupData.otp = numOtp;
    console.log(signupData);
    try {
      const response = await axios.post("http://localhost:8080/user/signup", signupData);
      console.log(response)
      if (response.status === 200) {
        toast.success("OTP verified successfully")
        navigate("/login")

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 response here
        toast("Wrong OTP");
      } else {
        // Handle other errors here
        toast(error);
        console.error("An error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="fixed inset-0 bg-[#C6DCBA] flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <img
        src={dogWalker}
        alt="walker"
        className="hidden lg:block absolute"
        style={{ top: "50%", left: "80%", transform: "translate(-50%, -50%)" }}
      />

      {loading ? (
        <SyncLoader color="#36d7b7" />
      ) : (
        <div
          className="w-full max-w-lg border-2 border-[var(--bgSoft)] rounded-xl py-5 bg-[var(--bgSoft)] shadow-2xl"
        >
          <div className="flex justify-center items-center gap-2 px-4">
            <h1 className="text-xl text-center font-medium">
              Check your mailbox for the OTP
            </h1>
            <RiInboxArchiveFill />
          </div>

          <div className="w-[90%] mx-auto flex flex-row shadow-2xl gap-2 my-5">
            {otp.map((data, i) => (
              <input
                id={`otpInput_${i}`}
                type="text"
                name="otp"
                className="border-2 w-12 h-12 text-2xl rounded-xl m-auto text-black text-center"
                maxLength={1}
                key={i}
                value={data}
                data-index={i}
                onChange={handleChange}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <div className="w-[90%] mx-auto flex flex-row gap-2 justify-center my-5">
            {/* <p className="text-lg">
              {timer > 0 ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
            </p> */}
            <Button
              onClick={submitOtp}
              size="lg"
              variant="ghost"
              className="bg-gray-400/30 px-8 py-2 rounded-lg mt-4 hover:bg-gray-300/30 w-full sm:w-1/2 transition-transform transform hover:scale-105"
              // disabled={timer > 0}
            >
              Verify
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTP;
