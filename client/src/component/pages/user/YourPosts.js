import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const YourPosts = () => {
  // Dummy data
  const dummyPosts = [
    {
      id: 2,
      animal: "cat",
      animal_name: "whiskers",
      gender: "male",
      image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
      description: "This is a male cat named whiskers, he is playful and loves to chase toys.",
      breed: "Domestic Shorthair",
      address: "Sector 15, Gurgaon",
      city: "Gurgaon",
    },
    {
      id: 3,
      animal: "dog",
      animal_name: "buddy",
      gender: "male",
      image: "https://i.pinimg.com/736x/54/36/95/54369563e20e94dcab5fc7f40cf7e8d6.jpg",
      description: "This is a male dog named buddy, he is friendly and enjoys playing fetch.",
      breed: "Pomeranian",
      address: "Koramangala, Bangalore",
      city: "Bangalore",
    },
    {
      id: 4,
      animal: "rabbit",
      animal_name: "cotton",
      gender: "female",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1Zo9USSzvn7sWI0jPPH7j4mfetlETM6pC8RvGZpRrhSzEoKnX",
      description: "This is a female rabbit named cotton, she is fluffy and loves to hop around.",
      breed: "Netherland Dwarf",
      address: "Viman Nagar, Pune",
      city: "Pune",
    },
    {
      id: 5,
      animal: "dog",
      animal_name: "rocky",
      gender: "male",
      image: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pembroke-welsh-corgi.jpg?crop=1xw:0.9997114829774957xh;center,top&resize=980:*",
      description: "This is a male dog named rocky, he is adventurous and loves exploring outdoors.",
      breed: "Pug",
      address: "Indiranagar, Bangalore",
      city: "Bangalore",
    },
  ];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for fetching data
    setTimeout(() => {
      setPosts(dummyPosts);
      setLoading(false);
    }, 1000); // 1 second delay for demo purposes
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mb-8">
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post.id}
                className="relative bg-white shadow-lg p-4 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={post.image}
                  alt={post.animal_name}
                  className="w-full h-60 object-cover rounded-lg"
                  initial={{ opacity: 1 }}
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#5F6F52] bg-opacity-60 text-white flex flex-col justify-center items-center"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 0, y: 0 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col justify-center items-center text-center p-4">
                    <motion.h2
                      className="text-xl font-bold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {post.animal_name}
                    </motion.h2>
                    <motion.p
                      className="text-lg mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Breed: {post.breed}
                    </motion.p>
                    <motion.p
                      className="text-md mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Gender: {post.gender}
                    </motion.p>
                    <motion.p
                      className="text-md mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      Location: {post.address}, {post.city}
                    </motion.p>
                    <motion.p
                      className="text-md mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      {post.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-xl">No posts available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YourPosts;
