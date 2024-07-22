import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import twoPaws from "../../../../assets/two-paws.png";
import dogBone from "../../../../assets/dogBone.png";
import catFood from "../../../../assets/catfood.png";
import carrot from "../../../../assets/carrot.png";
import "./styles.css";

function Card({
  id,
  animal,
  animal_name,
  city,
  address,
  breed,
  description,
  images,
  gender,
}) {
  const [adopted, setAdopted] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    setAdopted(true);
    setTimeout(() => {
      navigate(`/pet/${id}`);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  let adoptionItem;
switch (animal.toLowerCase()) {  // Convert the input to lowercase
  case "dog":
    adoptionItem = <img src={dogBone} alt="bone" className="w-48 h-48 imgEffect" />;
    break;
  case "cat":
    adoptionItem = <img src={catFood} alt="bowl" className="w-48 h-48 imgEffect" />;
    break;
  case "rabbit":
    adoptionItem = <img src={carrot} alt="carrot" className="w-48 h-48 imgEffect" />;
    break;
  default:
    adoptionItem = null;
}

  return (
    <div className="relative">
      {adopted && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {adoptionItem}
        </div>
      )}

      <div className="max-w-sm  rounded-xl overflow-hidden shadow-lg m-8">
        <div className={`${adopted ? 'filter blur-sm' : ''}`}>
          <div className="relative">
            <div
              className={`absolute bottom-0 left-0 m-2 rounded-xl font-bold font-[Knewave] p-2 text-lg
              ${
                animal === "dog"
                  ? "bg-[#5F6F52]"
                  : animal === "cat"
                  ? "bg-[#B99470]"
                  : "bg-white"
              }`}
            >
              {animal}
            </div>

            <img
              className="w-full h-64 object-cover"
              src={images[0]}
              alt={animal_name}
            />
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center ml-0">
              <div className="font-bold  font-[Shrikhand] text-2xl">
                {animal_name}
              </div>
              <img src={twoPaws} alt="pawprint" className="right-[0px] w-16 h-12 " />
            </div>

            <p className="text-gray-700 text-base">Gender: {gender}</p>
            <p className="text-gray-700 text-base">Breed: {breed}</p>
            <p className="text-gray-700 text-base overflow-hidden">
              Location: {city}, {address}
            </p>
            <div className="text-gray-700 text-base">{description}</div>
            <div className="mt-4 flex items-center justify-center">
              <button className="bg-black hover:bg-slate-600 text-white rounded-full py-2 px-6" onClick={clickHandler}>
                Adopt {animal_name}!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
