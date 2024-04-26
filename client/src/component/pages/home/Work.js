import React from 'react';
import doggie from "../../../assets/Doggie.png";
import girl from "../../../assets/girl.png";

const Work = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-10' id="work">
      <h1 className='text-4xl font-bold font-noto-sans hover:underline'>Our Work</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-x-60 m-8'>
        <div className='flex items-center justify-center'>
          <img src={doggie} className="md:h-52 md:w-60 h-52 w-48" alt="Doggie" />
        </div>
        <div className='flex flex-col'>
          <p className='mb-4 text-xl font-noto-sans'>
          "We connect cats and dogs with <br></br>
          loving homes through our website, <br></br>
          facilitating joyful adoptions for furry <br></br>companions."
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-x-36'>
       
        <div className='flex flex-col'>
          <p className='text-xl font-noto-sans'>
          "We offer valuable resources, including<br></br>
           nearby veterinary information, adoption<br></br>
            center details, and essential first aid<br></br>
             information for your pets' well-being."
          </p>
        </div>
        <div className='flex items-center justify-center'>
          <img src={girl} className="md:h-72 md:w-80 max-h-64" alt="Girl" />
        </div>
      </div>
    </div>
  );
};

export default Work;
