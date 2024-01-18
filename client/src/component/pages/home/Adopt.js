import React from 'react';
import Swipe from "./Slider/Swipe";
import FlipCardList from "./flipCard/FlipCardList";
import tounge from "../../../assets/tongue.png"

const Adopt = () => {
  return (
    <div className='mt-10 flex flex-col items-center justify-center place-content-center	'>
      <h1 className='text-4xl font-bold font-noto-sans hover:underline'>
        Why you should Adopt?
      </h1>
      <img src={tounge} alt="figma" className='mt-4 select-none' />
      <div className='flex gap-4 mt-2'>
        <div className='w-96 h-96 rounded-lg bg-[#3A6944]/20 p-4 select-none'>
          <Swipe />
        </div>
        <div className=' rounded-lg w-[35%]'>
          <FlipCardList />
        </div>
      </div>
    </div>
  );
};

export default Adopt;
