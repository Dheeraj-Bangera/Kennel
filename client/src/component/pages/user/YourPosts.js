import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const YourPosts = () => {
  // Dummy data
  const [data, setData] = useState(null)
 
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:8080/posts/getMypost`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("lknkdnalnva",response.data);
      setData(response.data.posts)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mb-8">
      {loading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((post) => (
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
