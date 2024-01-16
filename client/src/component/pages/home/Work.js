import React from 'react';
import doggie from "../../../assets/Doggie.png";
import girl from "../../../assets/girl.png";

const Work = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-10'>
      <h1 className='text-4xl font-bold font-noto-sans hover:underline'>Our Work</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-x-60 m-8'>
        <div className='flex items-center justify-center'>
          <img src={doggie} className="md:h-44 md:w-52 h-52 w-48" alt="Doggie" />
        </div>
        <div className='flex flex-col'>
          <p className='mb-4'>
            ipsum dolor sit amet, consectetur <br />adipiscing elit. Donec in
            nibh<br /> sed odio porttitor sollicitudin ut <br />id turpis. V
            estibulum ante ipsum primis <br />in faucibus orci luctus et
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8'>
       
        <div className='flex flex-col'>
          <p>
          ipsum dolor sit amet, consectetur <br />adipiscing elit. Donec in
            nibh<br /> sed odio porttitor sollicitudin ut <br />id turpis. V
            estibulum ante ipsum primis <br />in faucibus orci luctus et
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
