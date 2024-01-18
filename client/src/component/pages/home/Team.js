import React from 'react';
import paws_team from '../../../assets/paws_team.png';

const Team = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-16'>
      <h1 className='text-4xl font-bold font-noto-sans hover:underline'>About Us</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center mt-4'>
        <div className='flex items-center justify-center'>
          <img src={paws_team} className="md:h-96 md:w-96 h-52 w-48 rounded-[100%]" alt="Team" />
        </div>
        <div className=' '>
          <p className='m-2 md:m-2 text-lg font-noto-sans'>
            "We're a compassionate team committed to connecting adorable furry
            companions with their perfect homes. Our mission is to provide
            these loving animals with comfort and care, ensuring they find a
            lifetime of joy with their new families."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
