import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import cardData from "./CardsData";
import PetNotFound from "../cards/PetNotFound";
import { useState } from "react";
import axios from "axios";

function PetDetail() {
  const { id } = useParams();
  const [pet, setpet] = useState(null)
  const fetchpost = async () => {
    const response = await axios.get(`http://localhost:8080/posts/get/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log(response.data);
    setpet(response.data)
  };
  useEffect(() => {
    
    fetchpost()
 
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  if (!pet) {
    return <PetNotFound />;
  }

  return (
    <div className="min-h-screen">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-lg max-h-lg">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-3 w-12"
              onClick={handleCloseModal}
            >
             X
            </button>
            <img
              className="w-full h-full object-contain"
              src={selectedImage}
              alt="Enlarged pet"
            />
          </div>
        </div>
      )}
      {/* Banner Image Grid */}
      <div className=" relative w-full overflow-hidden grid grid-cols-[2fr_1fr] gap-2 ">
        {/* First image spans all columns */}
        <div className=" h-[80vh]"  onClick={() => handleImageClick(pet.image[0])}>
          <img
            className="object-cover"
            src={pet.image[0]}
            alt={`${pet.animal_name} 1`}
          />
        </div>
        {/* Remaining image */}
        <div className="col-span-1 grid grid-rows-3 gap-2 h-full">
          {pet.image.slice(1, 4).map((image, index) => (
            <div key={index} className=" h-[30vh] " onClick={() => handleImageClick(image)}>
              <img
                className="w-full h-full object-cover"
                src={image}
                alt={`${pet.animal_name} ${index + 2}`}
              />
            </div>
          ))}
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div> */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-4xl font-bold">{pet.animal_name}</h2>
          <p className="text-xl">{pet.city}</p>
        </div>
      </div>

      {/* Pet Details Section */}
      <div className="p-8 max-w-4xl mx-auto">
        <div className="md:flex md:justify-between">
          <div className="md:w-2/3 p-6 bg-white shadow-lg rounded-lg flex flex-wrap">
            <div className="w-full md:w-1/2 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Gender
              </h3>
              <p className="text-lg text-gray-700">{pet.gender}</p>
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Breed
              </h3>
              <p className="text-lg text-gray-700">{pet.breed}</p>
            </div>
            <div className="w-full md:w-1/2 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Location
              </h3>
              <p className="text-lg text-gray-700">
                {pet.city}, {pet.address}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-lg text-gray-700">{pet.description}</p>
            </div>
          </div>

          <div className="md:w-1/3 md:ml-8">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">{pet.owner}</h3>
              <p className="text-gray-700 mb-4">{pet.city}</p>
              <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                Chat with Owner
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetDetail;
