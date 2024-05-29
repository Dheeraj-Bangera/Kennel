import React from 'react';
import { useParams } from 'react-router-dom';
import cardData from './CardsData';
import PetNotFound from "../cards/PetNotFound"

function PetDetail() {
  const { id } = useParams();
  const pet = cardData.find(pet => pet.id.toString() === id);

  if (!pet) {
    return <PetNotFound />;
  }

  return (
    <div className="min-h-screen ">
      {/* Banner Image */}
      <div className="relative w-full h-96 overflow-hidden">
        <img className="w-full h-full object-cover" src={pet.image} alt={pet.animal_name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-4xl font-bold">{pet.animal_name}</h2>
          <p className="text-xl">{pet.city}</p>
        </div>
      </div>

      {/* Pet Details Section */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="md:flex md:justify-between">
          <div className="md:w-2/3">
            <p className="text-lg text-gray-700 mb-4"><strong>Gender:</strong> {pet.gender}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Breed:</strong> {pet.breed}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Location:</strong> {pet.city}, {pet.address}</p>
            <p className="text-lg text-gray-700 mb-4">{pet.description}</p>
          </div>
          <div className="md:w-1/3 md:ml-8">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">{pet.animal_name}</h3>
              <p className="text-gray-700 mb-4">{pet.city}</p>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                Adopt
              </button>
              <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Chat with Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetail;
