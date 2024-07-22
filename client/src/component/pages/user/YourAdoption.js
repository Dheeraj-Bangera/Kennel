import React, { useState } from 'react';
import { motion } from 'framer-motion';

const YourAdoption = () => {
  const [adoptedPets, setAdoptedPets] = useState([
    {
      id: 101,
      animal: "cat",
      animal_name: "whiskers",
      gender: "male",
      image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
      description: "This is a male cat named whiskers, he is playful and loves to chase toys.",
      breed: "Domestic Shorthair",
      address: "Sector 15, Gurgaon",
      city: "Gurgaon"
    },
    {
      id: 102,
      animal: "dog",
      animal_name: "buddy",
      gender: "male",
      image: "https://i.pinimg.com/736x/54/36/95/54369563e20e94dcab5fc7f40cf7e8d6.jpg",
      description: "This is a male dog named buddy, he is friendly and enjoys playing fetch.",
      breed: "Pomeranian",
      address: "Koramangala, Bangalore",
      city: "Bangalore"
    },
    {
      id: 103,
      animal: "rabbit",
      animal_name: "cotton",
      gender: "female",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1Zo9USSzvn7sWI0jPPH7j4mfetlETM6pC8RvGZpRrhSzEoKnX",
      description: "This is a female rabbit named cotton, she is fluffy and loves to hop around.",
      breed: "Netherland Dwarf",
      address: "Viman Nagar, Pune",
      city: "Pune"
    },
    {
      id: 104,
      animal: "dog",
      animal_name: "rocky",
      gender: "male",
      image: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pembroke-welsh-corgi.jpg?crop=1xw:0.9997114829774957xh;center,top&resize=980:*",
      description: "This is a male dog named rocky, he is adventurous and loves exploring outdoors.",
      breed: "Pug",
      address: "Indiranagar, Bangalore",
      city: "Bangalore"
    }
  ]);

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adoptedPets.length === 0 ? (
          <div>No pets adopted yet.</div>
        ) : (
          adoptedPets.map((pet) => (
            <motion.div
              key={pet.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.img
                src={pet.image}
                alt={pet.animal_name}
                className="w-full h-40 object-cover"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{pet.animal_name}</h2>
                <p className="text-gray-600">{pet.city}</p>
                <p className="text-gray-800 mt-2">{pet.description}</p>
                <p className="text-gray-600 mt-2"><strong>Breed:</strong> {pet.breed}</p>
                <p className="text-gray-600 mt-2"><strong>Address:</strong> {pet.address}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default YourAdoption;
