import React from "react";
import dog from "../assets/dog.gif";
import cat from "../assets/cat.gif";

const Loader = () => {
  return (
    <div className="flex-col justify-items-center  content-center h-screen">
      <div className="flex justify-center gap-20 items-baseline">
        <img className="h-24" src={dog} alt="Dog" />
        <img className="h-12" src={cat} alt="Cat" />
      </div>
      <p className="text-center mt-7 text-3xl">Loading...</p>
    </div>
  );
};

export default Loader;
