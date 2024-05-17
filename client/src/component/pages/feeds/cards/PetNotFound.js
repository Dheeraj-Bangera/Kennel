import React from 'react';
import { useNavigate } from 'react-router-dom';

function PetNotFound() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/feeds');
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex flex-col items-center justify-center">
      <div className="text-center p-8 bg-[#3A6944]/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Pet Not Found</h2>
        <p className="text-lg text-gray-700 mb-4">Sorry, we couldn't find the pet you're looking for.</p>
        <button
          className="bg-[#3A6944] hover:bg-[#3A6944]/30 text-white font-bold py-2 px-4 rounded"
          onClick={handleBackClick}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PetNotFound;
