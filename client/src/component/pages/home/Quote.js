import React, { useState, useEffect } from 'react';
import paws from "../.././../assets/pawws.png";
import meow from "../.././../assets/meow.png";

const Quote = () => {
  const [showImages, setShowImages] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setShowImages(windowWidth >= 768); // Adjust threshold as needed (768px is for medium screens)
    };

    window.addEventListener('resize', handleResize);

    handleResize(); // Call initially to set state based on current screen size

    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, []);

  return (
    <div className='flex items-center justify-center mt-12'>
      <div className='text-center'> {/* Text container centered */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Knewave] ">
          "Adopt, don't shop"
        </h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium mt-6">
          Unlock a world of love and gratitude by giving a rescued animal a forever home.
        </h3>
      </div>
      {showImages && (
        <> {/* Wrap images in fragment for conditional rendering */}
          <img
            src={paws}
            className="absolute top-28 right-0 left-6 w-auto h-auto"
            alt="Team"
          />
          <img
            src={meow}
            className="absolute top-64 right-96 h-auto w-56"
            alt="Team"
          />
        </>
      )}
    </div>
  );
};

export default Quote;
